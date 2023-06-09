import { useContext } from "react";
import "./songsSection.css";
import { themecontext } from "../../../context/themeContext";
import { AiFillLock } from "react-icons/ai";
import { FaSoundcloud } from "react-icons/fa";
import { AiFillYoutube } from "react-icons/ai";
import {RiMusic2Fill} from 'react-icons/ri'
import {Link} from 'react-router-dom'
/* import Tracks from "../assets/deleted_songs.png"; */

const SongsSection = () => {
  const { theme } = useContext(themecontext);
  return (
    <div className={`songs-section ${theme}`}>
      <label htmlFor="">MUSIC</label>

      <div className="wrapper">
        <div className="row-1">
          <h1>Deleted Songs</h1>
          <p>
            Discover every deleted song that was released and promoted by NCS
            and played a big part for the growth of the label
          </p>
          <Link to={"/deleted-songs"}>See More</Link>
        </div>
        <div className="row-2">
          <div className="grid">
            <div className="type">
              <AiFillLock />
              <p>+60 Private Songs</p>
            </div>
            <div className="type">
              <FaSoundcloud />
              <p>+100 SoundCloud Songs</p>
            </div>
            <div className="type">
              <AiFillYoutube />
              <p>+500 YouTube Songs</p>
            </div>
            <div className="type">
              <RiMusic2Fill />
              <p>+100 Other Platforms</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongsSection;
