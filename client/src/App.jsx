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
import DeletedSong from "./pages/Song/DeletedSong.jsx";
import Backgrounds from "./pages/Backgrounds/Backgrounds.jsx";
import { BgContextProvider } from "./context/bgsContext.jsx";
import axios from "axios";
import ScrollToTop from "./components/ScrollToTop.jsx";
import HigherOrLower from "./pages/HigherOrLower/HigherOrLower.jsx";
import SingleBG from "./pages/Backgrounds/SinglePage/SingleBG.jsx";
import { useContext } from "react";
import { themecontext } from "./context/themeContext.jsx";

function App() {
  axios.defaults.baseURL = `http://localhost:4000`;
  const { user } = useAuthContext();
  const {theme} = useContext(themecontext)
  return (
    <BgContextProvider>
      <BrowserRouter>
        <div className={`routes-container ${theme}`}>
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
              element={<DeletedSong />}
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
          </Routes>
        </div>
      </BrowserRouter>
    </BgContextProvider>
  );
}

export default App;
