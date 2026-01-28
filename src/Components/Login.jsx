import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("https://visionrestro.railway.app/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login Successful");
       localStorage.setItem("isLoggedIn", "true");
navigate("/dashboard");

      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Server error");
    }
  };

  return (
    <div className="page">
      <div className="login-box">
        <div className="header">User Login</div>

        <div className="content">
          <p className="welcome">Welcome</p>

          <div className="form">
            <div className="avatar">👤</div>

            <div className="fields">
              <div className="row">
                <label>User</label>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="row">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="buttons">
            <button className="login-btn" onClick={handleLogin}>
              ✔ Login
            </button>
            <button className="close-btn">✖ Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
