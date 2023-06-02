import axios from "axios";

export const getSongsRequest = async () => {
  return await axios.get("/songs");
};

export const postNewSong = async (song, user, setProgressSong) => {
  const form = new FormData();

  for (let key in song) {
    if (key !== "artists") {
      form.append(key, song[key]);
    }
  }
  form.append("artists", JSON.stringify(song.artists));
  return await axios.post("/songs", form, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${user.token}`,
    },
    onUploadProgress(progressEvent) {
      const { loaded, total } = progressEvent;
      let percent = Math.floor((loaded * 100) / total);
      setProgressSong(percent);
    },
  });
};

export const postSongExistingBG = async (song, user) => {
  const form = new FormData();
  for (let key in song) {
    if (key !== "artists") {
      form.append(key, song[key]);
    }
  }
  form.append("artists", JSON.stringify(song.artists));
  return await axios.post("/songs", form, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${user.token}`,
    },
  });
};

export const delSong = async (id, user) => {
  if (user !== null) {
    return await axios.delete(`/songs/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
};

export const updateSong = async (id, body, user) => {
  if (user !== null) {
    const form = new FormData();
    for (let key in body) {
      if (key !== "artists") {
        form.append(key, body[key]);
      }
    }
    form.append("artists", JSON.stringify(body.artists));
    return await axios.put(`/songs/${id}`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.token}`,
      },
    });
  }
};

export const singleSong = async (id) => {
  return await axios.get(`/songs/${id}`);
};
