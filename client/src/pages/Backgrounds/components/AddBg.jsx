import React, { useContext } from "react";
import "./add-bg.css";
import Logo from "../../../assets/ncs-logo-resized.png";
import { mainContext } from "../../../context/SongsContext";
import DropBG from "./form/DropBG";
import BG_Inputs from "./form/BG_Inputs";
import { BGForm } from "./form/BGForm.jsx";
import { IoIosClose } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
import { useValFields, useValMultiFields } from "../../../hooks/useValFields";

function AddBg() {
  const { theme } = useContext(mainContext);
  const {
    dragOver,
    dragEnter,
    dragLeave,
    fileDrop,
    handleImageReader,
    backgroundPreview,
    addInputField,
    addArtist,
    removeTrack,
    removeArtist,
    handleArtistChange,
    handleTrackChange,
    tracks,
    file,
    handleSubmit,
    errors,
  } = BGForm();

  return (
    <div className={`form-bg-container ${theme}`}>
      <img src={Logo} className={`modal-logo ${theme}`} />
      <h1>Add Background</h1>
      <div className={`form-bg-container-wrapper ${theme}`}>
        <form onSubmit={handleSubmit}>
          {/* <DropBG />
          <BG_Inputs /> */}
          <div className="drop-bg">
            <label htmlFor="background">Background</label>
            <div
              className={`drop-container-background ${theme}`}
              onDragOver={dragOver}
              onDragEnter={dragEnter}
              onDragLeave={dragLeave}
              onDrop={fileDrop}
            >
              <h2>Drag And Drop</h2>
              {backgroundPreview != null && (
                <img
                  src={backgroundPreview.src}
                  alt={backgroundPreview.name}
                  className="background-preview"
                />
              )}
              <input
                type="file"
                placeholder="Background"
                name="background"
                onChange={(e) => {
                  handleImageReader(e);
                }}
              />
            </div>
            {useValFields(errors, "file") && <p>This field must be filled</p>}
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
                      handleTrackChange(e, trackIndex);
                    }}
                  />
                  {useValFields(errors, "name", trackIndex) && (
                    <p>This field must be filled</p>
                  )}
                  <input
                    required
                    type="text"
                    placeholder="YouTube Link"
                    name="youtube_link"
                    autoComplete="off"
                    value={track.youtube_link}
                    onChange={(e) => {
                      handleTrackChange(e, trackIndex);
                    }}
                  />
                  {useValFields(errors, "yt_link", trackIndex) && (
                    <p>This field must be filled</p>
                  )}
                  {track.artists.map((artist, index) => {
                    return (
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
                          />
                          {useValMultiFields(
                            errors,
                            index,
                            "artist_name",
                            trackIndex
                          ) && <p>This field must be filled</p>}
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

                        {/* <div className="artist-actions"> */}
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
                    );
                  })}
                  {tracks.length > 1 && (
                    <button
                      className="remove-track"
                      onClick={(e) => {
                        removeTrack(trackIndex, e);
                      }}
                    >
                      {/* <IoIosClose size="1.2rem"></IoIosClose> */}
                      Remove Track
                    </button>
                  )}
                  {tracks.length - 1 === trackIndex && tracks.length <= 10 && (
                    <button
                      onClick={(e) => {
                        addInputField(trackIndex, e);
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
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}

export default AddBg;
