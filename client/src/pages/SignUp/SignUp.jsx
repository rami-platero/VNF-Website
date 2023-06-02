import { useContext, useState } from "react";
import "./signup.css";
import { themecontext } from "../../context/themeContext";
import { useSignup } from "../../hooks/useSignUp";
import Loader from "../../components/UI/Loader";

function SignUp() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { signup, error, isLoading,setError } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(form);
  };

  const handleChange = (e) => {
    if(error !== null && e.target.value.trim()){
      setError(null)
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const { theme } = useContext(themecontext);

  return (
    <div className={`login-container`}>
      {isLoading && <Loader/>}
      <h1>SIGN UP</h1>
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
          {error?.password && <div className="auth-error">{error.password}</div>}
        </div>
        <button
          type="submit"
          className={`login-btn ${theme} ${error?.password && "error"}`}
          disabled={isLoading}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
