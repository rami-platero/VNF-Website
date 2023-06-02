import { useContext } from "react";
import "./backgroundsSection.css";
import { themecontext } from "../../../context/themeContext";

const BackgroundsSection = () => {
    const {theme} = useContext(themecontext)
  return (
    <div className={`backgrounds-section ${theme}`}>
      <div className="row-1"></div>
      <div className="row-2">
        <h1>Backgrounds</h1>
        <p>
          Discover every deleted song that was released and promoted by NCS and
          played a big part for the growth of the label
        </p>
        <button>Visit</button>
      </div>
    </div>
  );
};

export default BackgroundsSection;
