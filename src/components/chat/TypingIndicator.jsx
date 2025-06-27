import React from 'react';

const TypingIndicator = ({ isTyping = false, size = "sm" }) => {
  if (!isTyping) return null;

  const dotSize = size === "sm" ? "w-1 h-1" : "w-1.5 h-1.5";
  
  return (
    <div className="flex space-x-0.5">
      <div className={`${dotSize} bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]`}></div>
      <div className={`${dotSize} bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]`}></div>
      <div className={`${dotSize} bg-gray-500 rounded-full animate-bounce`}></div>
    </div>
  );
};

export default TypingIndicator;
