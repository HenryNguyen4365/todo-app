import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { AuthProvider } from "./context/AuthContext";
const App = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home isAuth={isAuth} />} />
          <Route path="/add" element={<Add isAuth={isAuth} />} />
          <Route path="/edit/:id" element={<Add />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          <Route
            path="/register"
            element={<Register setIsAuth={setIsAuth} />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
