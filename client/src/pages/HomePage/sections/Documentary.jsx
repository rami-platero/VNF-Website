import "./documentary.css";
import Thumbnail from "../assets/thumbnail.png";
import { IoPlay } from "react-icons/io5";
import { CSSTransition } from "react-transition-group";
import docVideo from "../NCS-Documentary-trailer.mp4";
import { useState } from "react";
import DocModal from "./DocModal";

const Documentary = () => {
  const [playing, setPlaying] = useState(false);
  return (
    <div className={`documentary-container`}>
      <CSSTransition
        unmountOnExit
        in={playing}
        classNames={"grow"}
        timeout={300}
      >
        <DocModal setPlaying={setPlaying} />
      </CSSTransition>
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
      <div className={`documentary-wrapper`}>
        <div className="info-wrapper">
          <label>FEATURED</label>
          <h2>THE STORY OF NCS</h2>
        </div>
        <div
          className="doc-thumbnail"
          onClick={() => {
            setPlaying(true);
          }}
        >
          <IoPlay />
          <img src={Thumbnail} />
        </div>
      </div>
    </div>
  );
};

export default Documentary;
