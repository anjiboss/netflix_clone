import React from "react";
import Navbar from "./Navbar";

const Header: React.FC = () => {
  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "10vh",
        }}
      >
        <Navbar />
      </div>
    </>
  );
};

export default Header;
