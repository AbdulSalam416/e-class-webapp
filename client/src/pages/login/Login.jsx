import React, { useContext, useState, useEffect } from "react";
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";
import { useHistory } from "react-router-dom";
import "./style.scss";
import { AuthContext } from "../../context/authContext/AuthContext";
import { loginUser } from "../../context/authContext/apiCalls";
import axios from "axios";

const Login = ({ setLoginUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isBackendReady, setIsBackendReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { isFetching, dispatch } = useContext(AuthContext);

  const history = useHistory();

  useEffect(() => {
    // Pinging the backend to wake it up
    const wakeUpBackend = async () => {
      try {
        await axios.get("https://e-class-webapp.onrender.com/"); 
        setIsBackendReady(true);
      } catch (error) {
        console.error("Failed to connect to the backend:", error);
        setIsBackendReady(false);
      } finally {
        setIsLoading(false); 
      }
    };

    wakeUpBackend();
  }, []);

  const handleLogin = () => {
    if (email && password) {
      loginUser({ email, password }, dispatch);
    } else {
      alert("Please fill up all fields");
    }
  };

  if (isLoading) {
    return (
      <div className="login">
        <div className="login-page">
          <h1>Loading...</h1>
          <p>Waking up the server. Please wait a moment.</p>
        </div>
      </div>
    );
  }

  if (!isBackendReady) {
    return (
      <div className="login">
        <div className="login-page">
          <h1>Service Unavailable</h1>
          <p>The server is currently unreachable. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="login">
      <div className="login-page">
        <h1>Login</h1>
        <div className="login-input">
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
          ></input>
          <Email className="icon" />
        </div>

        <div className="login-input">
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          ></input>
          <Lock className="icon" />
        </div>

        <button className="btn" onClick={handleLogin} disabled={isFetching}>
          Login
        </button>
        <div>or</div>
        <button className="btn" onClick={() => history.push("/register")}>
          Register
        </button>

        <p className="test">
          No account? use Test account. email: test1@example.com
          password: 12345678
        </p>
      </div>
    </div>
  );
};

export default Login;
