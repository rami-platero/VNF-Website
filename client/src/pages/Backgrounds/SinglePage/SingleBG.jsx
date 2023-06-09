import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { bgcontext } from "../../../context/bgsContext";
import "./single-bg.css";
import ItemTrack from "./components/ItemTrack";
import DownloadButton from "../../../components/UI/DownloadButton.jsx";
import { themecontext } from "../../../context/themeContext";
import {IoArrowBack} from 'react-icons/io5'

function SingleBG() {
  const [bg, setBg] = useState(null);
  const {theme} = useContext(themecontext)
  const { customID } = useParams();
  const { getBg } = useContext(bgcontext);
  const getPost = async () => {
    if (customID) {
      const res = await getBg(customID);
      setBg(res);
    }
  };

  const navigate = useNavigate()

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div
      style={{ "--singleBG": `url(${bg?.file?.url})` }}
      className={`single-bg-container ${theme}`}
    >
      {bg && 
      <div className="single-bg-wrapper">
      <div className="bg-container">
        <div className="button-align">
        <button
          className={`back-btn`}
          onClick={() => {
            navigate("/backgrounds");
          }}
        >
          <IoArrowBack />
          Back
        </button>
        </div>
        <img src={bg?.file?.url} />
        <DownloadButton link={bg?.file?.download_link} />
      </div>
      <div className="tracks-bg-grid-container">
        <h1>SONGS</h1>
        <p>These songs used the same background</p>
        <div className="bg-tracks-container">
          {bg?.tracks?.map((track, index) => {
            return <ItemTrack key={index} track={track} />;
          })}
        </div>
      </div>
    </div>}
    </div>
  );
}

export default SingleBG;
