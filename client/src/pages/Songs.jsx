import { useContext, useEffect, useState } from "react";
import { mainContext } from "../context/SongsContext.jsx";
import Song from "../components/Song.jsx";
import "./songs.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { IoLogoYoutube } from "react-icons/io5";
import Filters from "./Songs/components/Filters.jsx";

const Songs = () => {
  const { theme, getSongsFilter, items, setItems, delSongs } = useContext(mainContext);
  //SORT
  const { user } = useAuthContext();
  const navigate = useNavigate();
 
  const setitemsFunction = async () => {
    const res = await getSongsFilter();
    setItems(res.data.sort((a, b) => {
      return new Date(b.upload_date) - new Date(a.upload_date);
    }));
  };

  useEffect(() => {
    setitemsFunction();
  }, []);

  return (
    <div className={`songs-container ${theme}`}>
      <div className="featured-song-container">
        <div className="featured-song">
          <img src={"https://res.cloudinary.com/dikp1fayh/image/upload/v1681423383/artworks/bj47nqc9mxhdt7nmpfaf.jpg"} />
          <div className="info">
            <p>Featured Deleted Release</p>
            <div className="data">
              <h3>Milton Keynes VIP</h3>
              <h5>Jarvis</h5>
            </div>
            <div className="link-btn">
              <a href="https://www.youtube.com/watch?v=fmHoZs9-BLk" target="_blank">
                <IoLogoYoutube size={"1rem"} /> Watch on YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="main-content-songs" style={{ padding: "2.5rem" }}>
        <Filters setItems={setItems} delSongs={delSongs} />
        {user?.roles_name?.includes("admin") && (
          <button
            className={`add-new ${theme}`}
            onClick={() => {
              navigate("/add-deleted-song");
            }}
          >
            Add New
          </button>
        )}
        <div className="songs-wrapper">
          {items.map((song) => {
            return <Song key={song._id} song={song} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Songs;
