import React, { useContext } from "react";
import "./bg.css";
import { IoMdDownload } from "react-icons/io";
import { mainContext } from "../../../context/SongsContext";
import { Link } from "react-router-dom";

function BG({ bg }) {
  const { theme } = useContext(mainContext);
  return (
    <div className={`bg-container ${theme}`}>
      <div className="bg-image-wrapper">
        <img src={bg.file.url} />
      </div>
      <Link className={`download-bg-btn ${theme}`} to={bg.file.download_link}>
        <IoMdDownload /> Download
      </Link>
    </div>
  );
}

export default BG;
