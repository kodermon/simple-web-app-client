import Header from "./components.js/Header";
import Footer from "./components.js/Footer";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Edit from "./pages/Edit";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<Edit />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
