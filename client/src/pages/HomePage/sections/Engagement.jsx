import "./engagement.css";
import {BsChatDots} from 'react-icons/bs'
import {BsArrowUpCircle} from 'react-icons/bs'
import {RiMusic2Line} from 'react-icons/ri'
import {FaDiscord} from 'react-icons/fa'
import { useContext } from "react";
import {themecontext} from '../../../context/themeContext.jsx'

const Engagement = () => {
  const {theme} = useContext(themecontext)
  return (
    <div className={`engagement ${theme}`}>
      <div className="header">
      <label htmlFor="">COMMUNITY</label>
      <h1>OUR DISCORD COMMUNITY</h1>
      </div>
      <div className="perks">
        <div className="row">
            <BsChatDots />
            <h3>Chat with fans/artists</h3>
            <p>Chat with other fans and NCS artists, share your favorite music with others, vote for your favorite songs, and more...</p>
        </div>
        <div className="row">
            <RiMusic2Line />
            <h3>Upcoming NCS Releases</h3>
            <p>Discover if your favorite artist is releasing a new song on NCS soon and listen to upcoming songs before the release date!</p>
          </div>
        <div className="row">
            <BsChatDots />
            <h3>Participate in events</h3>
            <p>Chat with other fans and NCS artists, share your music taste, participate in events and more...</p>
          </div>
      </div>
      <a href="https://discord.gg/AGCzqea" target="_blank"><FaDiscord/> Join Us</a>
    </div>
  );
};

export default Engagement;
