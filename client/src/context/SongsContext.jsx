import { createContext, useEffect, useState } from "react";
import {
  delSong,
  getSongsRequest,
  postNewSong,
  singleSong,
  updateSong,
  postSongExistingBG
} from "../api/songs.jsx";

export const mainContext = createContext();

export const SongsContextProvider = ({ children }) => {
  const [delSongs, setDelSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idRemove, setIdRemove] = useState(null);
  const [progressSong, setProgressSong] = useState(null);
  const [idEdit, setIdEdit] = useState(null)

  const getSongs = async () => {
    try {
      const res = await getSongsRequest();
      setDelSongs(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getSongsFilter = async () => {
    try {
      return await getSongsRequest();
    } catch (error) {
      console.log(error);
    }
  };

  const postSong = async (song, user) => {
    try {
      setProgressSong(0);
      setDelSongs([...delSongs, { name: "loading item", loading: true }]);
      const res = await postNewSong(song, user, setProgressSong, progressSong);
      setDelSongs([...delSongs, res.data]);
      setProgressSong(null);
    } catch (error) {
      console.log(error);
    }
  };

  const postSongwithBG = async (song, user) => {
    try {
      setDelSongs([...delSongs, { name: "loading item", loading: true }]);
      const res = await postSongExistingBG(song, user);
      setDelSongs([...delSongs, res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const removeSong = async (id, user) => {
    try {
      await delSong(id, user);
      setDelSongs(
        delSongs.filter((song) => {
          return song._id !== id;
        })
      );
      setIdRemove(null);
    } catch (error) {
      setLoadingRemove(false);
      console.log(error);
    }
  };

  const getSingleSong = async (id) => {
    try {
      const res = await singleSong(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const editSong = async (id, body, user) => {
    const res = await updateSong(id, body, user);
    setDelSongs(res.data);
  };

  useEffect(() => {
    getSongs();
  }, []);

  return (
    <mainContext.Provider
      value={{
        delSongs,
        postSong,
        removeSong,
        editSong,
        getSingleSong,
        loading,
        idRemove,
        setIdRemove,
        progressSong,
        setDelSongs,
        getSongsFilter,
        postSongwithBG,
        idEdit,
        setIdEdit
      }}
    >
      {children}
    </mainContext.Provider>
  );
};
