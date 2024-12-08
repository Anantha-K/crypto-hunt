import Image from "next/image";
import React from "react";
import img from '../Image.png'
const page = () => {
  return (
    <div className="w-full bg-black min-h-screen flex items-center flex-col justify-center">
      <h1 className="text-white self-center pt-12 text-5xl">Our Team</h1>
      <div className=" w-full md:w-[80%] h-full pt-28 grid grid-cols-2 md:grid-cols-4 md:grid-rows-3 ">
      <div className="flex items-center justify-center"> 
      <div className="border-2 group border-red-600 hover:cursor-pointer w-36 h-36 md:w-56 md:h-56 rounded-full flex flex-col item-end justify-center">
          <Image src={img} alt='img'  className='self-center md:h-48 md:w-48 h-32 w-32 -translate-y-10 md:-translate-y-16 group-hover:-translate-y-12 md:group-hover:-translate-y-20 md:group-hover:scale-105 text-white transition duration-700'/>
            <h1 className="group-hover:-translate-y-10 text-white self-center opacity-0 transform transition duration-100 group-hover:opacity-100">Anantha Krishnan</h1>
          </div>
          </div>
          <div className="flex items-center justify-center"> 
      <div className="border-2 group border-red-600 hover:cursor-pointer w-36 h-36 md:w-56 md:h-56 rounded-full flex flex-col item-end justify-center">
          <Image src={img} alt='img'  className='self-center md:h-48 md:w-48 h-32 w-32 -translate-y-10 md:-translate-y-16 group-hover:-translate-y-12 md:group-hover:-translate-y-20 md:group-hover:scale-105 text-white transition duration-700'/>
            <h1 className="group-hover:-translate-y-10 text-white self-center opacity-0 transform transition duration-100 group-hover:opacity-100">Anantha Krishnan</h1>
          </div>
          </div>     <div className="flex items-center justify-center"> 
      <div className="border-2 group border-red-600 hover:cursor-pointer w-36 h-36 md:w-56 md:h-56 rounded-full flex flex-col item-end justify-center">
          <Image src={img} alt='img'  className='self-center md:h-48 md:w-48 h-32 w-32 -translate-y-10 md:-translate-y-16 group-hover:-translate-y-12 md:group-hover:-translate-y-20 md:group-hover:scale-105 text-white transition duration-700'/>
            <h1 className="group-hover:-translate-y-10 text-white self-center opacity-0 transform transition duration-100 group-hover:opacity-100">Anantha Krishnan</h1>
          </div>
          </div>     <div className="flex items-center justify-center"> 
      <div className="border-2 group border-red-600 hover:cursor-pointer w-36 h-36 md:w-56 md:h-56 rounded-full flex flex-col item-end justify-center">
          <Image src={img} alt='img'  className='self-center md:h-48 md:w-48 h-32 w-32 -translate-y-10 md:-translate-y-16 group-hover:-translate-y-12 md:group-hover:-translate-y-20 md:group-hover:scale-105 text-white transition duration-700'/>
            <h1 className="group-hover:-translate-y-10 text-white self-center opacity-0 transform transition duration-100 group-hover:opacity-100">Anantha Krishnan</h1>
          </div>
          </div>
      </div>
    </div>
  );
};

export default page;
