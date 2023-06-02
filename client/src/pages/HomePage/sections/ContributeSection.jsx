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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit cum
          esse praesentium quod consequuntur excepturi maiores numquam eveniet,
          quibusdam ratione mollitia nostrum blanditiis consectetur assumenda
          error optio corrupti, rem ut.
        </p>
        <button>Contribute</button>
        <img src={Image} />
      </div>
    </div>
  );
};

export default ContributeSection;
