import React, { useEffect, useMemo } from "react";
import "./backgrounds.css";
import { useContext } from "react";
import { bgcontext } from "../../context/bgsContext.jsx";
import { memo } from "react";
import BGItem from "./components/BGItem";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { themecontext } from "../../context/themeContext";
import { BiLandscape } from "react-icons/bi";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/Pagination";
import BGFilters from "./components/BGFilters";
import { useState } from "react";

function Backgrounds() {
  const { data } = useContext(bgcontext);
  const { theme } = useContext(themecontext);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { itemsPerPage, handlePage, currentItems, currentPage } =
    usePagination(data);
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    return data.filter((bg) => {
      return (
        bg?.tracks?.some((track) => {
          return (
            track?.name?.toLowerCase().includes(query.toLowerCase()) ||
            track?.artists?.some((artist) => {
              return artist?.name?.toLowerCase().includes(query.toLowerCase());
            })
          );
        }) || bg.loading
      );
    });
  }, [data, query]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className={`backgrounds-container`}>
      <BGFilters setQuery={setQuery} />
      {user != null && user?.roles_name?.includes("admin") && (
        <button
          onClick={() => {
            navigate("/add-background");
          }}
          className={`add-bg ${theme}`}
        >
          Add New
        </button>
      )}

      <div className="backgrounds-title">
        <BiLandscape
          size={"1.3rem"}
          style={{ border: "2px solid", borderRadius: "5px" }}
        />{" "}
        <h4>Backgrounds</h4>
      </div>

      <div className="bg-grid">
        {filteredItems?.length !== 0 &&
          filteredItems?.map((bg) => {
            return <BGItem key={bg?.customID} bg={bg} />;
          })}
      </div>
      {currentItems.length > itemsPerPage && (
        <Pagination
          totalPosts={itemsFiltered.length}
          handlePage={handlePage}
          currentPage={currentPage}
        />
      )}
    </div>
  );
}

export default memo(Backgrounds);
