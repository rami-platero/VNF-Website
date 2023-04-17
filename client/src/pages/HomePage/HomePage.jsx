import { useContext, useRef, useState } from "react";
import "./home-page.css";
import docVideo from "./NCS-Documentary-trailer.mp4";
import VNFLogo from "./vnf-logo.png";
import ReactPlayer from "react-player";
import { RxDoubleArrowDown } from "react-icons/rx";
import { mainContext } from "../../context/SongsContext";
import { Link } from "react-router-dom";

function HomePage() {
  const [scroll, setScroll] = useState(false);
  const scrollRef = useRef(null);

  const executeScroll = () => {
    scrollRef.current.scrollIntoView();
  };
  const { theme } = useContext(mainContext);

  return (
    <main>
      <div className="main-container">
        <div className="main-content">
          <div className="overlay">
            <video
              className="back-video"
              src={docVideo}
              autoPlay
              loop
              muted
              playsInline
            ></video>
          </div>
          <div className="content-wrapper">
            <div className="row-1">
              {/* <img src={VNFLogo} /> */}
              <h1>WELCOME TO VNF</h1>
              <p>
                In this website you'll find the recovered media and all the
                information about the lost media of the record label{" "}
                <span>NoCopyrightSounds</span>
              </p>
              <button className="learn-more-btn">Learn More</button>
            </div>
            <RxDoubleArrowDown
              onClick={async () => {
                await new Promise((resolve) => {
                  setScroll(true);
                  resolve();
                });
                executeScroll();
              }}
              className="scroll-down"
              size={"4rem"}
            />
            {/* <div className="player-wrapper">
              <div className="react-player-wrapper">
                <ReactPlayer
                  controls
                  url={"https://www.youtube.com/watch?v=9O1mGkdKlyE&t=0s"}
                  config={{
                    youtube: {
                      playerVars: { showinfo: 0 },
                    },
                  }}
                  className="react-player"
                  width="100%"
                  height="100%"
                />
              </div>
            </div> */}
          </div>
        </div>
        {scroll && (
          <div ref={scrollRef} className={`topics ${theme}`}>
            <div className={`documentary-container ${theme}`}>
              <div className={`documentary-wrapper ${theme}`}>
                <div className="info-wrapper">
                  <h1>THE STORY OF NCS</h1>
                  <h3>Watch Our Documentary</h3>
                  <p>
                    The Story of NCS is a documentary made by NCS Fans that
                    tells how NoCopyrightSounds was born, starting from the
                    beginning, 2011, back when Billy Woodford decided to create NoCopyrightSounds, it started as a promo channel for free music, and later would become a record label and be
                    considered the #1 source for free copyright music on the
                    platform while providing a great variety of music genres.
                    <br />
                    But in this documentary, for those who have recently
                    discovered NCS will know more about songs that got deleted
                    but played a big part to help the label grow, facts that only some
                    of the OG fans remember or know, and more. Make sure you
                    check out our documentary.
                  </p>
                    <Link target="_blank" className="watch-btn" to={"https://www.youtube.com/watch?v=9O1mGkdKlyE"}>
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
          </div>
        )}
      </div>
    </main>
  );
}

export default HomePage;
