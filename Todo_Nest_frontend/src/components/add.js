import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

function Add(props) {
  const [value, setValue] = useState("");

  const userId = localStorage.getItem("userId");
  const submit = async () => {
    const add = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ noteName: value, login: userId }),
    };
    const response = await fetch("notes/add", add).then((response) =>
      response.json()
    );
    props.setVal(!props.val);
  };

  return (
    <div>
      <TextField
        onChange={(e) => setValue(e.target.value)}
        id="outlined-basic"
        label="Item Name"
        variant="outlined"
      />

      <Button onClick={submit} variant="contained" style={{ margin: "10px" }}>
        Submit
      </Button>
    </div>
  );
}
export default Add;
