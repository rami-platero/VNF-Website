import { useContext, useState } from "react";
import "./login.css";
import { themecontext} from "../../context/themeContext";
import { useLogin } from "../../hooks/useLogin";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const { theme } = useContext(themecontext);

  return (
    <div className={`login-container`}>
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <div className={`text-field ${theme}`}>
          <input
            type="email"
            name="email"
            autoComplete="off"
            placeholder="name"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="email">EMAIL</label>
        </div>
        <div className={`text-field ${theme}`}>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <label htmlFor="password">PASSWORD</label>
        </div>
        <button
          type="submit"
          className={`login-btn ${theme}`}
          disabled={isLoading}
        >
          Log In
        </button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}

export default Login;
