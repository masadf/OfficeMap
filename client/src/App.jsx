import React, { useContext, useEffect, useState } from 'react';

import './index.css';
import { AuthHeader } from "./components/header/AuthHeader";
import { Login } from "./components/login/Login"
import {
  BrowserRouter,
  Routes,
  Navigate,
  Route
} from "react-router-dom";
import Registration from './components/registration/Registration';
import { MainPage } from './components/mainpage/MainPage';
import { Context } from "./index";
import { observer } from "mobx-react-lite"
import Header from "./components/header/Header";

function App() {
  const [employeeData, setEmployeeData] = useState([]);
  const { store } = useContext(Context)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }

  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <div className="wrapper">
          <div className="header">
            {store.isAuth ?
              <Header />
              :
              <AuthHeader />
            }

          </div>
          <div className="content">
            <Routes>
              {!store.isAuth && <Route path="/login" element={<Login />} />}
              {!store.isAuth && <Route path="/registration" element={<Registration />} />}
              <Route path="/" element={<MainPage employeeData={employeeData} />} />
              <Route
                path="/"
                element={<Navigate to="/" replace />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default observer(App);
