import ReactPlayer from "react-player";
import "./docModal.css";

const DocModal = ({ setPlaying }) => {
  return (
    <div
      className="doc-container"
      onClick={() => {
        setPlaying(false);
      }}
    >
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
  );
};

export default DocModal;
