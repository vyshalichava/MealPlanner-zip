import React, { useReducer, useState } from 'react'
import { DateRangeInput } from '@datepicker-react/styled'
import './css/App.css'
import { DownloadConfirm, DownloadError, InvalidUser } from './SendNotificationConfirm';
import EmployeeMealDetails from './EmployeeMealDetails';
import Footer from './footer'

import MealDetails from './data/MealDetails';
import reactDom from 'react-dom';
import InternalServerError from '../HomeFolder/ErrorHandler/InternalServerError';
var firstTime = true;
var DateArray = []
var TotalDates = []
var TABLEHIDE = 'none'
//Convert from array to object
let DAYLIST = []
let resetStartDate = false;
let resetEndDate = false
let HOLIDAYS = ['2021-09-08']
var REPORTDETAILS = []
var data = []
let startPage = 1;
let endPage = 10;
var weekdays = new Array(7);
weekdays[0] = "Saturday";
weekdays[1] = "Sunday";
weekdays[2] = "Monday";
weekdays[3] = "Tuesday";
weekdays[4] = "Wednesday";
weekdays[5] = "Thursday";
weekdays[6] = "Friday";

const initialState = {
  startDate: null,
  endDate: null,
  focusedInput: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'focusChange':
      return { ...state, focusedInput: action.payload }
    case 'dateChange':
      return action.payload
    default:
      throw new Error()
  }
}
let pageNo=1;
export default function Report(props) {
  const { downloadReport, closeDownloadReport } = props
  const [state, dispatch] = useReducer(reducer, initialState)
  const [reload, doReload] = useState(false)
  const [_, doResetDates] = useReducer((x) => x + 1, 0);

  const [openDownloadErrorDialog, setOpenDownloadErrorDialog] = useState(false)
  let [START_DATE, setStartDate] = useState('');
  let [END_DATE, setEndDate] = useState('');
  let [data, setDate] = useState([]);
  let [sessionTimeOut, setSessionTimeOut] = useState(false);
  const [downloadError, raiseDownloadError] = useState(false);
  let [rowsPerPage, setRowsPerPage] = useState('');
  let [pageSize,setPageSize]=useState(5);


  function createRegularDateFormat(t, s) {
    let a = [{ year: 'numeric' }, { month: 'numeric' }, { day: 'numeric' }];
    function format(m) {
      let f = new Intl.DateTimeFormat('en', m);
      return f.format(t);
    }
    return a.map(format).join(s);
  }


  function start(startDate) {
    START_DATE = createRegularDateFormat(startDate, '-');
    return startDate
  }

  function download() {
    if (REPORTDETAILS.length != 0) {
      raiseDownloadError(true)
    }

  }
  function fetchData(start, end,callback) {
    MealDetails.getMealDates(start, end,pageNo,pageSize).then(Response => {
      
      console.log("status code ", Response.data)
      REPORTDETAILS = Response.data;
      if(callback!=undefined && callback!=""){
        callback()
      }
    }).catch(err => {
      if(err.response.status==403){
        console.log("Something went wrong ",err.response.status)
        setSessionTimeOut(true)
      }
      else if(err.response.status==500){
        reactDom.render(<InternalServerError/>,document.getElementById("root"))
      }else{

      }
      
    })

  }

  function end(endDate) {
    //console.log("end date selected")
    let date = createRegularDateFormat(endDate, '-');
    END_DATE = createRegularDateFormat(endDate, '-');
    //fetchData(START_DATE, END_DATE,pageNo,pageSize)

    // if(date!=null){

    // if(DateArray[1]==undefined ){
    //         DateArray.push(date)
    //       } else{
    //         DateArray[1]=date
    //       }
    // //console.log('s date',date)
    // showTableData(DateArray)
    // }
    return endDate
  }

  var getDaysArray = function (start, end) {
    for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
      arr.push(new Date(dt));
    }
    return arr;
  };


  function showTableData(DateArray) {
    let start = -1
    let end = start
    if (DateArray.length != undefined) {
      if (DateArray.length == 1) {
        start = 0
        end = start
      } else if (DateArray.length == 2) {
        start = 0
        end = start + 1
      }
      DAYLIST = getDaysArray(new Date(DateArray[start]), new Date(DateArray[end]))

      var DAYS = DAYLIST.map(day => day.toString().split(' ')[0])
      //console.log("=====>"+DAYLIST)
      DAYLIST = DAYLIST.map((v) =>
        v.toISOString().slice(0, 10))

      //console.log("/..",DAYLIST)
      data = []
      let veg = 0
      let nonVeg = veg
      for (let meals = 0; meals < DAYS.length - 1; meals++) {
        veg = Math.floor(Math.random() * 100)
        nonVeg = Math.floor(Math.random() * 100)

        if ('Sat' == DAYS[meals] || 'Sun' == DAYS[meals] || HOLIDAYS.find(day => day == DAYLIST[meals + 1]) != undefined) {
          continue
        }
        data.push([(DAYLIST[meals + 1]), DAYS[meals], veg, nonVeg, (nonVeg + veg)])
      }
      TABLEHIDE = 'block'
      if (firstTime == true) {
        if (data.length != 0) {
          if (data.length <= 10) {
            rowsPerPage = data.length
          } else {
            rowsPerPage = 10
          }
          //REPORTDETAILS=data.slice(0,rowsPerPage)
          startPage = 1;
          endPage = rowsPerPage;
        }
      } else {
        console.log('basic functions else block')
      }
    }
  }

  function reset() {
    REPORTDETAILS = []
    state.startDate = ''
    state.endDate = ''
    doResetDates();
  }

  function selectRowsPerPage(value) {
    firstTime = false
    console.log('chaning rows',value)
    if (REPORTDETAILS.length != 0) {
      pageSize=value
      pageNo=1
      console.log('chaning rows',START_DATE,END_DATE)
      fetchData(START_DATE,END_DATE,doResetDates)
      REPORTDETAILS = data.slice(-data.length, rowsPerPage - data.length)
      startPage = 1;
      endPage = 10;
    }
    //console.log(rowsPerPage,'/././.'

  }
 

  


  function previousPage() {
    if(pageNo-1>0){
      pageNo-=1
      fetchData(START_DATE,END_DATE,doResetDates)
    }
    console.log('backword')
  }



  function backward() {
    console.log('previous page')
    if(pageNo-2>0){
      pageNo-=2
      fetchData(START_DATE,END_DATE,doResetDates)
    }
    else if(pageNo-1>0){
      pageNo-=1
      fetchData(START_DATE,END_DATE,doResetDates)
    }else{

    }
  }

  function nextPage() {
    
    if(REPORTDETAILS.length!=0){
      console.log('next page')
      console.log(pageNo)
      pageNo=pageNo+1
      console.log(pageNo)
      fetchData(START_DATE,END_DATE,doResetDates)
      
    }

    doResetDates();
  }

  function forward() {
    if(REPORTDETAILS.length!=0){
      pageNo+=2
      fetchData(START_DATE,END_DATE,doResetDates)

    }
    console.log('next page.next page')
  }
  var number = 0;
  function sno() {
    number = number + 1
    return number
  }
  //create CSV file data in an array
function getTableData(){
  fetchData(START_DATE, END_DATE,doResetDates)
  
}

  function closeDownloadError() {
    setOpenDownloadErrorDialog(false)
  }
  return (
    <>
      {console.log('html is loading', REPORTDETAILS.length)}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <div id='reportPage'>

        <br />
        <div style={{ float: 'left', marginTop: '5px' }}>
          <DateRangeInput class='dateRangeInput'
            onDatesChange={(data) => {
              console.log("on Date change")
              fetchData(START_DATE, END_DATE)
              dispatch({ type: 'dateChange', payload: data })
            }}
            onFocusChange={focusedInput => dispatch({ type: 'focusChange', payload: focusedInput })}
            startDate={start(state.startDate)} // Date or null
            endDate={end(state.endDate)} // Date or null
            focusedInput={state.focusedInput} // START_DATE, END_DATE or null
          />
        </div>
        <button class="btn btn-primary pull-left" style={{ margin: "5px" }} id="home" data-title="Home" onClick={getTableData}><span class="fa fa-file" ></span> Get Details</button>
        <button class="btn btn-primary pull-left" style={{ margin: "5px" }} id="home" data-title="Home" onClick={reset}><span class="fa fa-refresh" ></span> Reset</button>


      </div>
      <br />
      <br />
      <div class="pull-right">
      </div>
      <div >
        <div >

          <table class="table" id="mealsTable"  >
            <thead>
              <tr>
                <th>Date</th>
                <th>Day</th>
                <th>Vegetarian</th>
                <th>Non-Vegetarian</th>
                <th>Total number of meals</th>
              </tr>
            </thead>
            <DownloadConfirm open={downloadReport} error={REPORTDETAILS.length} closeWindow={closeDownloadReport} report={REPORTDETAILS} startDate={START_DATE} endDate={END_DATE} type={"vendor"} />
            
            <tbody style={{ height: "300px" }}>{console.log(REPORTDETAILS, 'last lins')}

              {(REPORTDETAILS.length != 0) ?
                (
                  REPORTDETAILS.map(
                    eachDay =>
                      <tr>
                        <th scope="row">{eachDay[0].slice(0, 10)}</th>

                        <td>{weekdays[new Date(eachDay[0]).getDay()]}</td>
                        <td>{eachDay[1]}</td>
                        <td>{eachDay[2]}</td>
                        <td><span class="label label-info">{eachDay[3]}</span></td>
                      </tr>
                  ))
                : <>
                  <p style={{ width: '100%', marginTop: '10%' ,marginLeft:'45%'}}>No data found</p>
                </>}
            </tbody>
          </table>
        </div>
        <hr />
        {console.log(sessionTimeOut)}
        <InvalidUser open={sessionTimeOut} />

        <Footer selectRowsPerPage={selectRowsPerPage} rowsPerPage={rowsPerPage} startPage={startPage} data={data} backward={backward} previousPage={previousPage} nextPage={nextPage} forward={forward} pageNo={pageNo} />
      </div>
      {/* <DownloadError open={openDownloadErrorDialog} closeWindow={closeDownloadError} /> */}
    </>
  )
}
