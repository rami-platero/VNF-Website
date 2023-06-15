import { useContext, useRef, useState } from "react";
import "./home-page.css";
import { RxDoubleArrowDown } from "react-icons/rx";
import { themecontext } from "../../context/themeContext";
import Engagement from "./sections/Engagement";
import Documentary from "./sections/Documentary";
import WBM from "./wbm_logo.png";
import YT from "./yt_logo.png";
import DS from "./Discord-Logo.png";
import "./dark_theme.css";
import SongsSection from "./sections/SongsSection";
import BackgroundsSection from "./sections/BackgroundsSection";
import ContributeSection from "./sections/ContributeSection";

function HomePage() {
  const { theme } = useContext(themecontext);
  /* const [scroll, setScroll] = useState(false); */
  const scrollRef = useRef(null);

 /*  const executeScroll = () => {
    scrollRef.current.scrollIntoView();
  }; */

  return (
    <div className="home-page">
      <div className="content-wrapper">
        <div className="row-1">
          <div className="wrapper">
            <h1>VIP NCS Fans</h1>
            <p>
              Discover the lost and recovered media that has been released
              throughout the years. This is the official website of our
              community,
              <span> built by fans for NCS fans.</span>
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
        {/* <RxDoubleArrowDown
          onClick={async () => {
            await new Promise((resolve) => {
              setScroll(true);
              resolve();
            });
            executeScroll();
          }}
          className="scroll-down"
          size={"4rem"}
        /> */}
      </div>
      <div ref={scrollRef} className={`topics ${theme}`}>
          <Documentary />
          <Engagement />
          <div className="separator-wrapper">
            <div className="separator"></div>
          </div>
          <SongsSection />
          <BackgroundsSection />
          <ContributeSection />
        </div>
      {/* {scroll && (
        
      )} */}
    </div>
  );
}

export default HomePage;
