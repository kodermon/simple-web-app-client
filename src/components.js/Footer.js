import React from "react";
import { FaGithubSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <a
        href="https://github.com/kodermon"
        target="_blank"
        rel="noreferrer noopener"
        title="GitHub Link"
      >
        <FaGithubSquare className="footer-icon" />
      </a>
      <div>
        <p>
          <a
            href="https://storied-concha-492531.netlify.app/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <span className="kodermon">Kodermon</span>
          </a>{" "}
          &copy;{new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
