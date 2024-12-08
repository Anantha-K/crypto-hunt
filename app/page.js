'use client'
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa6";
import { CgWebsite } from "react-icons/cg";


//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faGithub, faInstagram, faYoutube, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import './Login.css'


function Page() {
  const [activePanel, setActivePanel] = useState('login');

  const handleRegisterClick = () => {
    setActivePanel('register');
  };
  
  const handleLoginClick = () => {
    setActivePanel('login');
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const handleChangeLogin = (e) => {
    const { name , value } = e.target;
  
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const handleSubmitLogin=async (e)=>{
    e.preventDefault();
    const data={email,password};
  
    let res= await fetch ('/api/auth/login',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(data),
          })
      
          // console.log(res);
    let response =await res.json();
    // console.log(response);
    if(!email || !password){
      toast.error("Enter Credentials");
    }
    else if(response.message === "No user"){
      toast.error("User Does not Exist!");
    }
    else if(response.message === "Incorrect password"){
      toast.error("Incorrect Password");
    }
    else if(response.message === "Login Successful"){
      toast.success("Logged in")
      localStorage.setItem('token',response.token);
      setTimeout(()=>{
        toast.loading('Redirecting...', {
          position: "top-left"
        })
        redirect('/hunt/game');

      },500);

      setTimeout(()=>{
          window.location.href='/hunt/game';
        },1000);

      }
      setEmail('')
      setPassword('')
    

    // if(User){
    //   toast.success("Log in Successful!");
    //   setTimeout(()=>{
    //     toast.loading('Redirecting...', {
    //       position: "top-left"
    //     })
        
    //   },1000);
    //   setTimeout(()=>{
    //     window.location.href='/hunt/game';
    //   },2000)
      
      
    // }  
        }





  
   const handleSubmit= async (e)=>{
    // if(name || email || password === ''){
    //   toast.error("Fill the form");
    // }
  e.preventDefault();

      
      const data={name,email,password};
      setName('');
      setEmail('');
      setPassword('');
      // console.log(data)
      let res = await fetch('/api/auth/register',
      {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(data)
      }
      
      )
      
      let response = await res.json();
      // console.log(response);
      if(response.message==="User created"){
        toast.success("User Created!");
        setTimeout(()=>{
          toast.loading('Redirecting...', {
            position: "top-left"
          })
          
        },1000);
        setTimeout(()=>{
          window.location.href='/';
        },2000)
        
        
      }
      else if(response.message === "Internal Server Error"){
        toast.error("Error creating user!");
      }
      else if(response.message === "Email already exists"){
        toast('User already Exists !', {
          icon: '🤨',
        });

      
      
      
    
      }
   }
 

  return (
    <div className={`container ${activePanel === 'register' ? 'active' : ''}`}>
      <Toaster/>
      <div className="form-container sign-up text-black">
        <form>
          <h1>Sign-up</h1>
          <input type="text" placeholder="Name" value={name} name="name" onChange={handleChange}/>
          <input type="email" placeholder="Email" value={email} name="email" onChange={handleChange}/>
          <input type="password" placeholder="Password" value={password} name="password" onChange={handleChange}/>
          <button onClick={handleSubmit}>Sign Up</button>
          <br />
          <h4>Follow SB Social-media handles</h4>
          <div className="social-icons">
          <a href="https://www.instagram.com/ieeefisatsb/"target='_blank' className="icon"><FaInstagram /></a>
            <a href="https://www.facebook.com/ieeefisat/" target='_blank'  className="icon"><FaFacebook/></a>
            <a href="https://www.ieee.fisat.ac.in" target='_blank' className="icon"><CgWebsite /></a>          

          </div>
        </form>
      </div>
      <div className="form-container sign-in text-black">
        <form>
          <h1>Log In</h1>
          <input type="email" placeholder="Email" value={email} name='email' onChange={handleChangeLogin} />
          <input type="password" placeholder="Password" value={password} name="password" onChange={handleChangeLogin} />
          {/* <a href="#">Forget your password?</a> */}
          <button onClick={handleSubmitLogin}>Log In</button>
          <br />
          <h4>Follow SB Social-media handles</h4>
          <div className="social-icons">
            <a href="https://www.instagram.com/ieeefisatsb/"target='_blank' className="icon"><FaInstagram /></a>
            <a href="https://www.facebook.com/ieeefisat/" target='_blank'  className="icon"><FaFacebook/></a>
            <a href="https://www.ieee.fisat.ac.in" target='_blank' className="icon"><CgWebsite /></a>

          </div>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
<a href="https://ieee-fisat-spectrospect.vercel.app/">
  {/* <img src={process.env.PUBLIC_URL + '/ezgif.gif'} alt="" className="imgg" /> */}
</a>
            <p>Enter your personal details to use all of the site features</p>
            <button className="hidden" onClick={handleLoginClick}>Log In</button>
          </div>
          <div className="toggle-panel toggle-right">
            {/* <a href="https://ieee-fisat-spectrospect.vercel.app/"><Image src="ezgif.gif" alt="img" width={100} height={100} className="imgg" /></a> */}
            <p>Register with your personal details to use all of the site features</p>
            <button className="hiddenn" onClick={handleRegisterClick}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;