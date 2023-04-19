import React from "react";
import { useNavigate } from "react-router-dom";
import './back_btn.css'
import { IoArrowBack } from "react-icons/io5";

function BackButton() {
  const navigate = useNavigate()
  return (
    <button
      className={`back-btn`}
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
