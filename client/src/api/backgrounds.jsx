import axios from "axios";

export const getBackgrounds = async () => {
  return await axios.get("/backgrounds");
};

export const postBackground = async (body, user, setProgress) => {
  const form = new FormData();
  for (let key in body) {
    if (key !== "artists" && key !== "tracks") {
      form.append(key, body[key]);
    }
  }
  form.append("tracks", JSON.stringify(body.tracks));
  return await axios.post("/backgrounds", form, {
    headers: {
      "Content-Type": "multipart/form-data",
     "Authorization": `Bearer ${user.token}`,
    },
    onUploadProgress (progressEvent) {
    const {loaded, total} = progressEvent
    let percent = Math.floor((loaded*100)/total)
    setProgress(percent)
    },
  });
};

export const getBackground = async (customID) => {
  return await axios.get(`/backgrounds/${customID}`);
};
export const putBackground = async (id, body, user) => {
  return await axios.put(`/backgrounds/${id}`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${user.token}`,
    },
  });
};
export const delBackground = async (id, user) => {
  return await axios.delete(`/backgrounds/${id}`, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${user.token}`,
    },
  });
};
