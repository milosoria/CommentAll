import React from 'react';
import './Popup.css';

const Popup = () => {
  return (
    <div className="w-full h-full bg-slate-800 flex-col">
      <div className="p-2">
        <h1 className="text-xl text-white">Comment All</h1>
        <p className="text-md text-white">
          Comment on any page and anywhere, just use the command Alt+C to insert
          a comment on your mouse position
        </p>
        <p className="text-md text-white">Insert GIF...</p>
      </div>
    </div>
  );
};

export default Popup;
