import { EmployeePlace } from "./components/employee-place/EmployeePlace";
import React, { useState, useEffect } from 'react';
import { Map } from "./components/map/Map"


import './index.scss';
import { Header } from "./components/header/Header";

function App() {
  const [data, setData] = useState([{}]);
  useEffect(() => {
    fetch("http://localhost:3000/").then(
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
          <Map></Map>
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
