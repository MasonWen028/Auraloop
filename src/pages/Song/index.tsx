import React from "react";

interface SongProps {
  type?: string;
}


const Song: React.FC<SongProps> = ({type}) => {
  console.log(type);
  
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the homepage!</p>
    </div>
  );
};

export default Song;
