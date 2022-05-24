import { EmployeePlace } from "./components/employee-place/EmployeePlace";
import React, { useState, useEffect } from 'react';

import './index.css';
import { Header } from "./components/header/Header";
function App() {
  const [data, setData] = useState([{}]);
  useEffect(() => {
    fetch("http://127.0.0.1:5000/lolo").then(
      res => res.json()
    ).then(
      data => {
        setData(data.data);

      }
    )
  }, []);
  return (
    <div className="App">
      <div className="wrapper">
        <div className="header">
          <Header></Header>
        </div>
        <div className="content" >
          {data.map((element)=>
            <EmployeePlace data={element}/>
        
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
