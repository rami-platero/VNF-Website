import { useContext, memo, useEffect } from "react";
import "./song.css";
import { IoIosLock } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";
import { mainContext } from "../context/SongsContext";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import EditSong from "./EditSong";
import Skeleton from "../assets/skeleton-image.png";
import Progress from "./UI/Progress";

const Song = ({ song }) => {
  const { removeSong, theme, loadingRemove, progressSong } =
    useContext(mainContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleEdit = async () => {
    setModalIsOpen(true);
  };
  const [idRemove, setIdRemove] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const artistsList = song?.artists
    ?.map((artist) => {
      return artist?.name;
    })
    .join(", ");
  const handleRemove = () => {
    setIdRemove(song?.customID);
    if (user != null) {
      removeSong(song?._id, user);
    } else {
      console.log("you can't remove a song if you are not logged in");
    }
  };

  const customURL = () => {
    return song?.name.replaceAll(" ", "-").replace(/[\(\)']+/g, "");
  };

  const handleSongDiv = () => {
    navigate(`/deleted-song/${song?.customID}/${customURL()}`, {
      state: { id: song?._id },
    });
  };

  return (
    <>
      {modalIsOpen ? (
        <EditSong setModalIsOpen={setModalIsOpen} song={song} />
      ) : (
        <div
          className={
            idRemove === song?.customID
              ? `song ${theme} ${loadingRemove}`
              : `song ${theme}`
          }
        >
          <div className="artwork" onClick={handleSongDiv}>
            {song?.loading ? (
              <img src={Skeleton} className="skeleton-img" />
            ) : (
              <img
                src={
                  song?.artwork?.url
                    ? song?.artwork.url
                    : "https://i1.sndcdn.com/artworks-000211899247-bb6aub-t500x500.jpg"
                }
              />
            )}
          </div>
          <div className="song-wrapper">
            <div className="song-container">
              {song?.loading ? (
                <div className={`song-info ${theme}`}>
                  <div className="song-name skeleton"></div>
                  <div className="artist-name skeleton"></div>
                  <div className="song-genre skeleton"></div>
                  <div className="song-views skeleton"></div>
                  <div className="song-upload-date skeleton"></div>
                  <div className={`song-status skeleton`}></div>
                </div>
              ) : (
                <div className={`song-info ${theme}`}>
                  <p className="song-name">{song?.name}</p>
                  <p className="artist-name">{artistsList}</p>
                  <p className="song-genre">{song?.genre}</p>
                  <p>
                    Views:{" "}
                    <span style={{ color: "#bebebe" }}>
                      {song?.views?.toLocaleString("en-US")}
                    </span>
                  </p>
                  <p className="song-upload-date">
                    Date Uploaded: {song?.upload_date}
                  </p>
                  <h3>
                    <span className={`song-status ${song?.status}`}>
                      {song?.status != "Deleted" ? (
                        <>
                          <IoIosLock></IoIosLock>
                          {song?.status?.toUpperCase()}
                        </>
                      ) : (
                        <>
                          <IoIosCloseCircle color="red" />
                          {song?.status?.toUpperCase()}
                        </>
                      )}
                    </span>
                  </h3>
                  {user?.roles_name?.includes("admin") && (
                    <div className="actions">
                      <button
                        className={`remove-song ${theme}`}
                        onClick={handleRemove}
                        disabled={loadingRemove}
                      >
                        Remove
                      </button>
                      <button
                        className={`edit-song ${theme}`}
                        onClick={handleEdit}
                        disabled={loadingRemove}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              )}
              {progressSong && song?.loading && (
                <Progress progress={progressSong} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(Song);
