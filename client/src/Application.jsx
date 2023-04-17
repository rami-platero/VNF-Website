import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.jsx";
import Songs from "./pages/Songs.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import Navigation from "./components/Navigation.jsx";
import { SongsContext } from "../src/context/SongsContext.jsx";
import AddSong from "./components/AddSong.jsx";
import "./context/theme.css";
import Login from "./pages/Login/Login.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import { useAuthContext } from "./hooks/useAuthContext.jsx";
import DeletedSong from "./pages/Song/DeletedSong.jsx";
import Backgrounds from "./pages/Backgrounds/Backgrounds.jsx";
import { BgContextProvider } from "./context/bgsContext.jsx";
import AddBg from "./pages/Backgrounds/components/AddBg.jsx";
import axios from "axios";

function App() {
  axios.defaults.baseURL = `https://vnf-website-api.onrender.com/`;
  const { user } = useAuthContext();
  return (
    <SongsContext>
      <BgContextProvider>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/deleted-songs" element={<Songs />} />
            <Route path="/backgrounds" element={<Backgrounds />} />
            <Route path="/add-background" element={<AddBg />} />
            <Route
              path="/add-deleted-song"
              element={user ? <AddSong /> : <Navigate to="/" />}
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
        </BrowserRouter>
      </BgContextProvider>
    </SongsContext>
  );
}

export default App;
