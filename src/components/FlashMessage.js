import React from 'react';

const FlashMessage = ({ messages }) => {
  return (
    <div className="floating-alerts">
      {messages.map((message, idx) => (
        <div
          key={idx}
          className="alert alert-success text-center floating-alert shadow-sm"
        >
          {message}
        </div>
      ))}
    </div>
  );
};

export default FlashMessage;
