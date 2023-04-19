import { useContext } from "react";
import "./song.css";
import { IoIosLock } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";
import { mainContext } from "../context/SongsContext";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import EditSong from "./EditSong";

function Song({ song }) {
  const [idRemove, setIdRemove] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { removeSong, theme, loadingRemove } = useContext(mainContext);
  const artistsList = song.artists
    .map((artist) => {
      return artist.name;
    })
    .join(", ");
  const handleRemove = () => {
    setIdRemove(song.customID);
    if (user != null) {
      removeSong(song._id, user);
    } else {
      console.log("you can't remove a song if you are not logged in");
    }
  };
  const handleEdit = async () => {
    setModalIsOpen(true);
  };

  const customURL = () => {
    return song.name.replaceAll(" ", "-").replace(/[\(\)']+/g, "");
  };

  const handleSongDiv = () => {
    navigate(`/deleted-song/${song.customID}/${customURL()}`, {
      state: { id: song._id },
    });
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      {modalIsOpen ? (
        <EditSong setModalIsOpen={setModalIsOpen} song={song} />
      ) : (
        <div
          className={
            idRemove === song.customID
              ? `song ${theme} ${loadingRemove}`
              : `song ${theme}`
          }
        >
          <div className="artwork" onClick={handleSongDiv}>
            <img
              src={
                song.artwork?.url
                  ? song.artwork.url
                  : "https://i1.sndcdn.com/artworks-000211899247-bb6aub-t500x500.jpg"
              }
            />
          </div>
          <div className="song-wrapper">
            <div className="song-container">
              <div className={`song-info ${theme}`}>
                <p className="song-name">{song.name}</p>
                <p className="artist-name">{artistsList}</p>
                <p className="song-genre">
                  {/* <div className="genre-circle"></div> */}
                  {song.genre}
                </p>
                <p>
                  Views: <span style={{color: "#bebebe"}}>{song.views.toLocaleString("en-US")}</span>
                </p>
                <p className="song-upload-date">
                  Date Uploaded: {song.upload_date}
                </p>
                <h3>
                  {/* Status: */}
                  <span className={`song-status ${song.status}`}>
                    {song.status != "Deleted" ? (
                      <>
                        <IoIosLock></IoIosLock>
                        {song.status.toUpperCase()}
                      </>
                    ) : (
                      <>
                        <IoIosCloseCircle color="red" />
                        {song.status.toUpperCase()}
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Song;
