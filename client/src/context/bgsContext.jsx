import { createContext, useEffect, useState } from "react";
import {
  getBackgrounds,
  getBackground,
  postBackground,
  putBackground,
  delBackground,
} from "../api/backgrounds";

export const bgcontext = createContext();

export const BgContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [progress, setProgress] = useState(null);
  const [idRemove, setIdRemove] = useState(null);

  const getBgs = async () => {
    try {
      const res = await getBackgrounds();
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBgs();
  }, []);

  const postBg = async (body, user) => {
    try {
      setData([...data, { loading: true }]);
      setProgress(0);
      const res = await postBackground(body, user, setProgress);
      setData([...data, res.data]);
      setProgress(null);
    } catch (error) {
      console.log(error);
    }
  };
  const getBg = async (customID) => {
    try {
      const res = await getBackground(customID);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const putBg = async (id, body, user) => {
    try {
      const res = await putBackground(id, body, user);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const delBg = async (id, user) => {
    try {
      await delBackground(id, user);
      setData(
        data.filter((bg) => {
          return bg._id !== id;
        })
      );
      setIdRemove(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <bgcontext.Provider
      value={{
        data,
        getBg,
        postBg,
        putBg,
        delBg,
        progress,
        setProgress,
        idRemove,
        setIdRemove,
      }}
    >
      {children}
    </bgcontext.Provider>
  );
};
