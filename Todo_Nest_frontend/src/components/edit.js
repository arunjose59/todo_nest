import { Button, TextField } from "@mui/material";
import { useState } from "react";
function Edit({ val, setVal, editValue, indexVal, setFlag }) {
  const [changeVal, setChangeVal] = useState("");
  const token = localStorage.getItem("token")

  const editValFunc = async () => {
    const edit = {
      method: "PATCH",
      headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json"  },
      body: JSON.stringify({ id: indexVal, noteName: changeVal }),
    };

    const response = await fetch("/notes/edit", edit).then((response) =>
      response.json()
    );
    setVal(!val);
    setFlag(false);
  };

  return (
    <>
      <TextField
        placeholder={editValue}
        onChange={(e) => setChangeVal(e.target.value)}
      ></TextField>
      <Button onClick={editValFunc}>Edit</Button>
    </>
  );
}
export default Edit;
