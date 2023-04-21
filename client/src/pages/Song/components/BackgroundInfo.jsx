import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./background-info.css";
import { IoMdDownload } from "react-icons/io";
import { mainContext } from "../../../context/SongsContext";
import { memo } from "react";
import DownloadButton from "../../../components/UI/DownloadButton";

function BackgroundInfo({ song }) {
  const [URL, setURL] = useState("");
  const { delSongs } = useContext(mainContext);

  const downloadImage = () => {
    const currURL = song?.background?.url?.split("upload/");
    currURL?.splice(
      1,
      0,
      `upload/fl_attachment:${song?.name?.replace(/[\(\)']+/g, "")}/`
    );
    setURL(currURL?.join(""));
  };

  useEffect(() => {
    downloadImage();
  }, []);

  const bg = {
    "--bg": `url(${song.background?.url})`,
  };

  /* const sameBackground = delSongs.filter((delSong) => {
    if (delSong.name !== song.name) {
      return delSong.background?.name === song.background?.name;
    }
  });

  console.log(sameBackground); */

  return (
    <section className="background-section" style={bg}>
      <h1>Background</h1>
      <div className="background-container">
        <div className="background-wrapper">
          <img src={song.background?.url} />
          <DownloadButton link={URL}/>
          {/* <Link to={URL} className="download-bg">
            <IoMdDownload></IoMdDownload> Download
          </Link> */}
        </div>
      </div>
    </section>
  );
}

export default memo(BackgroundInfo);
