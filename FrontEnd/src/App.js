import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// style
import "./App.css";

// src
import VideoRoomComponent from "./components/VideoRoomComponent";
import LandingPage from "./components/LandingPage/LandingPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";
// 고려할만할듯 로딩페이지 처럼
// import Error404 from '../common/error/Error404';
// import Error500 from '../common/error/Error500';

// routes
import Main from "./routes/Main";

function App() {
  const NLandinPage = Auth(LandingPage, null);
  const NLoginPage = Auth(LoginPage, false);
  const NRegisterPage = Auth(RegisterPage, false);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/*" element={<NLandinPage />} />

          <Route path="/login" element={<NLoginPage />} />

          <Route path="/join" element={<Main />} />
          
          <Route path="/videoroom" element={<VideoRoomComponent />} />

          <Route path="/register" element={<NRegisterPage />} />

          <Route path="/lobby" element={<Lobby/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;