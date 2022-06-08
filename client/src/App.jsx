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
import { LomoPage } from './components/officesMap/LomoPage';
import { ChurchPage } from './components/officesMap/ChurchPage';
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
            {!store.isAuth && <Routes><Route path="/login" element={<Login />} /></Routes>}
              {store.isAuth &&
                <Routes>
                  < Route path="/lomo" element={<LomoPage />} />
                  <Route path="/church" element={<ChurchPage />} />
                </Routes>
              }
            </div>
            </div>
      </div>
        </BrowserRouter>
        );
}

        export default observer(App);
