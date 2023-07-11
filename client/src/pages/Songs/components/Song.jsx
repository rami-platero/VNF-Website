import { useContext, memo } from "react";
import "./song.css";
import { IoIosLock } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";
import { mainContext } from "../../../context/SongsContext";
import { useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import EditSong from "../EditSong/EditSong";
import Skeleton from "../../../assets/skeleton-image.png";
import Progress from "../../../components/Progress";
import { themecontext } from "../../../context/themeContext";

const Song = ({ song, setModalIsOpen }) => {
  const {
    removeSong,
    loadingRemove,
    progressSong,
    idRemove,
    setIdRemove,
    setIdEdit,
  } = useContext(mainContext);
  const { theme } = useContext(themecontext);
  const handleEdit = async (e) => {
    e.stopPropagation();
    setIdEdit(song.customID);
    setModalIsOpen(true);
  };
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const artistsList = song?.artists
    ?.map((artist) => {
      return artist?.name;
    })
    .join(", ");
  const handleRemove = (e) => {
    e.stopPropagation();
    if (user != null) {
      setIdRemove(song?._id);
      removeSong(song?._id, user);
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
      <div
        className={`song ${theme} ${idRemove === song?._id}`}
        onClick={handleSongDiv}
      >
        <div className="artwork">
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
        <div className="song-container">
          {song?.loading ? (
            <div className={`song-info ${theme}`}>
              <div className="song-name skeleton"></div>
              <div className="artist-name skeleton"></div>
              <div className="song-genre skeleton"></div>
              <div className="song-views skeleton"></div>
              <div className={`song-status skeleton`}></div>
            </div>
          ) : (
            <div className={`song-info ${theme}`}>
              <p className="song-name">{song?.name}</p>
              <p className="artist-name">{artistsList}</p>
              <p className="song-genre">{song?.genre}</p>
              <p className="song-views">
                Views: <span>{song?.views?.toLocaleString("en-US")}</span>
              </p>
              <div className="song-last-row">
                <span className={`song-status ${song?.status}`}>
                  {song?.status != "Deleted" ? (
                    <>
                      <IoIosLock></IoIosLock>
                      {song?.status?.toUpperCase()}
                    </>
                  ) : (
                    <>
                      <IoIosCloseCircle />
                      {song?.status?.toUpperCase()}
                    </>
                  )}
                </span>
                <p className="song-upload-date">{song?.upload_date}</p>
              </div>
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
    </>
  );
};

export default memo(Song);
