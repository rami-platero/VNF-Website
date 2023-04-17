import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

export const getSongsRequest = async () => {
  return await axios.get("/songs");
};

export const postNewSong = async (song,user) => {
  const form = new FormData();

  for (let key in song) {
    if (key !== "artists") {
      form.append(key, song[key]);
      console.log(key, song[key])
    }
  }
  form.append("artists", JSON.stringify(song.artists));
  return await axios.post("/songs", form, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${user.token}`,
    },
  });
};

export const delSong = async (id, user) => {
  if (user != null) {
    return await axios.delete(`/songs/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${user.token}`,
      },
    });
  } else {
    console.log("you are not authorized to remove this song");
  }
};

export const updateSong = async (id, body,user) => {
  if (user) {
    return await axios.put(`/songs/${id}`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${user.token}`,
      },
    });
  }
};

export const singleSong = async (id) => {
    return await axios.get(`/songs/${id}`);
};