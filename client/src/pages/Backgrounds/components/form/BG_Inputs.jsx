import React, { useContext, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
import "./bg-inputs.css";
import { mainContext } from "../../../../context/SongsContext";

function BG_Inputs({ tracks, setTracks }) {
  const { theme } = useContext(mainContext);

  const addInputField = (index, e) => {
    e.preventDefault();
    //setArtists([...artists, [{ name: "" }]]);
    setTracks([
      ...tracks,
      {
        artists: [{ name: "" }],
        name: "",
        youtube_link: "",
      },
    ]);
  };

  const handleTrackChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...tracks];
    list[index][name] = value;
    setTracks(list);
  };

  const removeTrack = (index, e) => {
    e.preventDefault();
    setTracks(
      tracks.filter((track, idx) => {
        return idx !== index;
      })
    );
  };

  const addArtist = (trackIndex, e) => {
    e.preventDefault();
    setTracks(
      tracks.map((track, index) => {
        if (index === trackIndex) {
          return {
            ...track,
            artists: [...track.artists, { name: "" }] /* track.artists.reduce(
              (arr, el, index) => {
                arr.push(el);
                return arr;
              },
              [{...track},{ name: "" }]
            ), */,
          };
        } else {
          return track;
        }
      })
    );
  };

  const removeArtist = (trackIndex, index) => {
    setTracks(
      tracks.map((track, idx) => {
        if (idx === trackIndex) {
          return {
            ...track,
            artists: track.artists.filter((artist, indexAr) => {
              return indexAr !== index;
            }),
          };
        } else {
          return track;
        }
      })
    );
  };

  const handleArtistChange = (e, trackIndex, artistIndex) => {
    const { value } = e.target;
    setTracks(
      tracks.map((track, index) => {
        if (index === trackIndex) {
          return {
            ...track,
            artists: track.artists.map((artist, indexArt) => {
              if (indexArt === artistIndex) {
                return { name: value };
              } else {
                return artist;
              }
            }),
          };
        } else {
          return track;
        }
      })
    );
  };

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
