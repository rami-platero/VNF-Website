import React from "react";
import { useNavigate } from "react-router-dom";
import "./back_btn.css";
import { IoArrowBack } from "react-icons/io5";
import { useContext } from "react";
import { themecontext } from "../context/themeContext";

function BackButton() {
  const navigate = useNavigate();
  const { theme } = useContext(themecontext);
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
