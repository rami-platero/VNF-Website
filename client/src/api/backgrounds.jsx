import axios from "axios";

export const getBackgrounds = async () => {
  return await axios.get("/backgrounds");
};

export const postBackground = async (body, user) => {
  const form = new FormData();
  for (let key in body) {
    if (key !== "artists" && key !== "tracks") {
      form.append(key, body[key]);
      console.log(key, body[key]);
    }
  }
  /* form.append("artists", JSON.stringify(body.artists)); */
  form.append("tracks", JSON.stringify(body.tracks));
  return await axios.post("/backgrounds", form, {
    headers: {
      "Content-Type": "multipart/form-data",
     "Authorization": `Bearer ${user.token}`,
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
