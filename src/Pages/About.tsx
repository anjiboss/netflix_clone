import React from "react";
import { Link, useNavigate } from "react-router-dom";

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>About</h1>
      <button
        onClick={() => {
          navigate("/test/123");
        }}
      >
        Test 123
      </button>
    </div>
  );
};

export default About;
