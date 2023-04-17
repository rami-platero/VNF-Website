import { useContext } from "react";
import { mainContext } from "../context/SongsContext";
import Song from "../components/Song";
import "./songs.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Songs = () => {
  const { delSongs, theme } = useContext(mainContext);
  //SORT
  delSongs.sort((a,b)=>{
    return new Date(b.upload_date) - new Date(a.upload_date);
  })
  const { user } = useAuthContext();
  const navigate = useNavigate();
  return (
    <div className={`songs-container ${theme}`}>
      {user?.roles_name?.includes("admin") && (
        <button
          className={`add-new ${theme}`}
          onClick={() => {
            navigate("/add-deleted-song");
          }}
        >
          Add New
        </button>
      )}

      <div className="songs-wrapper">
        {/* {modalIsOpen && <NewSong setModalIsOpen={setModalIsOpen}/>} */}
        {/* <button onClick={()=>{
        openModal()
      }}>Add a new song</button> */}
        {delSongs.map((song) => {
          return <Song key={song._id} song={song}/>;
        })}
      </div>
    </div>
  );
};

export default Songs;
