import { useContext, useEffect, useState } from "react";
import "./higherorlower.css";
import { mainContext } from "../../context/SongsContext";
import { RiArrowDropDownFill } from "react-icons/ri";
import { RiArrowDropUpFill } from "react-icons/ri";

const HigherOrLower = () => {
  const { getSongsFilter } = useContext(mainContext);
  const [randomIndex, setRandomIndex] = useState(null);
  const [randomIndex2, setRandomIndex2] = useState(null);
  const [songs, setSongs] = useState([]);
  const [revealViews, setRevealViews] = useState(false);
  const [gameState, setGameState] = useState(true);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const getSongs = async () => {
      const res = await getSongsFilter();
      setSongs(res.data);
      let random1 = Math.floor(Math.random() * res.data.length);
      let random2;
      do {
        random2 = Math.floor(Math.random() * res.data.length);
      } while (random1 === random2);
      setRandomIndex(random1);
      setRandomIndex2(random2);
    };
    getSongs();
  }, [gameState]);

  const handleGame = async (pick) => {
    if (pick === "lower") {
      if (songs[randomIndex2]?.views < songs[randomIndex]?.views) {
        setScore(score + 1);
        setRevealViews(true);
        let newRandom;
        await new Promise((resolve) => {
          do {
            newRandom = Math.floor(Math.random() * songs.length);
          } while (newRandom === randomIndex2 || newRandom === randomIndex);
          resolve();
        });
        setTimeout(() => {
          setRandomIndex(randomIndex2);
          setRandomIndex2(newRandom);
          setRevealViews(false);
        }, 3000);
      } else {
        setGameState(false);
        setScore(0);
        console.log("you lost");
      }
    } else if (pick === "higher") {
      if (songs[randomIndex2]?.views > songs[randomIndex]?.views) {
        setScore(score + 1);
        setRevealViews(true);
        let newRandom;
        await new Promise((resolve) => {
          do {
            newRandom = Math.floor(Math.random() * songs.length);
          } while (newRandom === randomIndex2 || newRandom === randomIndex);
          resolve();
        });
        setTimeout(() => {
          setRandomIndex(randomIndex2);
          setRandomIndex2(newRandom);
          setRevealViews(false);
        }, 3000);
      } else {
        setGameState(false);
        setScore(0);
        console.log("you lost");
      }
    }
  };

  return (
    <div className="high-low-container">
      <div
        className="current"
        style={{ "--random1BG": `url(${songs[randomIndex]?.artwork?.url})` }}
      >
        <div className="current-content">
          <img src={songs[randomIndex]?.artwork?.url} />
          <div className="info">
            <h1 className="song-title">{songs[randomIndex]?.name}</h1>
            <h3 className="artists-list">
              {songs[randomIndex]?.artists
                ?.map((artist) => {
                  return artist?.name;
                })
                .join(", ")}
            </h3>
          </div>
          <p>had</p>
          <h1 className="views-amount">
            {songs[randomIndex]?.views.toLocaleString("en-US")}
          </h1>
          <h3 style={{ textAlign: "center" }}>VIEWS</h3>
        </div>
      </div>
      <div
        className="next"
        style={{ "--random2BG": `url(${songs[randomIndex2]?.artwork?.url})` }}
      >
        <div className="next-content">
          <img src={songs[randomIndex2]?.artwork?.url} />
          <div className="info">
            <h1 className="song-title">{songs[randomIndex2]?.name}</h1>
            <h3 className="artists-list">
              {songs[randomIndex2]?.artists
                ?.map((artist) => {
                  return artist?.name;
                })
                .join(", ")}
            </h3>
          </div>
          <p>had</p>
          {!revealViews ? (
            <div className="buttons-high-low">
              <button
                onClick={() => {
                  handleGame("higher");
                }}
              >
                {/* <RiArrowDropUpFill size={"1rem"}/> */} Higher
              </button>
              <button
                onClick={() => {
                  handleGame("lower");
                }}
              >
                {/* <RiArrowDropDownFill size={"1rem"}/> */} Lower
              </button>
              <p>views than {songs[randomIndex]?.name}</p>
            </div>
          ) : (
            <>
              <h1 className="views-amount">
                {songs[randomIndex2]?.views.toLocaleString("en-US")}
              </h1>
              <h3 style={{ textAlign: "center" }}>VIEWS</h3>
            </>
          )}
        </div>
      </div>
      <p className="score">Score: {score}</p>
      <div className="gameState">VS</div>
    </div>
  );
};

export default HigherOrLower;
