import React, { useEffect } from "react";
import { useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useContext } from "react";
import { bgcontext } from "../../../context/bgsContext";
import { useNavigate } from "react-router-dom";
import { formToJSON } from "axios";

export const BGForm = () => {
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
  const [errors, setErrors] = useState([]);
  const [progress, setProgress] = useState(0)


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
            artists: [...track.artists, { name: "" }],
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

  const validateForm = () => {
    let errors = [];

    tracks.forEach((track, index) => {
      if (!track.name.trim()) {
        errors.push({ index, type: "name" });
      }
    });

    tracks.forEach((track, index) => {
      if (!track.youtube_link.trim()) {
        errors.push({ index, type: "yt_link" });
      }
    });

    tracks.forEach((track,mainIndex) => {
      track.artists.forEach((artist, index) => {
        if (!artist.name.trim()) {
          errors.push({ mainIndex, index, type: "artist_name" });
        }
      });
    });

    if(!file){
      errors.push({type: "file"})
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm().length) {
      setErrors(validateForm());
    } else {
      if (user.roles_name.includes("admin")) {
        postBg({ tracks: [...tracks], file }, user);
      } else {
        console.log("You are not authorized");
      }
      navigate("/backgrounds");
    }
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
    errors
  };
};
