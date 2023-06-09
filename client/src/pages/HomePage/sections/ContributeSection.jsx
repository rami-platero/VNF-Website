import { useContext } from "react";
import "./contributeSection.css";
import { themecontext } from "../../../context/themeContext";
import Image from '../assets/hero_image.png'

const ContributeSection = () => {
  const { theme } = useContext(themecontext);
  return (
    <div className={`contribute-section ${theme}`}>
      <div className="wrapper">
        <h1>
          <span>Contribute</span> to the community
        </h1>
        <p>
          There are many ways that you can contribute to the community. One of them has always been by using tools that let users go back in time in the internet. <br/> Wayback Machine is the best example, you can enter any link related to NCS, like their YouTube channel and start looking for lost media and share it on discord server. 
        </p>
        <a href="https://web.archive.org/web/20230000000000*/https://www.youtube.com/user/NoCopyrightSounds" target="_blank">Contribute</a>
        <img src={Image} />
      </div>
    </div>
  );
};

export default ContributeSection;
