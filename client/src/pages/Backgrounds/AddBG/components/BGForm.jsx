import { useState } from "react";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { useContext } from "react";
import { bgcontext } from "../../../../context/bgsContext";
import { useNavigate } from "react-router-dom";
import { useDropFile } from "../../../../hooks/useDrop";

export const BGForm = () => {
  const initialForm = [
    {
      artists: [{ name: "" }],
      name: "",
      youtube_link: "",
    },
  ];
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { postBg } = useContext(bgcontext);
  const [tracks, setTracks] = useState(initialForm);
  const [errors, setErrors] = useState([]);
  const { file, filePreview, dragOver, dragEnter, dragLeave, handleFile } =
    useDropFile();

  const validateForm = () => {
    let errors = [];

    tracks.forEach((track, mainIndex) => {
      if (!track.name.trim()) {
        errors.push({ mainIndex, type: "name" });
      }
    });

    tracks.forEach((track, mainIndex) => {
      if (!track.youtube_link.trim()) {
        errors.push({ mainIndex, type: "yt_link" });
      }
    });

    tracks.forEach((track, mainIndex) => {
      track.artists.forEach((artist, index) => {
        if (!artist.name.trim()) {
          errors.push({ mainIndex, index, type: "artist_name" });
        }
      });
    });

    if (!file) {
      errors.push({ type: "file" });
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

  /*HANDLE TRACKS*/

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

  return {
    dragOver,
    dragEnter,
    dragLeave,
    handleFile,
    filePreview,
    handleSubmit,
    addArtist,
    removeArtist,
    handleArtistChange,
    tracks,
    errors,
    setTracks,
    initialForm,
  };
};
