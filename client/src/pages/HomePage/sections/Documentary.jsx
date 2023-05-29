import { useContext } from "react";
import "./documentary.css";
import { themecontext } from "../../../context/themeContext";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";

const Documentary = () => {
  const { theme } = useContext(themecontext);
  return (
    <div className={`documentary-container ${theme}`}>
      <div className={`documentary-wrapper ${theme}`}>
        <div className="info-wrapper">
          <h1>THE STORY OF NCS</h1>
          <h3>Watch Our Documentary</h3>
          <p>
            The Story of NCS is a documentary made by NCS Fans that tells how
            NoCopyrightSounds was born, starting from the beginning, 2011, back
            when Billy Woodford decided to create NoCopyrightSounds, it started
            as a promo channel for free music, and later would become a record
            label and be considered the #1 source for free copyright music on
            the platform while providing a great variety of music genres.
          </p>
          <Link
            target="_blank"
            className="watch-btn"
            to={"https://www.youtube.com/watch?v=9O1mGkdKlyE"}
          >
            Watch On YouTube
          </Link>
        </div>
        <div className="doc-video-container">
          <div className="doc-player-wrapper">
            <div className="doc-player">
              <ReactPlayer
                controls
                url={"https://www.youtube.com/watch?v=9O1mGkdKlyE"}
                config={{
                  youtube: {
                    playerVars: { showinfo: 0 },
                  },
                }}
                width="100%"
                height="100%"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentary;
