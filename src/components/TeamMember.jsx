import React from 'react';
import { Twitter, Instagram, Linkedin } from 'lucide-react';

const TeamMember = ({ name, position, image }) => {
  return (
<div className="flex flex-col p-6 w-2/3 md:w-1/3">
      <img 
        src={image} 
        alt={name} 
        className="w-74 h-82 object-cover mb-4 rounded-lg shadow-lg"
      />
      <h3 className="text-xl font-bold mt-4">{name}</h3>
      <p className="text-gray-600 mb-4">{position}</p>
      <div className="flex space-x-4">
        <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">
          <Twitter size={20} />
        </a>
        <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">
          <Instagram size={20} />
        </a>
        <a href="#" className="text-gray-600 hover:text-blue-700 transition-colors">
          <Linkedin size={20} />
        </a>
      </div>
    </div>
  );
};

export default TeamMember;