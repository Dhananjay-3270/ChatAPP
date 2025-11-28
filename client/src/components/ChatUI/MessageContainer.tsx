import React from "react";
import backgroundImage from "../../assets/Background.jpg";

const MessageContainer: React.FC = () => {
  return (
    <div
      className="h-full w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        minHeight: "100vh",
      }}
    ></div>
  );
};

export default MessageContainer;
