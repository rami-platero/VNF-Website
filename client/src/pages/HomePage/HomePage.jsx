import { useContext, useRef, useState } from "react";
import "./home-page.css";
import docVideo from "./NCS-Documentary-trailer.mp4";
import { RxDoubleArrowDown } from "react-icons/rx";
import { themecontext } from "../../context/themeContext";
import Engagement from "./sections/Engagement";
import Documentary from "./sections/Documentary";
import WBM from "./wbm_logo.png";
import YT from "./yt_logo.png";
import DS from './Discord-Logo.png'
import './dark_theme.css'

function HomePage() {
  const { theme } = useContext(themecontext);
  const [scroll, setScroll] = useState(false);
  const scrollRef = useRef(null);

  const executeScroll = () => {
    scrollRef.current.scrollIntoView();
  };

  return (
    <main>
      <div className="main-container">
        <div className="main-content">
         {/*  <div className="overlay">
            <video
              className="back-video"
              src={docVideo}
              autoPlay
              loop
              muted
              playsInline
            ></video>
          </div> */}
          <div className="content-wrapper">
            <div className="row-1">
              <div className="wrapper">
              <h1>VIP NCS Fans</h1>
              <p>
                In this website you'll find the recovered and information about the unrecovered media that was deleted and lost of the record label{" "}
                <span>NoCopyrightSounds</span>
              </p>
              <button className="learn-more-btn">Learn More</button>
              </div>
              <div className="sources">
                <p className="source-title">Sources and Tools</p>
                <hr />
                <div className="logos">
                  <img src={WBM} />
                  <img src={YT} />
                  <img src={DS} />
                </div>
              </div>
            </div>
           {/*   <div className="row-2">
              <img src="../src/pages/HomePage/catalogue.png" />
            </div> */}
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
          </div>
        </div>
        {scroll && (
          <div ref={scrollRef} className={`topics ${theme}`}>
            <Engagement />
            <Documentary />
          </div>
        )}
      </div>
    </main>
  );
}

export default HomePage;
