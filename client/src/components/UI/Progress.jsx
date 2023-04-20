import React, { useContext, memo } from "react";
import "./progress.css";
import { mainContext } from "../../context/SongsContext";

function Progress({ progress }) {
  const { theme } = useContext(mainContext);
  const styles = {
    "--progressWidth": "30px",
  };
  return (
    <div className={`progress-container ${theme}`}>
      <div
        className={`progress-loading-bar ${theme}`}
        style={{ "--progressWidth": `${progress}%` }}
      >
        <h3 className="progress-text">{progress}% completed</h3>
      </div>
      {progress === 100 && (
        <h3 className="progress-text-server">uploading to server...</h3>
      )}
    </div>
  );
}

export default memo(Progress);
