import { useRef } from "react";
import { useRegister } from "../hooks/useRegister";
import { useNavigate } from "react-router";

const Register = () => {

  const formRef = useRef();
  const { registerUser, loading, message } = useRegister();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      firstName: e.target.firstName.value.trim(),
      lastName: e.target.lastName.value.trim(),
      email: e.target.email.value.trim(),
      password: e.target.password.value.trim(),
    };
    registerUser(formData);
  };

  return (
    <div>
      <h2>Register</h2>
      <form ref={formRef} onSubmit={handleSubmit}>
        <label>First Name</label>
        <br />
        <input name="firstName" type="text" required />
        <br />

        <label>Last Name</label>
        <br />
        <input name="lastName" type="text" required />
        <br />

        <label>Email</label>
        <br />
        <input name="email" type="email" required />
        <br />

        <label>Password</label>
        <br />
        <input name="password" type="password" required />
        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        <br />
        <button type="button" onClick={() => navigate("/login")}>
          Login
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

export default Register;
