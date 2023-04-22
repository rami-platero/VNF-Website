import React from "react";
import "./backgrounds.css";
import { useContext } from "react";
import { bgcontext } from "../../context/bgsContext.jsx";
import { memo } from "react";
import BGItem from "./components/BGItem";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import BackButton from '../../components/UI/BackButton'
import { themecontext } from "../../context/themeContext";

function Backgrounds() {
  const { data } = useContext(bgcontext);
  const { theme } = useContext(themecontext);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  return (
    <div className={`backgrounds-container ${theme}`}>
      <BackButton />
      {user!=null && user?.roles_name?.includes("admin") && (
        <button
          onClick={() => {
            navigate("/add-background");
          }}
          className={`add-bg ${theme}`}
        >
          Add New
        </button>
      )}

      <div className="bg-grid">
        {data?.length !== 0 &&
          data?.map((bg) => {
            return <BGItem key={bg?.customID} bg={bg} />;
          })}
      </div>
    </div>
  );
}

export default memo(Backgrounds);
