import { Button, TextField } from "@mui/material";
import "./signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [newUserName, setNewUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const submit = async () => {
    const add = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: newUserName, password: newPassword }),
    };
    const response = await fetch("/login/add", add).then((response) =>
      response.json().then((resp) => {
        if (resp) {
          alert("New User has been successfully added");
          navigate("/");
        } else alert("User already exist");
      })
    );
  };

  return (
    <>
      <div className="signup">
        <h1>SIGN UP</h1>
        <div className="name">
          <TextField
            onChange={(e) => setNewUserName(e.target.value)}
            label="Enter name"
            variant="outlined"
          />
        </div>
        <div className="pwd">
          <TextField
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            label="Password"
            variant="outlined"
          />
        </div>
        <Button variant="contained" onClick={submit}>
          Submit
        </Button>
      </div>
    </>
  );
}

export default Signup;
