import { useContext, useEffect, useState, useRef } from "react";
import "./higherorlower.css";
import { mainContext } from "../../context/SongsContext";
import { RiArrowDropDownFill } from "react-icons/ri";
import { RiArrowDropUpFill } from "react-icons/ri";
import Loading from "../../assets/loading.gif";
import LossModal from "./LossModal";
import { CSSTransition } from "react-transition-group";

const HigherOrLower = () => {
  const { getSongsFilter } = useContext(mainContext);
  const [randomIndex, setRandomIndex] = useState(null);
  const [randomIndex2, setRandomIndex2] = useState(null);
  const [songs, setSongs] = useState([]);
  const [revealViews, setRevealViews] = useState(false);
  const [gameState, setGameState] = useState(true);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const lastScore = useRef(null);

  useEffect(() => {
    if (gameState) {
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
    }
  }, [gameState]);

  const handleGame = async (pick) => {
    if (pick === "lower") {
      if (songs[randomIndex2]?.views <= songs[randomIndex]?.views) {
        setLoading(true);
        setScore(score + 1);
        setEnd(songs[randomIndex2]?.views);
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
          setLoading(false);
        }, 3000);
        ref.current = 0;
        setState(0);
      } else {
        lastScore.current = score;
        setGameState(false);
        setScore(0);
      }
    } else if (pick === "higher") {
      if (songs[randomIndex2]?.views >= songs[randomIndex]?.views) {
        setLoading(true);
        setEnd(songs[randomIndex2]?.views);
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
          setLoading(false);
        }, 3000);
        ref.current = 0;
        setState(0);
      } else {
        lastScore.current = score;
        setGameState(false);
        setScore(0);
      }
    }
  };

  const [state, setState] = useState(0);
  const [end, setEnd] = useState(null);
  const ref = useRef(0);
  const accum = end / 250;

  const updateCounterState = () => {
    if (ref.current < end) {
      const result = Math.ceil(ref.current + accum);
      if (result > end) return setState(end);
      setState(result);
      ref.current = result;
    }
    setTimeout(updateCounterState, 1);
  };

  useEffect(() => {
    updateCounterState();
  }, [end]);

  return (
    <>
      {(randomIndex || randomIndex2) && (
        <div className="high-low-container">
          <CSSTransition
            in={!gameState}
            unmountOnExit
            classNames={"grow"}
            timeout={300}
          >
            <LossModal setGameState={setGameState} lastScore={lastScore} />
          </CSSTransition>

          <div
            className="current"
            style={{
              "--random1BG": `url(${songs[randomIndex]?.artwork?.url})`,
            }}
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
            style={{
              "--random2BG": `url(${songs[randomIndex2]?.artwork?.url})`,
            }}
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
                    disabled={!gameState}
                  >
                    Higher
                  </button>
                  <button
                    onClick={() => {
                      handleGame("lower");
                    }}
                    disabled={!gameState}
                  >
                    Lower
                  </button>
                  <p>views than {songs[randomIndex]?.name}</p>
                </div>
              ) : (
                <>
                  <h1 className="views-amount">
                    {state?.toLocaleString("en-US")}
                  </h1>
                  <h3 style={{ textAlign: "center" }}>VIEWS</h3>
                </>
              )}
            </div>
          </div>
          <p className="score">Score: {score}</p>
          {gameState ? (
            <div className="gameState">
              {loading ? <img src={Loading} /> : <>VS</>}
            </div>
          ) : (
            <div className="gameState">X</div>
          )}
        </div>
      )}
    </>
  );
};

export default HigherOrLower;
