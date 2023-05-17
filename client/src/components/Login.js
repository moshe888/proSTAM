import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/stores/login", {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        const id = response.data.id;
        navigate(`/stores/${id}/products`);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <div className="login__container">
          <h2>Sign In</h2>
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <button type="submit">Sign In</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
