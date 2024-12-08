'use client'
import React from "react";
import Lottie from "react-lottie";
import animationData from './OJLRJKUGe7.json'

export default function loading(){
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    
    return (
      <div className='w-full flex items-center bg-black z-10 min-h-screen '>
        <Lottie 
          options={defaultOptions}
          height={400}
          width={400}
        />
      </div>
    );
}