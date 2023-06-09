import React, { useContext } from "react";
import { IoSearchOutline } from "react-icons/io5";
import "./filters.css";
import { mainContext } from "../../../context/SongsContext";
import { memo } from "react";
import { RxDropdownMenu} from "react-icons/rx";
import { themecontext } from "../../../context/themeContext";

const Filters = ({ setQuery }) => {
  const { delSongs, setDelSongs } = useContext(mainContext);
  const { theme } = useContext(themecontext);
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSort = (e) => {
    const songs = delSongs.map((el) => {
      return el;
    });
    switch (e.target.value) {
      case "views-asc":
        setDelSongs(
          songs.sort((a, b) => {
            return b?.views - a?.views;
          })
        );
        break;
      case "views-desc":
        setDelSongs(
          songs.sort((a, b) => {
              return a?.views - b?.views;
            })
        );
        break;
      case "oldest":
        setDelSongs(
          songs.sort((a, b) => {
              return new Date(a?.upload_date) - new Date(b?.upload_date);
            })
        );
        break;
      case "newest":
        setDelSongs(
          songs.sort((a, b) => {
              return new Date(b?.upload_date) - new Date(a?.upload_date);
            })
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className="filters-wrapper">
      <div className={`input-search ${theme}`}>
        <IoSearchOutline style={{ marginLeft: ".5rem" }} />
        <input type="search" placeholder="Search..." onChange={handleChange} />
      </div>
      <div className="filter-by">
        <label htmlFor="filters">Filter by</label>
        <div className={`filter-container ${theme}`}>
          <select name="filters" onChange={handleSort}>
            <option hidden>Choose a filter...</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="views-asc">Most Popular</option>
            <option value="views-desc">Least Viewed</option>
          </select>
          <RxDropdownMenu
            style={{ zIndex: "0" }}
            size={"1.5rem"}
            className="select-icon"
          />
        </div>
      </div>
    </div>
  );
};

export default memo(Filters);
