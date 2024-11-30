import React, { useState } from 'react';
import TeamMember from './TeamMember';

const teamMembers = [
  {
    name: "Tom Cruise",
    position: "Founder & Chairman",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
  },
  
  {
    name: "Will Smith",
    position: "Product Designer",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
  },
  {
    name: "Tom Cruise",
    position: "Product Designer",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
  },
  {
    name: "Will Smith",
    position: "Product Designer",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
  },
  {
    name: "Tom Cruise",
    position: "Product Designer",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
  }
];

const Team = () => {
  const [startIndex, setStartIndex] = useState(0);

  const visibleMembers = teamMembers.slice(startIndex, startIndex + 3);
  if (visibleMembers.length < 3) {
    visibleMembers.push(...teamMembers.slice(0, 3 - visibleMembers.length));
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet our talented team of professionals who make the magic happen.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {visibleMembers.map((member, index) => (
              <TeamMember key={startIndex + index} {...member} />
            ))}
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: teamMembers.length - 1 }, (_, i) => (
              <button
                key={i}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  i === startIndex ? 'bg-red-600' : 'bg-gray-300'
                }`}
                onClick={() => setStartIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;