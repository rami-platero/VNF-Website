import React, { useContext } from "react";
import { themecontext } from "../../../context/themeContext";
import { IoSearchOutline } from "react-icons/io5";
import { memo } from "react";

const BGFilters = ({ setQuery }) => {
  const { theme } = useContext(themecontext);
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  return (
    <div className={`input-search ${theme}`}>
      <IoSearchOutline style={{ marginLeft: ".5rem" }} />
      <input type="search" placeholder="Search by song title, artist..." onChange={handleChange} />
    </div>
  );
};

export default memo(BGFilters);
