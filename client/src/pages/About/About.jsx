import { useContext } from "react";
import "./about.css";
import { themecontext } from "../../context/themeContext";
import AboutImage from "../../assets/ncs-image-1.jfif";

const About = () => {
  const { theme } = useContext(themecontext);
  return (
    <div className={`about-us ${theme}`}>
      <label>WHO WE ARE</label>
      <h1>A community made by fans for NCS Fans</h1>
      <div className="description-wrapper">
        <p>
          VIP NCS Fans is a community that shares facts about the record label
          NoCopyrightSounds that only some of the OG fans have known over the
          years.
        </p>
        <p>
          The idea of this website is to share the collection that the fans have
          been compiling over the years, containing some of the greatest secrets
          and fun facts about the record label.
        </p>
        <p>
          With the purpose to show the fans who have just discover NCS, all the
          media that has been recovered so far, such as:
        </p>
        <ul>
          <li>
            <strong>Backgrounds</strong>: Every image/video used for each video
            on the NCS YouTube channel.
          </li>
          <li>
            <strong>Deleted Songs</strong>: Songs/releases from every platform
            (Spotify, YouTube, SoundCloud, etc...)
          </li>
          <li>
            <strong>Artists</strong>: Covering every producer that were part of
            the songs that are deleted now.
          </li>
        </ul>
        <p>
          The idea is to make this website bigger and bigger so it becomes a way
          for fans to interect with other fans through the media.
        </p>
      </div>
      <img src={AboutImage} alt="" />

      {/* <h2>Our history</h2>
      <p>
        VIP NCS Fans started as a discord community back in 2017, it was created
        by fans
      </p> */}
    </div>
  );
};

export default About;
