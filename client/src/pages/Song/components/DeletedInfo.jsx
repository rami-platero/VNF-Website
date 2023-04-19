import React from "react";
import "./deleted-info.css";
import { IoMdDownload } from "react-icons/io";

function DeletedInfo({ song, artistsList }) {
  const someStyle = {
    "--art": `url(${song.artwork?.url})`,
  };

  return (
    <section
      className="deleted-info-container"
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
          <p /* style={{ color: "red" }} */>
            <span>Genre:</span> {song.genre}
          </p>
          <p className="trivia">
            <span>Trivia: </span>Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Natus error accusantium quasi corporis doloribus
            vitae nisi obcaecati corrupti eligendi repudiandae quo, deleniti,
            ratione sint consectetur explicabo doloremque impedit. Voluptatibus,
            necessitatibus!
          </p>
        </div>
      </div>
    </section>
  );
}

export default DeletedInfo;
