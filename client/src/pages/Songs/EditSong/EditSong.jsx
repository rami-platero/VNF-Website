import { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
import { mainContext } from "../../../context/SongsContext";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { themecontext } from "../../../context/themeContext";
import "../../AddSong/addsong.css";
import "./edit-song.css";
import useDynamicFields from "../../../hooks/useDynamicFields";
import Loader from "../../../components/Loader";

function EditSong({ setModalIsOpen }) {
  const { editSong, getSingleSong, idEdit, loading } = useContext(mainContext);
  const { theme } = useContext(themecontext);
  const [song, setSong] = useState(null);
  const [artists, setArtists] = useState(null);
  const [form, setForm] = useState(null);
  const getSong = async () => {
    const res = await getSingleSong(idEdit);
    setSong(res);
    setArtists(res?.artists);
    setForm({
      name: res?.name,
      upload_date: res?.upload_date,
      status: res?.status,
      genre: res?.genre,
      duration: res?.duration,
      link: res?.link,
      original_link: res?.original_link,
      original_description: res?.original_description,
      views: res?.views,
      views_date: res?.views_date,
    });
  };

  useEffect(() => {
    getSong();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const { handleDynamicChange, removeDynamicField, addDynamicField } =
    useDynamicFields(artists, setArtists, { name: "" });
  const ref = useRef();
  const { user } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    editSong(
      song?._id,
      {
        ...form,
        artists: [...artists],
      },
      user
    );
    setModalIsOpen(false);
  };

  return (
    <div className={`form-container modal ${theme}`}>
      {loading && <Loader/>}
      <IoIosClose
        size="3rem"
        className="close"
        onClick={() => {
          setModalIsOpen(false);
        }}
      />
      <h1 className="title">Edit Song</h1>
      <form onSubmit={handleSubmit}>
        <input
          defaultValue={song?.name}
          type="text"
          placeholder="Song name"
          name="name"
          onChange={handleChange}
          autoComplete="off"
          required
          autoFocus
        />
        {artists?.map((artist, index) => {
          return (
            <div key={index} className={`artists-inputs ${theme}`}>
              <input
                name="name"
                type="text"
                placeholder="Artist Name"
                className="artist-field"
                defaultValue={artist?.name}
                onChange={(e) => {
                  handleDynamicChange(e, index);
                }}
                autoComplete="off"
                required
              />
              {artists?.length - 1 === index && artists?.length <= 10 && (
                <button onClick={addDynamicField} className="add-artist">
                  <IoIosAdd size="1.2rem" /> Add artist
                </button>
              )}
              {artists?.length > 1 && (
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
          defaultValue={song?.upload_date}
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
          defaultValue={song?.status}
          type="text"
          placeholder="Status"
          name="status"
          onChange={handleChange}
          autoComplete="off"
          required
        />
        <input
          defaultValue={song?.link}
          type="text"
          placeholder="YouTube Link (Re-Upload)"
          name="link"
          onChange={handleChange}
          autoComplete="off"
          required
        />
        <input
          defaultValue={song?.duration}
          type="time"
          placeholder="Duration"
          name="duration"
          onChange={handleChange}
          autoComplete="off"
          required
        />
        <input
          defaultValue={song?.genre}
          type="text"
          placeholder="Main Genre"
          name="genre"
          onChange={handleChange}
          autoComplete="off"
          required
        />
        <h5>Original Info</h5>
        <input
          defaultValue={song?.original_link}
          type="text"
          placeholder="YouTube Link"
          name="original_link"
          onChange={handleChange}
          autoComplete="off"
        />
        <textarea
          defaultValue={song?.original_description}
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
            defaultValue={song?.views}
            type="number"
            placeholder="Views"
            name="views"
            onChange={handleChange}
            autoComplete="off"
          />
          <input
            defaultValue={song?.views_date}
            type="text"
            placeholder="As of Date (Views)"
            onChange={handleChange}
            name="views_date"
            autoComplete="off"
          />
        </div>
        {/* <label htmlFor="background">Background</label>
        <div
          className={`drop-container-background ${theme}`}
          onDragOver={dragOver}
          onDragEnter={dragEnter}
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
        </div> */}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default EditSong;
