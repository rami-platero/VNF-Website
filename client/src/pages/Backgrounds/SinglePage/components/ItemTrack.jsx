import React from "react";
import "./item-track.css";
import { Link } from "react-router-dom";
import { IoLogoYoutube } from "react-icons/io5";

const ItemTrack = ({ track }) => {
  const bgURL = track?.youtube_link?.split("?v=")[1];
  const artistsList = track?.artists
    ?.map((artist) => {
      return artist.name;
    })
    .join(", ");

  return (
    <div className="item-container">
      <div className="item-wrapper">
        <img src={`https://i3.ytimg.com/vi/${bgURL}/maxresdefault.jpg`} />
        <h3>{artistsList}</h3>
        <h4>{track?.name}</h4>
        <Link className="yt-btn" to={track?.youtube_link} target="_blank">
          <IoLogoYoutube /> Watch On YouTube
        </Link>
      </div>
    </div>
  );
};

export default ItemTrack;
