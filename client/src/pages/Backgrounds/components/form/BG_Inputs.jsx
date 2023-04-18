import { useContext, useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
import "./bg-inputs.css";
import { mainContext } from "../../../../context/SongsContext";
import { useBGForm } from "../../../../hooks/useBGForm";

function BG_Inputs() {
  const { theme } = useContext(mainContext);
  const {addInputField,
    addArtist,
    removeTrack,
    removeArtist,
    handleArtistChange,
    handleTrackChange,tracks} = useBGForm()

  return (
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
  );
}

export default BG_Inputs;
