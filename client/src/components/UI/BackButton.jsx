import React from "react";
import { useNavigate } from "react-router-dom";
import './back_btn.css'
import { IoArrowBack } from "react-icons/io5";
import { mainContext } from "../../context/SongsContext";
import { useContext } from "react";

function BackButton() {
  const navigate = useNavigate()
  const {theme} = useContext(mainContext)
  return (
    <button
      className={`back-btn ${theme}`}
      onClick={() => {
        navigate(-1);
      }}
    >
      <IoArrowBack />
      Back
    </button>
  );
}

export default BackButton;
