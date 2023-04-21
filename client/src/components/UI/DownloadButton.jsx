import React from "react";
import { Link } from "react-router-dom";
import { IoMdDownload } from "react-icons/io";
import "./download-button.css";

const DownloadButton = ({ link }) => {
  return (
    <Link className={`download-btn`} to={link}>
      <IoMdDownload /> Download
    </Link>
  );
};

export default DownloadButton;
