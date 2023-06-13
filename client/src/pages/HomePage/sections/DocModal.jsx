import ReactPlayer from "react-player";
import "./docModal.css";
import { IoCloseSharp } from "react-icons/io5";

const DocModal = ({ setPlaying }) => {
  const closeModal = () => {
    setPlaying(false);
  };
  return (
    <div className="doc-container" onClick={closeModal}>
      <div className="doc-player-wrapper">
        <IoCloseSharp onClick={closeModal} />
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
  );
};

export default DocModal;
