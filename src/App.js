import Header from "./components.js/Header";
import Footer from "./components.js/Footer";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import "./styles.css";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Edit from "./pages/Edit";
import axios from "axios";

// axios global config
axios.defaults.baseURL = "https://simple-web-app-server.onrender.com";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<Edit />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
