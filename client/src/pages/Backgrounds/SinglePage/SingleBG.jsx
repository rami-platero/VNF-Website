import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { bgcontext } from "../../../context/bgsContext";
import "./single-bg.css";
import ItemTrack from "./components/ItemTrack";
import DownloadButton from "../../../components/UI/DownloadButton.jsx";
import BackButton from "../../../components/UI/BackButton";

function SingleBG() {
  const [bg, setBg] = useState(null);
  const { customID } = useParams();
  const { getBg } = useContext(bgcontext);
  const getPost = async () => {
    if (customID) {
      const res = await getBg(customID);
      setBg(res);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div
      style={{ "--singleBG": `url(${bg?.file?.url})` }}
      className="single-bg-container"
    >
      {bg && 
      <div className="single-bg-wrapper">
      <div className="bg-container">
        <div className="button-align">
          <BackButton />
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
