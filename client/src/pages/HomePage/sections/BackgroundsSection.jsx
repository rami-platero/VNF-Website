import { useContext } from "react";
import "./backgroundsSection.css";
import { themecontext } from "../../../context/themeContext";
import BGImage from "../assets/61.png";
import { Link } from "react-router-dom";

const BackgroundsSection = () => {
  const { theme } = useContext(themecontext);
  return (
    <div className={`backgrounds-section ${theme}`}>
      <div className="wrapper">
        <label>MEDIA</label>
        <div className="col-2">
          <h2>Backgrounds</h2>
          <p>
            Here's where you will find all the backgrounds that NCS has used for
            their YouTube videos.
          </p>
          <Link to={"/backgrounds"}>See More</Link>
        </div>
        <div className="col-1">
          <div className="carousel">
            <img src={BGImage} />
            <img
              src={
                "https://res.cloudinary.com/dikp1fayh/image/upload/v1683241318/artworks/hprdpwrms1qvqgnmbacn.jpg"
              }
            />
            <img
              src={
                "https://res.cloudinary.com/dikp1fayh/image/upload/v1682369300/artworks/swxokbvurrihfytdqnvg.jpg"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundsSection;
