import { useContext, useEffect, useState, useMemo } from "react";
import { mainContext } from "../context/SongsContext.jsx";
import Song from "../components/Song.jsx";
import "./songs.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { IoLogoYoutube } from "react-icons/io5";
import Filters from "./Songs/components/Filters.jsx";

const Songs = () => {
  const { theme, delSongs } = useContext(mainContext);
  //SORT
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const itemsFiltered = useMemo(() => {
    return delSongs?.filter((song) => {
      return (
        song?.name?.toLowerCase().includes(query.toLowerCase()) ||
        song?.artists?.some((artist) => {
          return artist?.name?.toLowerCase().includes(query.toLowerCase());
        })
      );
    });
  }, [query, delSongs]);

  return (
    <div className={`songs-container ${theme}`}>
      <div className="featured-song-container">
        <div className="featured-song">
          <img
            src={
              "https://res.cloudinary.com/dikp1fayh/image/upload/v1681423383/artworks/bj47nqc9mxhdt7nmpfaf.jpg"
            }
          />
          <div className="info">
            <p>Featured Deleted Release</p>
            <div className="data">
              <h3>Milton Keynes VIP</h3>
              <h5>Jarvis</h5>
            </div>
            <div className="link-btn">
              <a
                href="https://www.youtube.com/watch?v=fmHoZs9-BLk"
                target="_blank"
              >
                <IoLogoYoutube size={"1rem"} /> Watch on YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="main-content-songs" style={{ padding: "2.5rem" }}>
        <Filters setQuery={setQuery}/>
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
          {itemsFiltered?.map((song) => {
            return <Song key={song._id} song={song} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Songs;
