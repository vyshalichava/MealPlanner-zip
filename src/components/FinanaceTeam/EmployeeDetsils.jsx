import React, { useReducer, useState } from 'react'
import { DateRangeInput } from '@datepicker-react/styled'
import '../Vender/css/App.css'
import { DownloadConfirm, DownloadError, InvalidUser } from '../Vender/SendNotificationConfirm';
import reactDom from "react-dom";
import Footer from './footer'

import MealDetails from './data/MealDetails';
import ForbiddenError from '../HomeFolder/ErrorHandler/ForbiddenError';
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
let pageNo= 1

export default function EmployeeDesils(props) {
  const [ downloadReport, closeDownloadReport ] = useState(false)
  const [state, dispatch] = useReducer(reducer, initialState)
  const [reload, doReload] = useState(false)
  const [_, doResetDates] = useReducer((x) => x + 1, 0);
  let [rowsPerPage, setRowsPerPage] = useState('');
  const [openDownloadErrorDialog, setOpenDownloadErrorDialog] = useState(false)
  let [START_DATE, setStartDate] = useState('');
  let [END_DATE, setEndDate] = useState('');
  let [data, setDate] = useState([]);
  let [sessionTimeOut, setSessionTimeOut] = useState(false)
  const [downloadError, raiseDownloadError] = useState(false)
  let [searchBy,setSearchBy]=useState("Employee id")

  let [pageSize,setPageSze]=useState(5)
  let [Users,setUsers]=useState([])



  function createRegularDateFormat(t, s) {
    let a = [{ year: 'numeric' }, { month: 'numeric' }, { day: 'numeric' }];
    function format(m) {
      let f = new Intl.DateTimeFormat('en', m);
      return f.format(t);
    }
    return a.map(format).join(s);
  }


  function start(startDate) {

    let date = createRegularDateFormat(startDate, '-');
    START_DATE = createRegularDateFormat(startDate, '-');

    //fetchData(START_DATE, START_DATE + 1,pageNo,pageSIze)
    let dateObj = startDate
    // if(date!=null){
    // if(DateArray[0]==undefined ){
    //   DateArray.push(date)
    // } else{
    //   DateArray[0]=date
    // }
    // showTableData(DateArray)
    // }

    return startDate
  }

  function download() {
    closeDownloadReport(true)

  }
    function fetchData(start, end,changeData) {
    MealDetails.getMealDates(start, end,pageNo,pageSize).then(Response => {
      console.log("status code ", Response.data)
      REPORTDETAILS = Response.data;
      Users= Response.data
      doReload(!reload)
      console.log("Something ",Users)
    }).catch(err => {
      console.log("Something went wrong",err.Response)
      //setSessionTimeOut(true)
     // reactDom.render(<ForbiddenError/>,document.getElementById("root"))
    })

  }

  function end(endDate) {
    ////console.log("end date selected")
    let date = createRegularDateFormat(endDate, '-');
    END_DATE = createRegularDateFormat(endDate, '-');
   // fetchData(START_DATE, END_DATE,pageNo,pageSIze)

    // if(date!=null){

    // if(DateArray[1]==undefined ){
    //         DateArray.push(date)
    //       } else{
    //         DateArray[1]=date
    //       }
    // ////console.log('s date',date)
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
      ////console.log("=====>"+DAYLIST)
      DAYLIST = DAYLIST.map((v) =>
        v.toISOString().slice(0, 10))

      ////console.log("/..",DAYLIST)
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
        //console.log('basic functions else block')
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
    console.log('chaning rows',value,REPORTDETAILS)
     {
      pageSize=value
      pageNo=1
      console.log('chaning rows',START_DATE,END_DATE)
      fetchData(START_DATE,END_DATE)
      
      startPage = 1;
      endPage = 10;
    }
    //console.log(rowsPerPage,'/././.'

  }
  function setPaging(totalRows) {
    if (totalRows <= 10) {
      rowsPerPage = totalRows
    } else {
      rowsPerPage = 10
    }
    startPage = 1
    endPage = 10
  }

  function search() {

   
    let searchData = document.getElementById('searchData').value
    searchBy=document.getElementById('searchBy').value
    if(searchData==''||searchData==undefined){
      REPORTDETAILS=Users
        doResetDates()
        return;
    }
    MealDetails.searchBy(START_DATE,END_DATE,searchBy,searchData).then(Response=>{
      console.log(Response.data,"???????????")

        REPORTDETAILS=Response.data

      
      doResetDates()
    }).catch(er=>{
      console.error("something went wrong while calling an api.Error ",er)
    })

   
   
    
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
    if (process.env.NODE_ENV == "development")console.log('next page')
    if (process.env.NODE_ENV == "development")console.log(pageNo)
    pageNo=pageNo+1
    if (process.env.NODE_ENV == "development")console.log(pageNo)
    fetchData(START_DATE,END_DATE,doResetDates)
    
  }

  doResetDates();
}

function forward() {
  if(REPORTDETAILS.length!=0){
    pageNo+=2
    fetchData(START_DATE,END_DATE,doResetDates)
  }
  if (process.env.NODE_ENV == "development")console.log('next page.next page')
}
  var number = 0;
  function sno() {
    number = number + 1
    return number
  }
  //create CSV file data in an array


  function closeDownloadError() {
    setOpenDownloadErrorDialog(false)
  }
  function closeDownload(){
    closeDownloadReport(false)
  }

  function selectSearchType(e){

  }
  function getTableData(){
    fetchData(START_DATE,END_DATE)
    
  }
  return (
    <>
      
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <div id='reportPage'>

        <br />
        <div style={{ float: 'left', marginTop: '5px' }}>
          <DateRangeInput class='dateRangeInput'
            onDatesChange={(data) => {
              if (process.env.NODE_ENV == "development")console.log("on Date change")
              fetchData(START_DATE, END_DATE)
              dispatch({ type: 'dateChange', payload: data })
            }}
            onFocusChange={focusedInput => dispatch({ type: 'focusChange', payload: focusedInput })}
            startDate={start(state.startDate)} // Date or null
            endDate={end(state.endDate)} // Date or null
            focusedInput={state.focusedInput} // START_DATE, END_DATE or null
          />
        </div>
        <button class="btn btn-primary pull-left" style={{ margin: "5px", marginTop:"10px" }} id="home" data-title="Home" onClick={getTableData}><span class="fa fa-file" ></span> Get Details</button>
        <button class="btn btn-primary pull-left" style={{ margin: "5px", marginTop:"10px" }} id="home" data-title="Home" onClick={reset}><span class="fa fa-refresh" ></span> Reset</button>


        <button type="submit" onClick={download} class="btn btn-primary pull-right" style={{ marginLeft: '5px', height: "30px", marginTop: '10px',marginLeft: '10px'  }} data-title="Signout" data-toggle="modal" data-target="#ssignout"><i class="fa fa-download"></i> Download Report</button>
             
             <button type="submit" onClick={search} class="btn btn-primary pull-right" style={{marginLeft:'5px' ,height:"30px", marginTop:'10px'}} data-title="Signout" data-toggle="modal" data-target="#ssignout"><i class="fa fa-search"></i></button>
             <input type="text" class="pull-right"id="searchData" style={{float:'left' , marginTop:'13px',marginLeft: '5px' }} name="search" />
             <select name="cars" id="searchBy" onChange={search} class="btn btn-primary pull-right" style={{ float: 'left', marginTop: '10px', marginLeft: '5px' }} onClick={selectSearchType}>
                               
                                <option value="EmployeeID">EmployeeID</option>
                                <option value="EmployeeName">Employee name</option>
                                <option value="EmployeeEmail">Employee email</option>
                            </select>
                  
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
                <th>Employee Id</th>
               
                <th>Employee Name</th>
                <th>Email</th>
                <th>Total number of meals</th>
                <th>Total  money</th>
              </tr>
            </thead>
            <DownloadConfirm open={downloadReport} error={REPORTDETAILS.length} closeWindow={closeDownload} report={REPORTDETAILS} startDate={START_DATE} endDate={END_DATE} />
            <tbody style={{ height: "300px" }}>
  
              {(REPORTDETAILS.length != 0) ?
                (
                  REPORTDETAILS.map(
                    eachDay =>
                      <tr>
                        <th scope="row">{eachDay[0]}</th>

                      
                        <td>{eachDay[1]}</td>
                        <td>{eachDay[2]}</td>
                        <td>{eachDay[3]}</td>
                        <td><span class="label label-info">Rs {eachDay[4]}</span></td>
                      </tr>
                  ))
                : <>
                  <p style={{ textAlign:'center' ,marginTop:'10%'}}>No data found</p>
                </>}
            </tbody>
          </table>
        </div>
        <hr />
        <InvalidUser open={sessionTimeOut} />

        <Footer selectRowsPerPage={selectRowsPerPage} rowsPerPage={rowsPerPage} startPage={startPage} data={data} backward={backward} previousPage={previousPage} pageNo={pageNo} nextPage={nextPage} forward={forward} />
      </div>
      {/* <DownloadError open={openDownloadErrorDialog} closeWindow={closeDownloadError} /> */}
    </>
  )
}



