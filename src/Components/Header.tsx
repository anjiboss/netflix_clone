import React from "react";
import Navbar from "./Navbar";

const Header: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 10,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "10vh",
          background: `linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8197872899159664) 49%, rgba(0,0,0,0.6209077380952381) 72%, rgba(255,255,255,0) 100%)`,
        }}
      >
        <Navbar />
      </div>
    </div>
  );
};

export default Header;
