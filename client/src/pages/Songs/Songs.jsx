import { useContext, useState, useMemo, useEffect } from "react";
import { mainContext } from "../../context/SongsContext.jsx";
import Song from "./components/Song.jsx";
import "./songs.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext.jsx";
import { IoLogoYoutube } from "react-icons/io5";
import { themecontext } from "../../context/themeContext.jsx";
import Filters from "./components/Filters.jsx";
import { AiOutlineYoutube } from "react-icons/ai";
import EditSong from "./EditSong/EditSong.jsx";
import Pagination from "../../components/Pagination.jsx";
import usePagination from "../../hooks/usePagination.jsx";

const Songs = () => {
  const { delSongs } = useContext(mainContext);
  const { theme } = useContext(themecontext);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  const {
    setCurrentPage,
    handlePage,
    currentItems,
    currentPage,
    itemsPerPage,
  } = usePagination(itemsFiltered);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, delSongs]);

  return (
    <div className={`songs-container`}>
      {modalIsOpen ? (
        <EditSong setModalIsOpen={setModalIsOpen} />
      ) : (
        <>
          <div className="featured-song-container">
            <div className="featured-song-wrapper">
              <div className="featured-song">
                <img
                  src={
                    "https://i1.sndcdn.com/artworks-000085438916-dd1u8z-t500x500.jpg"
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
          </div>
          <main>
            <Filters setQuery={setQuery} />
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
            <div className="songs-title">
              <AiOutlineYoutube size={"1.5rem"} />
              <h4>Deleted Songs</h4>
            </div>
            <div className="songs-wrapper">
              {currentItems?.map((song) => {
                return (
                  <Song
                    key={song._id}
                    song={song}
                    setModalIsOpen={setModalIsOpen}
                  />
                );
              })}
            </div>
            {currentItems.length > itemsPerPage && (
              <Pagination
                totalPosts={itemsFiltered.length}
                handlePage={handlePage}
                currentPage={currentPage}
              />
            )}
          </main>
        </>
      )}
    </div>
  );
};

export default Songs;
