import React from 'react';
import Image from 'next/image';

const TeamMemberCard = ({ name, image, role }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl transform hover:-translate-y-2">
    <div className="relative h-64 w-full">
      <Image
        src={image}
        alt={name}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-300 ease-in-out hover:scale-105"
      />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
      <p className="text-sm text-gray-600">{role}</p>
    </div>
  </div>
);

const TeamSection = ({ title, members }) => (
  <div className="mb-16">
    <h2 className="text-3xl font-bold text-white mb-8">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {members.map((member, index) => (
        <TeamMemberCard key={index} {...member} />
      ))}
    </div>
  </div>
);

const SDPTeamMember = ({ name, page }) => (
  <li className="mb-4">
    <span className="font-semibold">{name}</span>  {page}
  </li>
);

const SDPTeamSection = ({ members }) => (
  <div className="mb-16">
    <h2 className="text-3xl font-bold text-gray-800 mb-8">SDP Team</h2>
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {members.map((member, index) => (
        <SDPTeamMember key={index} {...member} />
      ))}
    </ul>
  </div>
);

export default function TeamPage() {
  

  const contentTeam = [
    { name: "Anjal P Dijo", image: "/images/Akhil.jpg", role: "CS Chair" },
    { name: "Akhil Gireesh", image: "/images/Akhil.jpg", role: "CS Secretary" },
    { name: "Ann Paul", image: "/images/eva-green.jpg", role: ""},
    { name: "Gregory Kurien", image: "/images/Akhil.jpg", role: "SPS Chair" },
    { name: "V M Ghanashyam", image: "/images/Akhil.jpg", role: "SPS Secretary" },
    { name: "Shivani Krishna", image: "/images/Akhil.jpg", role: "WISP" },
    { name: "Anantha Krishnan", image: "/images/alice-johnson.jpg", role: "Webmaster" },
    { name: "Cibin Joseph", image: "/images/Akhil.jpg", role: "Design" },
    { name: "Abhinav Manoj", image: "/images/bob-williams.jpg", role: "Associate Webmaster" },
    { name: "Poorvaja M Sooraj", image: "/images/grace-kelly.jpg", role: "Content Team" },
    { name: "Neha", image: "/images/henry-ford.jpg", role: "Tech Team" },
    { name: "Neha A R", image: "/images/henry-ford.jpg", role: "Content Team" },
    { name: "Athul Krishna", image: "/images/henry-ford.jpg", role: "Content Team" },
    { name: "Aashna K S", image: "/images/henry-ford.jpg", role: "Content Team" },
  ];

  const sdpTeam = [
    { name: "Adarsh R Shankar" },
    { name: "Amal Karthik"},
    { name: "Advaith G Menon" },
    { name: "Aadi Sankar" },
    { name: "Abel Jomy" },
    { name: "Afiya Mol" },
    { name: "Amaldev V" },
    { name: "Ann maria tomichan" },
    { name: "Ansa Anto" },
    { name: "Anugraha Biju" },
    { name: "Athul Krishna V V" },
    { name: "Bhavana R Nair" },
    { name: "Christa Jose" },
    { name: "Hima mp" },
    { name: "Maria Rahael Martin" },
    { name: "Poorvaja m Sooraj" },
    { name: "Rachana Rajesh Nair" },
  ];

  return (
    <div className="min-h-screen bg-black py-16 text-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-white mb-16">Meet Our Team</h1>
        
        
        <TeamSection title="Content Team" members={contentTeam} />
        
        <SDPTeamSection members={sdpTeam} />
      </div>
    </div>
  );
}