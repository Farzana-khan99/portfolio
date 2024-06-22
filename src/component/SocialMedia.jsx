import React from "react";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";

const SocialMedia = () => {
  return (
    <div className="app__social">
      <div>
       
        <a href="https://github.com/Farzana-khan99" target="_blank">
          <FaGithub />
        </a>
      </div>

      <div>
        <a
          href="https://www.linkedin.com/in/farzana-khan-mern-stack-developer-526464268"
          target="_blank"
        >
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
};

export default SocialMedia;
