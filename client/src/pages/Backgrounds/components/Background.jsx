import { useContext } from "react";
import "./bg.css";

import { IoMdDownload } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { bgcontext } from "../../../context/bgsContext";
import Skeleton from "../../../assets/skeleton-image.png";
import Progress from "../../../components/UI/Progress";
import { themecontext } from "../../../context/themeContext";

function BG({ bg }) {
  const { theme } = useContext(themecontext);
  const { user } = useAuthContext();
  const { delBg, progress } = useContext(bgcontext);
  const navigate = useNavigate();
  const handleRemove = () => {
    if (user?.roles_name?.includes("admin")) {
      delBg(bg?._id, user);
    } else {
      console.log("you are not authorized");
    }
  };
  return (
    <div className={`bg-container ${theme}`}>
      <div
        className="bg-image-wrapper"
        onClick={() => {
          navigate(`/backgrounds/${bg?.customID}`);
        }}
      >
        {!bg?.loading ? (
          <img src={bg?.file?.url} />
        ) : (
          <div className="skeleton-bg">
            <img src={Skeleton} />
          </div>
        )}
      </div>
      {!bg?.loading ? (
        <div className="actions-bg">
          <Link
            className={`download-bg-btn ${theme}`}
            to={bg?.file?.download_link}
          >
            <IoMdDownload /> Download
          </Link>
          {user?.roles_name?.includes("admin") && (
            <button onClick={handleRemove}>Remove</button>
          )}
        </div>
      ) : (
        <Progress progress={progress} />
      )}
    </div>
  );
}

export default BG;
