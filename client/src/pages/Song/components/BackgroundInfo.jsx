import "./background-info.css";
import { memo } from "react";
import DownloadButton from "../../../components/UI/DownloadButton";

function BackgroundInfo({ song }) {

  const bg = {
    "--bg": `url(${song.background?.file?.url})`,
  };


  return (
    <section className="background-section" style={bg}>
      <h1>Background</h1>
      <div className="background-container">
        <div className="background-wrapper">
          <img src={song.background?.file?.url} />
          <DownloadButton link={song.background?.file?.download_link}/>
        </div>
      </div>
    </section>
  );
}

export default memo(BackgroundInfo);
