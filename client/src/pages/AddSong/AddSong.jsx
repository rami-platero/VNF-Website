import { useContext } from "react";
import { useState, useRef } from "react";

import Logo from "../../assets/ncs-logo-resized.png";
import { mainContext } from "../../context/SongsContext";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./addsong.css";
import "./newsong.css";
import BackButton from "../../components/UI/BackButton.jsx";
import useDynamicFields from "../../hooks/useDynamicFields";
import { bgcontext } from "../../context/bgsContext";

//ICONS

import { IoIosClose } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
import { useDropFile } from "../../hooks/useDrop";
import { themecontext } from "../../context/themeContext";
import { BiDownArrowAlt } from "react-icons/bi";

const initialForm = {
  name: "",
  upload_date: "",
  status: "",
  genre: "",
  duration: "",
  link: "",
  original_link: "",
  original_description: "",
  views: 0,
  views_date: "",
};

function AddSong() {
  const { postSong } = useContext(mainContext);
  const { theme } = useContext(themecontext);
  const navigate = useNavigate();
  const [artists, setArtists] = useState([{ name: "" }]);
  const [form, setForm] = useState(initialForm);
  const [background, setBackground] = useState(null);
  const [backgroundPreview, setBackgroundPreview] = useState(null);
  const { file, filePreview, handleFile, dragEnter, dragLeave, dragOver } =
    useDropFile();
  const { data } = useContext(bgcontext);
  const [selectBG, setSelectBG] = useState("default");
  const dropRef = useRef(null);

  const { handleDynamicChange, removeDynamicField, addDynamicField } =
    useDynamicFields(artists, setArtists, { name: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const { user } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    postSong(
      {
        background,
        ...form,
        artists: [...artists],
        artwork: file,
      },
      user
    );
    navigate("/deleted-songs");
  };

  // ARTOWKR DRAG N DROP
  const handleBackground = (e, data) => {
    e.preventDefault();
    let file;
    if (data == "drop") {
      file = e.dataTransfer.files[0];
      setBackground(e.dataTransfer.files[0]);
    } else {
      file = e.target.files[0];
      setBackground(e.target.files[0]);
    }
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
      <BackButton />
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
                  handleDynamicChange(e, index);
                }}
                autoComplete="off"
                required
              />
              {artists.length - 1 === index && artists.length <= 10 && (
                <button onClick={addDynamicField} className="add-artist">
                  <IoIosAdd size="1.2rem" /> Add artist
                </button>
              )}
              {artists.length > 1 && (
                <IoIosClose
                  size="1.2rem"
                  className="remove"
                  onClick={() => {
                    removeDynamicField(index);
                  }}
                ></IoIosClose>
              )}
            </div>
          );
        })}
        <input
          type="date"
          placeholder="Upload Date"
          name="upload_date"
          onChange={handleChange}
          required
          autoComplete="off"
        />
        <label htmlFor="status" style={{ alignSelf: "center" }}>
          Status
        </label>
        <div className={`radio-inputs ${theme}`}>
          <div className="radio-input-wrapper">
            <input
              type="radio"
              name="status"
              autocomplete="off"
              value="Deleted"
              onChange={handleChange}
              required
            />
            <label htmlFor="status">Deleted</label>
          </div>
          <div className="radio-input-wrapper">
            <input
              type="radio"
              name="status"
              autocomplete="off"
              value="Private"
              onChange={handleChange}
              required
            />
            <label htmlFor="status">Private</label>
          </div>
        </div>
        <input
          type="text"
          placeholder="YouTube Link (Re-Upload)"
          name="link"
          onChange={handleChange}
          autoComplete="off"
          required
        />
        <input
          type="time"
          placeholder="Duration"
          name="duration"
          onChange={handleChange}
          autoComplete="off"
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
          onDrop={(e) => {
            handleFile(e, "drop");
          }}
        >
          <h2>Drag And Drop</h2>
          {filePreview != null && (
            <img
              src={filePreview.src}
              alt={filePreview.name}
              className="artwork-preview"
            />
          )}
          <input
            type="file"
            placeholder="Artwork"
            name="artwork"
            onChange={(e) => {
              handleFile(e, "input");
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
        />
        <textarea
          spellcheck="false"
          type="text"
          placeholder="Description"
          name="original_description"
          className={`description-input ${theme}`}
          onChange={handleChange}
          autoComplete="off"
        />
        <div className="views-inputs">
          <input
            type="number"
            placeholder="Views"
            name="views"
            onChange={handleChange}
            autoComplete="off"
          />
          <input
            type="date"
            placeholder="As of Date (Views)"
            onChange={handleChange}
            name="views_date"
            autoComplete="off"
          />
        </div>
        <label htmlFor="background">Background</label>
        <div className={`select-background ${theme}`}>
          <div
            className="select-bg-wrapper"
            onClick={() => {
              dropRef.current.scrollIntoView();
            }}
          >
            <input
              type="radio"
              name="bg"
              value="new-bg"
              onChange={() => {
                setSelectBG("existing");
              }}
            />
            <label htmlFor="bg">Use an existing background</label>
            <BiDownArrowAlt size={"1rem"} className="select-bg-icon" />
          </div>
          <div className={`existing-bgs-selector ${selectBG} ${theme}`}>
            {data?.map((bg) => {
              return (
                <div className="bg-select-item">
                  <input
                    type="radio"
                    name="bg"
                    value={bg}
                    onChange={()=>{
                      console.log("changed to",bg)
                    }}
                  />
                  <img src={bg?.file?.url} />
                  <div className="background-checked"></div>
                </div>
              );
            })}
          </div>
          <div
            className="select-bg-wrapper"
            onClick={() => {
              dropRef.current.scrollIntoView();
            }}
          >
            <input
              type="radio"
              name="bg"
              value="existing"
              onChange={() => {
                setSelectBG("new-bg");
              }}
            />
            <label htmlFor="bg">Upload a new background</label>
            <BiDownArrowAlt size={"1rem"} className="select-bg-icon" />
          </div>
          <div
            className={`drop-container-background height ${theme} ${selectBG}`}
            onDragEnter={dragEnter}
            onDragOver={dragOver}
            onDragLeave={dragLeave}
            onDrop={(e) => {
              handleBackground(e, "drop");
            }}
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
                handleBackground(e, "input");
              }}
            />
          </div>
        </div>
        <input type="submit" value="Submit" ref={dropRef} />
      </form>
    </div>
  );
}

export default AddSong;
