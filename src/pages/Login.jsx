import { useRef } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router";


const Login = () => {
  const formRef = useRef();
  const { loginUser, loading, message } = useLogin();
  const navigate = useNavigate()
  

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email: e.target.email.value.trim(),
      password: e.target.password.value.trim(),
    };
    loginUser(formData);
  };


  return (
    <div>
      <h2>Login</h2>
      <form ref={formRef} onSubmit={handleSubmit}>
        <label>Email</label>
        <br />
        <input name="email" type="email" required />
        <br />
        <label>Password</label>
        <br />
        <input name="password" type="password" required />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <br />
        <button type="button" onClick={() => navigate("/register")}>
          Register
        </button>

        
      </form>

      {message && (
        <p
          style={{
            marginTop: 15,
            color: message.includes("✅") ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default Login;
