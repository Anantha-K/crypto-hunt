"use client";
import Image from "next/image";
import Link from "next/link";

import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Page = () => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { name, email, password };
    setName("");
    setEmail("");
    setPassword("");
    let gameResponse = await fetch("/api/auth/checkContest");
    let gameData = await gameResponse.json();

    if (gameData.isActive) {
      let res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      let response = await res.json();
      console.log(response);
      if (response.message === "User created") {
        toast.success("User Created!");
        setTimeout(() => {
          toast.loading("Redirecting...");
        }, 1000);
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else if (response.message === "Invalid Email Format") {
        toast.error("Invalid Email Format");
      } else if (response.message === "Email already exists") {
        toast.error("Email already in use");
      } else {
        toast.error("Server Error");
      }
    } else {
      toast.error("Unable to Sign up! Contest Over");
    }
  };

  return (
    <>
      <div className="flex bg-white min-h-full flex-1 flex-col justify-center px-6 py-24 md:py-12 lg:px-8">
        <Toaster />
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />

          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>

              <div className="mt-2">
                <input
                  value={name}
                  onChange={handleChange}
                  id="name"
                  name="name"
                  type="name"
                  required
                  className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>

              <div className="mt-2">
                <input
                  value={email}
                  onChange={handleChange}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>

              <div className="mt-2">
                <input
                  value={password}
                  onChange={handleChange}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block px-2 w-full focus-within:no-underline rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
              >
                Create Account
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Have an Account?{" "}
            <Link
              href="/Signin"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Page;
