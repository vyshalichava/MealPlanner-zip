import logo from './logo.svg';
import React from 'react';
import './App.css';
import { useState } from 'react';
import Vender from './components/Vender/index';
import Start from './components/Employee/home';
import Finance from './components/FinanaceTeam/finance';
import MyApp from './components/Employee/Emp_home_new';
import Employee from './components/Employee/data/Employee';
import { SET_TOKEN ,GET_TOKEN,VALIDATE_TOKEN} from './components/Vender/data/Storage';
function App() {

  return (
    <div className="App"  >
      <Start/>
    </div>
  );
}



function FormValidation(props) {
  let [inputValue, setInputValue] = useState("");

  let updateInput = e => {
    setInputValue(e.target.value);
  };
 
  return (
    <div>{console.log("component reloading")}
      <form>
        <input type="text" value={inputValue} onChange={updateInput} />
      </form>
    </div>
  );
 }


export default App;
