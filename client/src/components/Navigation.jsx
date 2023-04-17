import React, { useContext } from "react";
import "./navigation.css";
import { NavLink } from "react-router-dom";
import Logo from "../assets/ncs-logo-resized.png";
import { IoMoon } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";
import { mainContext } from "../context/SongsContext";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

function Navigation() {
  const { theme, handleTheme } = useContext(mainContext);
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className={`nav-header ${theme}`}>
      <div className={`nav-container`}>
        <ul>
          {open && window.innerWidth <= 1200 && (
            <div className={`pages-nav ham ${theme}`}>
              <NavLink className={"navlink-logo"} to={"/"} src={Logo}>
                <img src={Logo} className={`logo ${theme}`} />
              </NavLink>
              <NavLink
                onClick={() => {
                  setOpen(false);
                }}
                to={"/deleted-songs"}
                className={({ isActive }) =>
                  isActive ? `link active ${theme}` : `link inactive ${theme}`
                }
              >
                Deleted Songs
              </NavLink>
              <NavLink
                to={"/backgrounds"}
                onClick={() => {
                  setOpen(false);
                }}
                className={({ isActive }) =>
                  isActive ? `link active ${theme}` : `link inactive ${theme}`
                }
              >
                Backgrounds
              </NavLink>
            </div>
          )}
          <div className="pages-nav desktop">
            <NavLink
              onClick={() => {
                setOpen(false);
              }}
              className={"navlink-logo"}
              to={"/"}
              src={Logo}
            >
              <img src={Logo} className={`logo ${theme}`} />
            </NavLink>
            <NavLink
              onClick={() => {
                setOpen(false);
              }}
              to={"/deleted-songs"}
              className={({ isActive }) =>
                isActive ? `link active ${theme}` : `link inactive ${theme}`
              }
            >
              Deleted Songs
            </NavLink>
            <NavLink
              onClick={() => {
                setOpen(false);
              }}
              to={"/backgrounds"}
              className={({ isActive }) =>
                isActive ? `link active ${theme}` : `link inactive ${theme}`
              }
            >
              Backgrounds
            </NavLink>
          </div>

          <div className="links">
            <div className="hamburger-container">
              {!open ? (
                <IoMenu
                  onClick={() => {
                    setOpen(true);
                  }}
                  className={`hamburger ${theme}`}
                  size={"2rem"}
                />
              ) : (
                <IoClose
                  onClick={() => {
                    setOpen(false);
                  }}
                  className={`hamburger ${theme}`}
                  size={"2rem"}
                />
              )}
            </div>
            <div className="auth-links">
              {theme == "dark" ? (
                <IoMoon
                  size="1.5rem"
                  style={{ cursor: "pointer" }}
                  className="icon"
                  onClick={() => {
                    handleTheme("light");
                  }}
                />
              ) : (
                <IoSunnyOutline
                  size="1.5rem"
                  style={{ cursor: "pointer" }}
                  className="icon"
                  onClick={() => {
                    handleTheme("dark");
                  }}
                />
              )}
              {!user && (
                <>
                  <NavLink
                    to={"/login"}
                    className={({ isActive }) =>
                      isActive
                        ? `link active ${theme}`
                        : `link inactive ${theme}`
                    }
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to={"/signup"}
                    className={({ isActive }) =>
                      isActive
                        ? `link active ${theme}`
                        : `link inactive ${theme}`
                    }
                  >
                    Sign Up
                  </NavLink>
                </>
              )}

              {user && (
                <button className={`log-out ${theme}`} onClick={handleLogout}>
                  Log Out
                </button>
              )}
            </div>
          </div>
        </ul>
      </div>
    </header>
  );
}

export default Navigation;
