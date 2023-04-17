import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.jsx";
import Songs from "./pages/Songs";
import NotFoundPage from "./pages/NotFoundPage";
import Navigation from "./components/Navigation";
import { SongsContext } from "./context/SongsContext";
import AddSong from "./components/AddSong";
import "./context/theme.css";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import { useAuthContext } from "./hooks/useAuthContext";
import DeletedSong from "./pages/Song/DeletedSong";
import Backgrounds from "./pages/Backgrounds/Backgrounds";
import { BgContextProvider } from "./context/bgsContext";
import AddBg from "./pages/Backgrounds/components/AddBg";
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
