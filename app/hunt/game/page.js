"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineLeaderboard } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { RiHomeLine } from "react-icons/ri";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import animationData from "./animation.json";
import Image from "next/image";

const Page = () => {
  const [active, setActive] = useState("home");
  const [answer, setAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [questionImage, setQuestionImage] = useState("");
  const [user, setUser] = useState();
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [violated, setViolated] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    console.log("Violated state changed:", violated);
  }, [violated]);

  useEffect(() => {
    console.log("UserEmail state changed:", userEmail);
  }, [userEmail]);

  useEffect(() => {
    const checkViolation = async () => {
      try {
        const response = await fetch(`/api/auth/checkViolation?email=${userEmail}`);
        const data = await response.json();
        console.log("Violation check response:", data);
        setViolated(data.violated);
      } catch (error) {
        console.error("Error checking violation status:", error);
      }
    };

    const tkn = localStorage.getItem("token");
    setUser(tkn);
    if (tkn) {
      try {
        const payload = JSON.parse(atob(tkn.split(".")[1]));
        const email = payload.email;
        setUserEmail(email);
        checkViolation();
        initializeGame(email);
      } catch (error) {
        toast.error("Invalid token. Please log in again.");
      }
    } else {
      toast.error("Please log in to continue");
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [userEmail]);

  const handleVisibilityChange = () => {
    if (document.hidden) {
      setViolated(true);
      updateViolationStatus(userEmail);
    }
  };

  const updateViolationStatus = async (email) => {
    try {
      const response = await fetch("/api/auth/setViolation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      console.log("Violation update response:", data);
    } catch (error) {
      console.error("Error updating violation status:", error);
    }
  };

  useEffect(() => {
    if (userEmail && !violated) {
      const fetchRemainingTime = async () => {
        try {
          const response = await fetch(`/api/auth/getRemainingTime?email=${userEmail}`);
          const data = await response.json();
          if (data.remainingTime !== undefined) {
            setTimeLeft(data.remainingTime);

            const timer = setInterval(() => {
              setTimeLeft((prevTime) => {
                if (prevTime <= 0) {
                  clearInterval(timer);
                  setGameOver(true);
                  return 0;
                }
                return prevTime - 1;
              });
            }, 1000);

            return () => clearInterval(timer);
          } else {
            setGameOver(true);
          }
        } catch (error) {
          console.error("Error fetching remaining time:", error);
        }
      };

      fetchRemainingTime();
    }
  }, [userEmail, violated]);

  const formatTime = (time) => {
    time = Math.floor(time);
  
    const hours = String(Math.floor(time / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
  
    return `${hours}:${minutes}:${seconds}`;
  };

  const initializeGame = async (email) => {
    try {
      const isActive = await checkContestStatus();
      if (!isActive) {
        toast.error("The contest is not currently active.");
        setGameOver(true);
        return; // Early return to prevent further execution
      }
      
      const gameStatus = await checkGame(email);
      if (gameStatus?.isOver) {
        setGameOver(true);
        return;
      }
      
      await fetchData(email);
    } catch (error) {
      console.error("Error initializing game:", error);
      setGameOver(true);
      toast.error("Unable to initialize game");
    }
  };

  const checkContestStatus = async () => {
    try {
      let rsp = await fetch(`/api/auth/checkContest`);
      let rspn = await rsp.json();
      return rspn.isActive;
    } catch (e) {
      console.error("Error checking contest status: ", e);
      return false;
    }
  };

  const checkGame = async (email) => {
    try {
      let rsp = await fetch(`/api/auth/checkGame?email=${email}`);
      let rspn = await rsp.json();
      if (rspn.message === "Over") {
        setGameOver(true);
      }
    } catch (e) {
      console.error("Error checking game over status: ", e);
    }
  };

  const fetchData = async (email) => {
    try {
      let resp = await fetch(`/api/auth/fetchQue?email=${email}`);
      let response = await resp.json();

      if (response.message === "Successful" && response.question) {
        setLevel(response.question.levelNumber);
        setScore(response.user.score);
        setCorrectAnswer(response.question.answer);
        setQuestionImage(response.question.questionText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data");
    }
  };

  const updateData = async (newScore, newLevel) => {
    try {
      const email = userEmail;
      const data = {
        email,
        score: newScore,
        currentLevel: newLevel,
        scoreTimestamp: new Date(),
      };

      await fetch("/api/auth/UpdateScore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Error updating data");
    }
  };

  const handleChange = (e) => {
    setAnswer(e.target.value);
  };

  const logOut = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No active session found");
        window.location.href = "/";
        return;
      }
  
      const response = await fetch("/api/auth/logoutVio", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        // Add body with userId if you have it in localStorage
        body: JSON.stringify({
          userId: localStorage.getItem("userId") // Add this if you store userId
        })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Logout response:", data); // Debug log
  
      // Clear local storage
      ["token", "hints", "level", "score", "userId"].forEach(item => 
        localStorage.removeItem(item)
      );
  
      // Show appropriate toast message with logout count
      if (data.violated) {
        toast.error(`Account violated due to excessive logouts (${data.logoutCount}/5)`);
      } else {
        toast.success(`Logged out successfully (Logout ${data.logoutCount}/5)`);
      }
  
      // Redirect after a short delay
      setTimeout(() => {
        window.location.href = "/";
      }, 1500); // Increased delay to show toast
  
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error during logout");
    }
  };
  const updateTime = async () => {
    try {
      const email = userEmail;

      await fetch("/api/auth/setComplete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
    } catch (error) {
      console.error("Error updating time:", error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (answer === "") {
      toast.error("Enter an answer!");
    } else if (answer.toLowerCase().trim() !== correctAnswer.toLowerCase()) {
      toast.error("Wrong Guess!");
      setAnswer("");
    } else {
      toast.success("🎉 Correct Answer");

      const newScore = score + 1000;
      const newLevel = level + 1;

      await updateData(newScore, newLevel);

      if (newLevel === 21) {
        await fetch(`/api/auth/gameOver?email=${userEmail}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        toast.success("Hunt Complete!");
        updateTime();
        setTimeout(() => {
          window.location.href = "/hunt/leaderboard";
        }, 2000);
      } else {
        await fetchData(userEmail);
        setAnswer("");
        toast.success("+1000 Points!", { position: "bottom-right" });
      }
    }
  };

  if (violated) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-4xl">Violation Detected</h1>
        <p className="mt-4">You have opened a new tab or window. This is not allowed during the hunt.</p>
      </div>
    );
  }

  return (
    <>
      {gameOver ? (
        <>
          <div className="w-full h-screen flex flex-col items-center justify-center bg-black text-white">
            <div className="w-full flex flex-col items-center bg-black">
              <Lottie options={defaultOptions} height={400} width={400} />
              <h1 className="text-3xl">Hunt Complete</h1>
              <p className="text-xl mt-2">Check out the leaderboard</p>
            </div>

            <nav className="fixed bottom-0 left-0 w-full bg-black border-t-2 border-gray-800 text-3xl font-light flex justify-evenly items-center h-16 text-white">
              <Link href="/hunt/hi">
                <RiHomeLine
                  className={`cursor-pointer ${
                    active === "home" ? "text-green-400" : "text-white"
                  }`}
                  onClick={() => setActive("home")}
                />
              </Link>
              <Link href="/hunt/leaderboard">
                <MdOutlineLeaderboard
                  className={`cursor-pointer ${
                    active === "leaderBoard" ? "text-green-400" : "text-white"
                  }`}
                  onClick={() => setActive("leaderBoard")}
                />
              </Link>
              <Link href="/">
                <IoIosLogOut
                  className={`cursor-pointer ${
                    active === "Account" ? "text-green-400" : "text-white"
                  }`}
                  onClick={() => logOut()}
                />
              </Link>
            </nav>
          </div>
        </>
      ) : user ? (
        <div className="w-full bg-black text-white h-screen flex flex-col">
          <Toaster />
          <div className="h-[90%] flex flex-col items-center ">
          <motion.div
  className="h-[30%] rounded-3xl bg-[rgba(38,38,38,255)] text-2xl md:text-4xl text-black mt-24 flex items-center justify-center w-[75%] overflow-hidden"
  initial="unflip"
  animate={{ scale: [0.9, 1], opacity: [0, 1] }}
  transition={{ duration: 0.5 }}
>
  <div className="relative w-full h-full">
    <Image 
      src={questionImage} 
      alt="Question" 
      width={800} 
      height={500} 
      className="object-contain w-full h-full"
      priority
    />
  </div>
</motion.div>
            <div className="form-control">
              <input
                name="Answer"
                value={answer}
                onChange={handleChange}
                type="text"
                required=""
                placeholder="Enter Your Answer..."
                className="input input-alt mt-16"
              />
              <span className="input-border input-border-alt"></span>
            </div>
            <div id="clue" className="flex flex-col md:flex-row mt-3 items-center justify-center md:space-x-5 md:space-y-0 space-y-4">
              <button onClick={handleSubmit} className="hover:cursor-pointer">
                Submit
              </button>
            </div>
            <div className="text-black px-5 mt-5 bg-white py-1 rounded-3xl time-remaining">
              Time remaining:{" "}
              <span className="text-red-500 font-bold">
                {formatTime(timeLeft)}
              </span>{" "}
            </div>
          </div>

          <nav className="fixed bottom-0 left-0 w-full bg-black border-t-2 border-gray-800 text-3xl font-light flex justify-evenly items-center h-16 text-white">
            <Link href="/hunt/hi">
              <RiHomeLine
                className={`cursor-pointer ${
                  active === "home" ? "text-green-400" : "text-white"
                }`}
                onClick={() => setActive("home")}
              />
            </Link>
            <Link href="/hunt/leaderboard">
              <MdOutlineLeaderboard
                className={`cursor-pointer ${
                  active === "leaderBoard" ? "text-green-400" : "text-white"
                }`}
                onClick={() => setActive("leaderBoard")}
              />
            </Link>
            <Link href="/">
              <IoIosLogOut
                className={`cursor-pointer ${
                  active === "Account" ? "text-green-400" : "text-white"
                }`}
                onClick={() => logOut()}
              />
            </Link>
          </nav>
        </div>
      ) : (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-black text-white">
          <h1 className="text-4xl">Please Sign In</h1>
          <p className="mt-4">
            <a href="/" className="text-green-400">
              Log in
            </a>{" "}
            to continue playing the game.
          </p>
        </div>
      )}
    </>
  );
};

export default Page;