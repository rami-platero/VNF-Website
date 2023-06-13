import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { themecontext } from "../../context/themeContext";
import { mainContext } from "../../context/SongsContext";
import "./deleted-song.css";
import { IoArrowBack } from "react-icons/io5";
import ReactPlayer from "react-player";
import { IoCopyOutline } from "react-icons/io5";
import DeletedInfo from "./components/DeletedInfo";
import BackgroundInfo from "./components/BackgroundInfo";
import toast, { Toaster } from "react-hot-toast";

function DeletedSong() {
  const navigate = useNavigate();
  const { customID } = useParams();
  const { getSingleSong } = useContext(mainContext);
  const { theme } = useContext(themecontext);
  const [song, setSong] = useState({});
  const getSong = async () => {
    if (customID) {
      const post = await getSingleSong(customID);
      setSong(post);
    }
  };

  useEffect(() => {
    getSong();
  }, []);

  const artistsList = song.artists
    ?.map((artist) => {
      return artist?.name;
    })
    .join(", ");

  const bgURL = song?.link?.split("?v=")[1];
  const someStyle = {
    "--bgURL": `url(https://i3.ytimg.com/vi/${bgURL}/maxresdefault.jpg)`,
  };

  const copy = () => {
    toast.success("Copied to clipboard", {
      position:"bottom-center",
      style: {
        backgroundColor: "#111314",
        color: "white",
      }
    });
  };

  return (
    <div className={`post-container ${theme}`}>
      <section className={`video-container ${theme}`} style={someStyle}>
        <div className="video-wrapper">
          <div className="video">
        <button
          className={`back-btn`}
          onClick={() => {
            navigate(-1);
          }}
        >
          <IoArrowBack />
          Back
        </button>
            <h1>{song?.name}</h1>
            <h3>{artistsList}</h3>
            <h5>Uploaded on {song.upload_date}</h5>
            <div className="player-wrapper">
              <div className="react-player-wrapper">
                <ReactPlayer
                  controls
                  url={song?.link}
                  config={{
                    youtube: {
                      playerVars: { showinfo: 0 },
                    },
                  }}
                  className="react-player"
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </div>
          <div className="original-info">
            <h1>Original Information</h1>
            <div className="info">
              <p className="original-link">
                Original YouTube Link:
                {song.original_link ? (
                  <span
                    onClick={() => {
                      navigator.clipboard.writeText(song.original_link);
                      copy();
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {song.original_link}
                    <IoCopyOutline
                      size="23px"
                      style={{ verticalAlign: "middle", paddingLeft: ".5rem" }}
                    />
                  </span>
                ) : (
                  <span>NO DATA</span>
                )}
              </p>
              <div className="views">
                <p>
                  Views:{" "}
                  {song.views ? (
                    <span>{song.views?.toLocaleString("en-US")}</span>
                  ) : (
                    <span>NO DATA</span>
                  )}
                </p>
                <p className="views-date">
                  As of:{" "}
                  {song.views_date ? (
                    <span>{song.views_date}</span>
                  ) : (
                    <span>NO DATA</span>
                  )}
                </p>
              </div>
              <div className="description">
                <p>
                  Description{" "}
                  <IoCopyOutline
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigator.clipboard.writeText(song.original_description);
                      copy()
                    }}
                  />
                </p>
                <div className={`description-text ${!song.original_description && "no-data"}`}>
                  {song.original_description? song.original_description: "NO DATA"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Toaster />
      <DeletedInfo song={song} artistsList={artistsList} />
      {song.background != null && <BackgroundInfo song={song} />}
    </div>
  );
}

export default DeletedSong;
