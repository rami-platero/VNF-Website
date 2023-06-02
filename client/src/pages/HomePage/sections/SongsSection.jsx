import { useContext } from "react";
import "./songsSection.css";
import { themecontext } from "../../../context/themeContext";

const SongsSection = () => {
  const { theme } = useContext(themecontext);
  return (
    <div className={`songs-section ${theme}`}>
      <label htmlFor="">MEDIA</label>

      <div className="row-1">
        <h1>Deleted Songs</h1>
        <p>
          Discover every deleted song that was released and promoted by NCS and
          played a big part for the growth of the label
        </p>
        <button>Visit</button>
      </div>
      <div className="row-2"></div>
    </div>
  );
};

export default SongsSection;
