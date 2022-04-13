import { EmployeePlace } from "./components/employee-place/EmployeePlace";
import React, { useState, useEffect } from 'react';

import './index.scss';
import { Header } from "./components/header/Header";
function App() {
  const [data, setData] = useState([{}]);
  useEffect(() => {
    fetch("http://127.0.0.1:5000/").then(
      res => res.json()
    ).then(
      data => {
        setData(data);
      }
    ) 
  }, []);
  return (
    <div className="App">
      <div className="wrapper">
        <div className="header">
          <Header></Header>
        </div>
        <div className="content">
          <EmployeePlace num={1} />
          <EmployeePlace num={2} />
          <EmployeePlace num={3} />
          <EmployeePlace num={4} />
          <EmployeePlace num={5} />
          <EmployeePlace num={6} />
          <EmployeePlace num={7} />
          <EmployeePlace num={8} />
          <EmployeePlace num={9} />
        </div>
      </div>
    </div>
  );
}

export default App;
