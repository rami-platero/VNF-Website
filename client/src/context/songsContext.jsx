import { createContext, useEffect, useState } from "react";
import {
  delSong,
  getSongsRequest,
  postNewSong,
  singleSong,
  updateSong,
} from "../api/songs.jsx";

export const mainContext = createContext();

export const SongsContextProvider = ({ children }) => {
  const [delSongs, setDelSongs] = useState([]);
  const [theme, setTheme] = useState("dark");
  const [loading, setLoading] = useState(true);
  const [loadingRemove, setLoadingRemove] = useState(false);

  const handleTheme = (theme) => {
    setTheme(theme);
    localStorage.setItem('theme', theme);
  };

  const getSongs = async () => {
    try {
      const res = await getSongsRequest();
      setDelSongs(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const postSong = async (song, user) => {
    try {
      const res = await postNewSong(song, user);
      setDelSongs([...delSongs, res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const removeSong = async (id, user) => {
    try {
      setLoadingRemove(true);
      await delSong(id, user);
      setDelSongs(
        delSongs.filter((song) => {
          return song._id !== id;
        })
      );
      setLoadingRemove(false);
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
    if (localStorage.getItem("theme")) {
      handleTheme(localStorage.getItem("theme"))
      localStorage.setItem("theme", localStorage.getItem("theme"));
    } else {
      localStorage.setItem("theme", "dark")
      handleTheme("dark")
    }
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
        theme,
        setTheme,
        handleTheme,
        loading,
        loadingRemove,
      }}
    >
      {children}
    </mainContext.Provider>
  );
};
