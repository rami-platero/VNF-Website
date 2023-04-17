import { useContext, useRef } from "react";
import { useState } from "react";

import Logo from "../assets/ncs-logo-resized.png";
import { mainContext } from "../context/SongsContext";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import "./addsong.css";
import "./newsong.css";

//ICONS

import { IoArrowBack } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
import { IoIosRemove } from "react-icons/io";


function AddSong() {
  const { postSong, theme } = useContext(mainContext);
  const navigate = useNavigate();
  const [artists, setArtists] = useState([{ name: "" }]);
  const [form, setForm] = useState({
    name: "",
    upload_date: "",
    status: "",
    genre: "",
    duration: "",
    link: "",
    original_link: "",
    original_description: "",
    views: "",
    views_date: "",
  });
  const [artwork, setArtwork] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleArtistChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...artists];
    list[index][name] = value;
    setArtists(list);
  };

  const removeField = (index) => {
    setArtists(
      artists.filter((artist, idx) => {
        return idx !== index;
      })
    );
  };

  const addInputField = () => {
    setArtists([...artists, { name: "" }]);
  };

  const ref = useRef();
  const { user } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      ...form,
      artists: { ...artists },
      artwork,
      background: background,
    });
    postSong(
      {
        ...form,
        artists: [...artists],
        artwork: artwork,
        background: background,
      },
      user
    );
    navigate("/deleted-songs");
  };

  // ARTOWKR DRAG N DROP
  const [artworkPreview, setArtworkPreview] = useState(null);
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
    setArtwork(e.dataTransfer.files[0]);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      let fileobj = {
        name: file.name,
        type: file.type,
        size: file.size,
        src: reader.result,
      };
      setArtworkPreview(fileobj);
    });
  };

  const handleImageReader = (e) => {
    const file = e.target.files[0];
    setArtwork(e.target.files[0]);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      let fileobj = {
        name: file.name,
        type: file.type,
        size: file.size,
        src: reader.result,
      };
      setArtworkPreview(fileobj);
    });
  };

  //BACKGROUND DRAG AND DROP
  const [background, setBackground] = useState(null);
  const [backgroundPreview, setBackgroundPreview] = useState(null);

  const backgroundDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setBackground(e.dataTransfer.files[0]);
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

  const handleBackgroundReader = (e) => {
    const file = e.target.files[0];
    setBackground(e.target.files[0]);
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

  return (
    <div className={`form-container ${theme}`}>
      <button
        className={`back-btn ${theme}`}
        onClick={() => {
          navigate(-1);
        }}
      >
        <IoArrowBack />
        Back
      </button>
      <img src={Logo} className={`modal-logo ${theme}`} />
      <h1 className="title">Add a new song</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Song name"
          name="name"
          onChange={handleChange}
          autoComplete="off"
          required
          autoFocus
        />
        {artists.map((artist, index) => {
          return (
            <div key={index} className={`artists-inputs ${theme}`}>
              <input
                name="name"
                type="text"
                placeholder="Artist Name"
                className="artist-field"
                value={artist.name}
                onChange={(e) => {
                  handleArtistChange(e, index);
                }}
                autoComplete="off"
                required
              />
              {artists.length - 1 === index && artists.length <= 10 && (
                <button onClick={addInputField} className="add-artist">
                  <IoIosAdd size="1.2rem" /> Add artist
                </button>
              )}
              {artists.length > 1 && (
                <IoIosClose
                  size="1.2rem"
                  className="remove"
                  onClick={() => {
                    removeField(index);
                  }}
                ></IoIosClose>
              )}
              {/* <IoIosAdd
                className="add-more"
                onClick={(e) => {
                  addInputField();
                }}
              />
              <IoIosRemove className="remove"/> */}
            </div>
          );
        })}
        {/* <label htmlFor="upload_date">Upload Date</label> */}
        <input
          type="text"
          placeholder="Upload Date"
          name="upload_date"
          onChange={handleChange}
          required
          autoComplete="off"
          ref={ref}
          onFocus={() => {
            ref.current.type = "date";
          }}
          onBlur={() => (ref.current.type = "date")}
        />
        <input
          type="text"
          placeholder="Status"
          name="status"
          onChange={handleChange}
          autoComplete="off"
          required
        />
        <input
          type="text"
          placeholder="YouTube Link (Re-Upload)"
          name="link"
          onChange={handleChange}
          autoComplete="off"
          required
        />
        {/* <label htmlFor="duration">Duration</label> */}
        <input
          type="text"
          placeholder="Duration"
          name="duration"
          onChange={handleChange}
          autoComplete="off"
          required
          /* ref={refTime}
          onFocus={() => {
            ref.current.type = "time";
          }}
          onBlur={() => (ref.current.type = "time")} */
        />
        <input
          type="text"
          placeholder="Main Genre"
          name="genre"
          onChange={handleChange}
          autoComplete="off"
          required
        />
        <label htmlFor="artwork" style={{ alignSelf: "center" }}>
          Artwork
        </label>
        <div
          className={`drop-container ${theme}`}
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={fileDrop}
        >
          <h2>Drag And Drop</h2>
          {artworkPreview != null && (
            <img
              src={artworkPreview.src}
              alt={artworkPreview.name}
              className="artwork-preview"
            />
          )}
          <input
            type="file"
            placeholder="Artwork"
            name="artwork"
            onChange={(e) => {
              handleImageReader(e);
              setArtwork(e.target.files[0]);
            }}
          />
        </div>
        <h5>Original Info</h5>
        <input
          type="text"
          placeholder="YouTube Link"
          name="original_link"
          onChange={handleChange}
          autoComplete="off"
          required
        />
        <textarea
          spellcheck="false"
          type="text"
          placeholder="Description"
          name="original_description"
          className={`description-input ${theme}`}
          onChange={handleChange}
          autoComplete="off"
          required
        />
        <div className="views-inputs">
          <input
            type="number"
            placeholder="Views"
            name="views"
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <input
            type="text"
            placeholder="As of Date (Views)"
            onChange={handleChange}
            name="views_date"
            autoComplete="off"
            required
          />
        </div>
        <label htmlFor="background">Background</label>
        <div
          className={`drop-container-background ${theme}`}
          onDragEnter={dragEnter}
          onDragOver={dragOver}
          onDragLeave={dragLeave}
          onDrop={backgroundDrop}
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
              handleBackgroundReader(e);
            }}
          />
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default AddSong;
