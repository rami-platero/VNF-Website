import React from "react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { themecontext } from "../../context/themeContext";
import { mainContext } from "../../context/SongsContext";
import DeletedInfo from "./sections/DeletedInfo";
import BackgroundInfo from "./sections/BackgroundInfo";
import DeletedSong from "./sections/DeletedSong";

const SinglePageSong = () => {
  const { customID } = useParams();
  const { getSingleSong, loading } = useContext(mainContext);
  const { theme } = useContext(themecontext);
  const [song, setSong] = useState({});
  const getSong = async () => {
    if (customID) {
      const post = await getSingleSong(customID);
      setSong(post);
    }
  };

  useEffect(() => {
    getSong();
  }, []);

  const artistsList = song.artists
    ?.map((artist) => {
      return artist?.name;
    })
    .join(", ");

  return (
    <div className={`post-container ${theme}`}>
      {loading && <div className="loader-song"></div>}
      <DeletedSong song={song} artistsList={artistsList} />
      <DeletedInfo song={song} artistsList={artistsList} />
      {song.background != null && <BackgroundInfo song={song} />}
    </div>
  );
};

export default SinglePageSong;
