import React, { useEffect } from "react";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useContext } from "react";
import { bgcontext } from "../context/bgsContext";
import { useNavigate } from "react-router-dom";

export const useBGForm = () => {
  const { user } = useAuthContext();
  const { postBg } = useContext(bgcontext);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [backgroundPreview, setBackgroundPreview] = useState(null);
  const [tracks, setTracks] = useState([
    {
      artists: [{ name: "" }],
      name: "",
      youtube_link: "",
    },
  ]);

  const dragOver = (e) => {
    e.preventDefault();
  };
  const dragEnter = (e) => {
    e.preventDefault();
  };
  const dragLeave = (e) => {
    e.preventDefault();
  };
  const fileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFile(e.dataTransfer.files[0]);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      let fileobj = {
        name: file.name,
        type: file.type,
        size: file.size,
        src: reader.result,
      };
      setBackgroundPreview(fileobj);
    });
  };

  const handleImageReader = (e) => {
    const file = e.target.files[0];
    setFile(e.target.files[0]);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      let fileobj = {
        name: file.name,
        type: file.type,
        size: file.size,
        src: reader.result,
      };
      setBackgroundPreview(fileobj);
    });
  };

  /*HANDLE TRACKS*/
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
    console.log("changing artist");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.roles_name.includes("admin")) {
      postBg({ tracks: [...tracks], file }, user);
    } else {
      console.log("You are not authorized");
    }
    navigate("/backgrounds");
  };

  return {
    dragOver,
    dragEnter,
    dragLeave,
    fileDrop,
    handleImageReader,
    backgroundPreview,
    handleSubmit,
    addInputField,
    addArtist,
    removeTrack,
    removeArtist,
    handleArtistChange,
    handleTrackChange,
    tracks,
  };
};
