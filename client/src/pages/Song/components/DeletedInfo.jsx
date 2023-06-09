import React, { useContext } from "react";
import "./deleted-info.css";
import { IoMdDownload } from "react-icons/io";
import {themecontext} from '../../../context/themeContext'
import BackgroundInfo from './BackgroundInfo.jsx'

function DeletedInfo({ song, artistsList }) {
  const someStyle = {
    "--art": `url(${song.artwork?.url})`,
  };

  const {theme} = useContext(themecontext)

  return (
    <section
      className={`deleted-info-container ${theme}`}
      style={
        someStyle
      } /* style={{backgroundImage: `url(${song.artwork?.url})`}} */
    >
      <div className="deleted-wrapper">
        <div className="deleted-artwork">
          <img
            src={
              song.artwork?.url
                ? song.artwork.url
                : "https://i1.sndcdn.com/artworks-000211899247-bb6aub-t500x500.jpg"
            }
          />
          <button><IoMdDownload size="1rem"></IoMdDownload> Download Artwork</button>
        </div>
        <div className="info-wrapper">
          <h1>Song info</h1>
          <p>
            <span>Song Name:</span> {song.name}
          </p>
          <p>
            <span>Artists:</span> {artistsList}
          </p>
          <p>
            <span>Status:</span> {song.status}
          </p>
          <p>
            <span>Upload Date:</span> {song.upload_date}
          </p>
          <p>
            <span>Duration:</span> {song.duration}
          </p>
          <p>
            <span>Genre:</span> {song.genre}
          </p>
        </div>
      </div>
    </section>
  );
}

export default DeletedInfo;
