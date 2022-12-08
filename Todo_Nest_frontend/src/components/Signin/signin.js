import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./signin.css";
import { useState } from "react";

function Signin(props) {
  const { userId, setUserId } = props;
  const [username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const navigate = useNavigate();

  function signup() {
    navigate("/signUp");
  }
  const submit = async () => {
    const getUser = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: Password }),
    };

    const response = await fetch("/login/name", getUser)
      .then((response) => response.json())
      .then((resp) => {
        if (resp) {

          localStorage.setItem("token",resp.jwt)
          localStorage.setItem("auth", true);
          localStorage.setItem("userId", resp.id);
          navigate("/list");
         
        } 
      });
  };

  return (
    <>
      <div className="signin">
        <h1>SIGN IN</h1>
        <div className="name">
          <TextField
            onChange={(e) => setUsername(e.target.value)}
            label="Enter name"
            variant="outlined"
          />
        </div>
        <div className="pwd">
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            label="Password"
            variant="outlined"
          />
        </div>
        <Button onClick={submit} variant="contained">
          Submit
        </Button>

        <Button onClick={signup}>SignUp</Button>
      </div>
    </>
  );
}
export default Signin;
