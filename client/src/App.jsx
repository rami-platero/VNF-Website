import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.jsx";
import Songs from "./pages/Songs/Songs.jsx";
import NotFoundPage from "./pages/NotFound/NotFoundPage.jsx";
import Navigation from "./components/Navigation.jsx";
import AddSong from "./pages/AddSong/AddSong.jsx";
import AddBg from "./pages/Backgrounds/AddBG/AddBg.jsx";
import "./context/theme.css";
import Login from "./pages/Auth/Login.jsx";
import SignUp from "./pages/Auth/SignUp.jsx";
import { useAuthContext } from "./hooks/useAuthContext.jsx";
import Backgrounds from "./pages/Backgrounds/Backgrounds.jsx";
import { BgContextProvider } from "./context/bgsContext.jsx";
import axios from "axios";
import ScrollToTop from "./components/ScrollToTop.jsx";
import HigherOrLower from "./pages/HigherOrLower/HigherOrLower.jsx";
import SingleBG from "./pages/Backgrounds/SinglePage/SingleBG.jsx";
import { useContext } from "react";
import { themecontext } from "./context/themeContext.jsx";
import About from "./pages/About/About.jsx";
import { CSSTransition } from "react-transition-group";
import ErrorModal from "./components/ErrorModal.jsx";
import { errorContext } from "./context/errorsContext.jsx";
import SinglePageSong from "./pages/Song Single Page/SinglePageSong.jsx";

function App() {
  axios.defaults.baseURL = `https://vnf.onrender.com`;
  const { user } = useAuthContext();
  const { theme } = useContext(themecontext);
  const { responseError } = useContext(errorContext);
  return (
    <BgContextProvider>
      <div className={`routes-container ${theme}`}>
        <CSSTransition
          classNames={"grow"}
          timeout={300}
          in={responseError.error}
          unmountOnExit
        >
          <ErrorModal />
        </CSSTransition>
        <BrowserRouter>
          <Navigation />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/HigherOrLower" element={<HigherOrLower />} />
            <Route path="/deleted-songs" element={<Songs />} />
            <Route path="/backgrounds" element={<Backgrounds />} />
            <Route path="/backgrounds/:customID" element={<SingleBG />} />
            <Route path="/add-background" element={<AddBg />} />
            <Route
              path="/add-deleted-song"
              element={<AddSong />}
              /*  element={user ? <AddSong /> : <Navigate to="/" />} */
            />
            <Route
              path="/deleted-song/:customID/:name"
              element={<SinglePageSong />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <SignUp /> : <Navigate to="/" />}
            />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
      </div>
    </BgContextProvider>
  );
}

export default App;
