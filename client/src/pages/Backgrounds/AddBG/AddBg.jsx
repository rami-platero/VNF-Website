import React, { useContext, useEffect } from "react";
import "./add-bg.css";
import "./bg-inputs.css";
import "./drop-bg.css";
import Logo from "../../../assets/ncs-logo-resized.png";
import { BGForm } from "./components/BGForm";
import { IoIosClose } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
import { useValFields } from "../../../hooks/useValFields";
import BackButton from "../../../components/UI/BackButton";
import { memo } from "react";
import { themecontext } from "../../../context/themeContext";
import useDynamicFields from "../../../hooks/useDynamicFields";

function AddBg() {
  const { theme } = useContext(themecontext);
  const {
    dragOver,
    dragEnter,
    dragLeave,
    handleFile,
    filePreview,
    addArtist,
    removeArtist,
    handleArtistChange,
    tracks,
    setTracks,
    handleSubmit,
    errors,
  } = BGForm();
  const { handleDynamicChange, removeDynamicField, addDynamicField } =
    useDynamicFields(tracks, setTracks, {
      artists: [{ name: "" }],
      name: "",
      youtube_link: "",
    });

  const validField = (mainIndex, name, index) => {
    if (!index) {
      return errors.some((el) => {
        return el.mainIndex === mainIndex && el.type === name;
      });
    } else {
      return errors.some((el) => {
        return (
          el.mainContext === mainIndex &&
          el.type === "artist_name" &&
          el.index === index
        );
      });
    }
  };

  return (
    <div className={`form-bg-container ${theme}`}>
      <BackButton />
      <img src={Logo} className={`modal-logo ${theme}`} />
      <h1>Add Background</h1>
      <div className={`form-bg-container-wrapper ${theme}`}>
        <form onSubmit={handleSubmit}>
          <div className="drop-bg">
            <label htmlFor="background">Background</label>
            <div
              className={`drop-container-background ${theme} ${useValFields(
                errors,
                "file"
              )}`}
              onDragOver={dragOver}
              onDragEnter={dragEnter}
              onDragLeave={dragLeave}
              onDrop={(e) => {
                handleFile(e, "drop");
              }}
            >
              <h2>Drag And Drop</h2>
              {filePreview != null && (
                <img
                  src={filePreview.src}
                  alt={filePreview.name}
                  className="background-preview"
                />
              )}
              <input
                type="file"
                placeholder="Background"
                name="background"
                onChange={(e) => {
                  handleFile(e, "input");
                }}
              />
            </div>
            {useValFields(errors, "file") && (
              <p className="val-text">This field must be filled</p>
            )}
          </div>
          <>
            {tracks.map((track, trackIndex) => {
              return (
                <div key={trackIndex} className={`tracks-inputs ${theme}`}>
                  <input
                    required
                    autoFocus
                    type="text"
                    placeholder="Song Name"
                    name="name"
                    autoComplete="off"
                    value={track.name}
                    onChange={(e) => {
                      handleDynamicChange(e, trackIndex);
                    }}
                    className={`input-val ${validField(trackIndex, "name")}`}
                  />
                  {validField(trackIndex, "name") && (
                    <p className="val-text">This field must be filled</p>
                  )}
                  <input
                    required
                    type="text"
                    placeholder="YouTube Link"
                    name="youtube_link"
                    autoComplete="off"
                    value={track.youtube_link}
                    onChange={(e) => {
                      handleDynamicChange(e, trackIndex);
                    }}
                    className={`input-val ${validField(trackIndex, "yt_link")}`}
                  />
                  {validField(trackIndex, "yt_link") && (
                    <p className="val-text">This field must be filled</p>
                  )}
                  {track.artists.map((artist, index) => {
                    return (
                      <>
                        <div key={index} className={`artists-input ${theme}`}>
                          <div className="artist-input">
                            <input
                              required
                              type="text"
                              placeholder="Artist"
                              name="artist"
                              autoComplete="off"
                              onChange={(e) => {
                                handleArtistChange(e, trackIndex, index);
                              }}
                              value={artist.name}
                              className={`input-val ${validField(
                                trackIndex,
                                "artist_name",
                                index
                              )}`}
                            />
                            {track.artists.length > 1 && (
                              <IoIosClose
                                size="1.2rem"
                                className="remove-artist"
                                onClick={() => {
                                  removeArtist(trackIndex, index);
                                }}
                              ></IoIosClose>
                            )}
                          </div>
                          {index == track.artists.length - 1 &&
                            track.artists.length <= 8 && (
                              <button
                                onClick={(e) => {
                                  addArtist(trackIndex, e);
                                }}
                                className="add-artist"
                              >
                                <IoIosAdd size="1.2rem" /> Add Artist
                              </button>
                            )}
                        </div>
                        {validField(trackIndex, "artist_name", index) && (
                          <p className="val-text">This field must be filled</p>
                        )}
                      </>
                    );
                  })}
                  {tracks.length > 1 && (
                    <button
                      className="remove-track"
                      onClick={(e) => {
                        removeDynamicField(trackIndex, e);
                      }}
                    >
                      Remove Track
                    </button>
                  )}
                  {tracks.length - 1 === trackIndex && tracks.length <= 10 && (
                    <button
                      onClick={(e) => {
                        addDynamicField(trackIndex, e);
                      }}
                      className={`add-track ${theme}`}
                    >
                      <IoIosAdd size="1.2rem" /> Add track
                    </button>
                  )}
                </div>
              );
            })}
          </>
          <input type="submit" value={"Submit"}/>
        </form>
      </div>
    </div>
  );
}

export default memo(AddBg);
