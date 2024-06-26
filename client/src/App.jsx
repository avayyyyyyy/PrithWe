import React, { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Calculator from "./pages/Calculator";
import AboutUs from "./pages/AboutUs";
import Information from "./pages/Information";
import axios from "axios";
import NewFooter from "./components/NewFooter";
import Footer2 from "./components/Footer2";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("/api/auth/login/status", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, []);
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route
          path="/login"
          element={loggedIn ? <Navigate to="/calculator" /> : <Login />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/information" element={<Information />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/logout" element={<Home />} />
        <Route
          path="/calculator"
          element={loggedIn ? <Calculator /> : <Navigate to="/login" />}
        />
      </Routes>
      {/* <Footer2 /> */}
      <NewFooter />
    </Router>
  );
}

export default App;
