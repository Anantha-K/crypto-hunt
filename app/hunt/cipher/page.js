"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const CipherLandingPage = () => {
  const INITIAL_CIPHER_IMAGE = process.env.NEXT_PUBLIC_INITIAL_CIPHER_IMAGE;

  return (
    <div className="w-full h-screen bg-black text-white flex flex-col items-center justify-center space-y-8">
      <h1 className="text-5xl font-bold text-center">Cipher Challenge</h1>
      
      <motion.div 
        className="w-[80%] max-w-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image 
          src={INITIAL_CIPHER_IMAGE} 
          alt="Initial Cipher Challenge" 
          width={800} 
          height={400} 
          className="rounded-2xl shadow-2xl"
          priority
        />
      </motion.div>
      
      <div className="text-center max-w-xl px-4">
        <p className="text-xl mb-6">
          Observe the cipher carefully. You will need to solve it after completing the hunt questions.
        </p>
        
        <Link href="/hunt/game"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 inline-block"
        >
          Start Hunt
        </Link>
      </div>
    </div>
  );
};

export default CipherLandingPage;