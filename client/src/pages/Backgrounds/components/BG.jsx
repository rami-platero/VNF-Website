import { useContext } from "react";
import "./bg.css";
import { IoMdDownload } from "react-icons/io";
import { mainContext } from "../../../context/SongsContext";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { bgcontext } from "../../../context/bgsContext";
import Skeleton from "../../../assets/skeleton-image.png";

function BG({ bg }) {
  const { theme } = useContext(mainContext);
  const { user } = useAuthContext();
  const { delBg, progress } = useContext(bgcontext);
  const handleRemove = () => {
    if (user?.roles_name?.includes("admin")) {
      delBg(bg?._id, user);
    } else {
      console.log("you are not authorized");
    }
  };
  return (
    <div className={`bg-container ${theme}`}>
      <div className="bg-image-wrapper">
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
        <div className="progress-container">
          <h3 className="progress-text">{progress}% completed</h3>
          {progress===100 && (
            <h3 className="progress-text-server">uploading to server...</h3>
          )}
        </div>
      )}
    </div>
  );
}

export default BG;
