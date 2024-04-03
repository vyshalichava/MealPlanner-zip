import React,{ useState }  from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
//import './index.css';
//import App from './App';
//import reportWebVitals from './reportWebVitals';
import Calendar from 'react-calendar';
var dates = []

// function handler(e){
//   console.log("in handler")
//   var date = new Date();
//   var tdate = date.getDate();
//   var month = date.getMonth() +1;
//   var year = date.getUTCFullYear() - 0; 
//   if(month < 10){
//     month = "0" + month 
//   }
//   if(tdate < 10){
//     tdate = "0" + tdate;
//   }
//   var maxDate = year + "-" + month + "-" + tdate;
//   dates.push(e.target.value)
//   document.getElementById("demo1").setAttribute("min", maxDate);
//   console.log(dates)
//   // let object={
//   //   'dates':dates,
//   //   'emplpoyessId':USERID
//   // }
// // submitDattes(object)
// }

const ReactCalendar = () => {
  const [date , setDate] = useState(new Date())
 
 const onChange = date => {
   setDate(date);
 }
  return (
    
 <div  >
   <Calendar selectRange  onChange={onChange} value={date}  minDate={new Date()}  id = "demo1"/>
   {console.log(date)} 
    {date.toString()}
  </div>
  
  );
};

ReactDOM.render(<ReactCalendar />, document.querySelector('#root'));

export default ReactCalendar;
