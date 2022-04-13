import { EmployeePlace } from "./components/employee-place/EmployeePlace";
import React, {useState, useEffect} from 'react';

import './index.scss';
function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <div className="content">
          <EmployeePlace></EmployeePlace>
        </div>
      </div>
    </div>
  );
}

export default App;
