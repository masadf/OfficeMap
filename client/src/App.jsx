
import React from 'react';

import './index.css';
import { AuthHeader } from "./components/header/AuthHeader";
import { Login } from "./components/login/Login"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Registration } from './components/registration/Registration';
function App() {
  return (<BrowserRouter>
    <div className="App">
      <div className="wrapper">
        <div className="header">
          <AuthHeader></AuthHeader>
        </div>
        <div className="content" >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </div>
      </div>
    </div>
  </BrowserRouter>
  );
}

export default App;
