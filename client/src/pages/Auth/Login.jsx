import { useContext, useState } from "react";
import "./auth.css";
import { themecontext } from "../../context/themeContext";
import { useLogin } from "../../hooks/useLogin";
import Loader from "../../components/UI/Loader";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login, error, isLoading,setError } = useLogin();

  const handleChange = (e) => {
    if(error !== null && e.target.value.trim()){
      setError(null)
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(form);
  };

  const { theme } = useContext(themecontext);

  return (
    <div className={`auth-container ${theme}`}>
      {isLoading && <Loader />}
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <div className={`text-field ${theme} ${error?.email && "error"}`}>
          <input
            type="email"
            name="email"
            autoComplete="off"
            placeholder="name"
            onChange={handleChange}
            value={form.email}
          />
          <label htmlFor="email">EMAIL</label>
          {error?.email && <div className="auth-error">{error.email}</div>}
        </div>
        <div className={`text-field ${theme} ${error?.password && "error"}`}>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
            value={form.password}
          />
          <label htmlFor="password">PASSWORD</label>
          {error?.password && (
            <div className="auth-error">{error.password}</div>
          )}
        </div>
        <button
          type="submit"
          className={`login-btn ${theme}`}
          disabled={isLoading}
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
