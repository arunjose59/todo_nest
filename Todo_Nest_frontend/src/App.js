import Signin from "./components/Signin/signin";
import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import List from "./components/List/list";
import NotFound from "./components/notfound";
import SignUp from "./signUp/signUp";
function App() {
  const [userId, setUserId] = useState("");
  localStorage.setItem("auth", false);

  function ProtectedRoute({ children }) {
    let auth = JSON.parse(localStorage.getItem("auth"));

    if (auth) {
      return children;
    } else return "Not Having Access";
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<NotFound></NotFound>}></Route>
          <Route
            path="/"
            element={<Signin userId={userId} setUserId={setUserId}></Signin>}
          ></Route>
          <Route path="/signUp" element={<SignUp></SignUp>}></Route>
          <Route
            path="/list"
            element={
              <ProtectedRoute>
                <List></List>
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
