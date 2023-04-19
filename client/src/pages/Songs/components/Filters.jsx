import React, { useContext, useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import "./filters.css";
import { mainContext } from "../../../context/SongsContext";
import { memo } from "react";
import { RxDropdownMenu, RxSize } from "react-icons/rx";

const Filters = () => {
  const { delSongs, theme,setItems, query, setQuery, filter, setFilter } = useContext(mainContext);
  /* const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("newest"); */

  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSort = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    switch (filter) {
      case "views-asc":
        setItems(
          delSongs
            .map((el) => {
              return el;
            })
            .sort((a, b) => {
              return b.views - a.views;
            })
            .filter((song) => {
              return song.name.toLowerCase().includes(query.toLowerCase())
            })
        );
        break;
      case "views-desc":
        setItems(
          delSongs
            .map((el) => {
              return el;
            })
            .sort((a, b) => {
              return a.views - b.views;
            })
            .filter((song) => {
              return song.name.toLowerCase().includes(query.toLowerCase());
            })
        );
        break;
      case "oldest":
        setItems(
          delSongs
            .map((el) => {
              return el;
            })
            .sort((a, b) => {
              return new Date(a.upload_date) - new Date(b.upload_date);
            })
            .filter((song) => {
              return song.name.toLowerCase().includes(query.toLowerCase());
            })
        );
        break;
      case "newest":
        setItems(
          delSongs
            .map((el) => {
              return el;
            })
            .sort((a, b) => {
              return new Date(b.upload_date) - new Date(a.upload_date);
            })
            .filter((song) => {
              return song.name.toLowerCase().includes(query.toLowerCase());
            })
        );
        break;
      default:
        break;
    }
  }, [query, filter]);

  return (
    <div className="filters-wrapper">
      <div className={`input-search ${theme}`}>
        <IoSearchOutline style={{ marginLeft: ".5rem" }} />
        <input type="text" placeholder="Search..." onChange={handleChange} />
      </div>
      <div className="filter-by">
        <label htmlFor="filters">Filter by</label>
        <div className={`filter-container ${theme}`}>
          <select name="filters" onChange={handleSort}>
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

export default Filters;
