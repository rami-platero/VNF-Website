import { useContext, useState } from "react";
import "./bg.css";
import { IoMdDownload } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { bgcontext } from "../../../context/bgsContext";
import Skeleton from "../../../assets/skeleton-image.png";
import Progress from "../../../components/Progress";
import { themecontext } from "../../../context/themeContext";
import { memo } from "react";

function BGItem({ bg }) {
  const { theme } = useContext(themecontext);
  const { user } = useAuthContext();
  const { delBg, progress, idRemove, setIdRemove } = useContext(bgcontext);
  const navigate = useNavigate();
  const handleRemove = () => {
    if (user?.roles_name?.includes("admin")) {
      setIdRemove(bg?._id);
      delBg(bg?._id, user);
    }
  };
  const [loading, setLoading] = useState(true);
  const handleImageLoad = () => {
    setLoading(false);
  };
  return (
    <div className={`bg-container ${theme} ${idRemove === bg?._id}`}>
      <div className="bg-image-wrapper">
        {loading && <div className="bg-loader"></div>}
        {!bg?.loading ? (
          <img
            src={bg?.file?.preview}
            onLoad={handleImageLoad}
            onClick={() => {
              navigate(`/backgrounds/${bg?.customID}`);
            }}
          />
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

export default memo(BGItem);
