import React, { useContext, useState } from "react";
import "./add-bg.css";
import Logo from "../../../assets/ncs-logo-resized.png";
import { mainContext } from "../../../context/SongsContext";
import DropBG from "./form/DropBG";
import BG_Inputs from "./form/BG_Inputs";
import { AuthContext } from "../../../context/authContext";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { bgcontext } from "../../../context/bgsContext";
import { useNavigate } from "react-router-dom";

function AddBg() {
  const { theme } = useContext(mainContext);
  const { user } = useAuthContext();
  const { postBg } = useContext(bgcontext);
  const [file, setFile] = useState(null);
  const [backgroundPreview, setBackgroundPreview] = useState(null);
  const [tracks, setTracks] = useState([
    {
      artists: [{ name: "" }],
      name: "",
      youtube_link: "",
    },
  ]);
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (user.roles_name.includes("admin")) {
      postBg({tracks: [...tracks],file},user)
    } else {
      console.log("You are not authorized")
    }
    navigate("/backgrounds")
  };
  return (
    <div className={`form-bg-container ${theme}`}>
      <img src={Logo} className={`modal-logo ${theme}`} />
      <h1>Add Background</h1>
      <div className={`form-bg-container-wrapper ${theme}`}>
        <form onSubmit={handleSubmit}>
          <DropBG
            file={file}
            setFile={setFile}
            backgroundPreview={backgroundPreview}
            setBackgroundPreview={setBackgroundPreview}
          />
          <BG_Inputs tracks={tracks} setTracks={setTracks} />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}

export default AddBg;
