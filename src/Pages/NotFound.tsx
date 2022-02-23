import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1
        style={{
          color: "#fff",

          marginTop: "30%",
        }}
      >
        Page Not Not Found
      </h1>
      <Link to="/" style={{ color: "skyblue" }}>
        Go Back To Home
      </Link>
    </div>
  );
};

export default NotFound;
