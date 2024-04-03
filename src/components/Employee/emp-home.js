import React,{ useState }  from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
//import './index.css';
//import App from './App';
//import reportWebVitals from './reportWebVitals';
import Calendar from 'react-calendar';

//import 'react-date-range/dist/styles.css'; 
//import 'react-date-range/dist/theme/default.css';
//import { DateRangePicker } from 'react-date-range';
//import {DateRangeInput} from '@datepicker-react/styled'
//import { addDays } from 'date-fns';

//import { useState } from 'react';

// const ReactCalendar = () => {
// const [state, setState] = useState({
//   selection: {
//     startDate: new Date(),
//     endDate: null,
//     key: 'selection'
//   },
//   compare: {
//     startDate: new Date(),
//     endDate: addDays(new Date(), 3),
//     key: 'compare'
//   }
// });



const ReactCalendar = () => {
  const [date , setDate] = useState(new Date())
 
 const onChange = date => {
   setDate(date);
 }
  return (
    
 <div>
   <Calendar selectRange  onChange={onChange} value={date} />
   {console.log(date)} 
    {date.toString()}
    
     

    
  </div>
  
  );
};

ReactDOM.render(<ReactCalendar />, document.querySelector('#root'));

export default ReactCalendar;


// ReactDOM.render(
//   <h1>my prog</h1>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
 //reportWebVitals();
