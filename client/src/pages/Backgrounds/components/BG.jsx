import { useContext } from "react";
import "./bg.css";
import { IoMdDownload } from "react-icons/io";
import { mainContext } from "../../../context/SongsContext";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { bgcontext } from "../../../context/bgsContext";

function BG({ bg }) {
  const { theme } = useContext(mainContext);
  const { user } = useAuthContext();
  const { delBg } = useContext(bgcontext);
  const handleRemove = () => {
    if (user?.roles_name?.includes("admin")) {
      delBg(bg._id, user);
    } else {
      console.log("you are not authorized");
    }
  };
  return (
    <div className={`bg-container ${theme}`}>
      <div className="bg-image-wrapper">
        <img src={bg.file.url} />
      </div>
      <div className="actions-bg">
        <Link className={`download-bg-btn ${theme}`} to={bg.file.download_link}>
          <IoMdDownload /> Download
        </Link>
        {user?.roles_name?.includes("admin") && (
          <button onClick={handleRemove}>Remove</button>
        )}
      </div>
    </div>
  );
}

export default BG;
