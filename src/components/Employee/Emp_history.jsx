import React, {useReducer, useState} from 'react'
import {DateRangeInput} from '@datepicker-react/styled'
import './css/empHomecss.css'
import Start from './home';
import MyApp from './Emp_home_new';
import ReactDOM from 'react-dom';
import MealDetails from './data/MealDetails';
import {  InvalidUser } from '../Vender/SendNotificationConfirm';
import Footer from '../Vender/footer';
//import EmployeeMealDetails from './EmployeeMealDetails';



var DateArray=[]
var TotalDates=[]
var TABLEHIDE='none'
//Convert from array to object
let DAYLIST=[]
let resetStartDate=false;
let resetEndDate=false
var weekdays = new Array(7);
weekdays[0] = "Saturday";
weekdays[1] = "Sunday";
weekdays[2] = "Monday";
weekdays[3] = "Tuesday";
weekdays[4] = "Wednesday";
weekdays[5] = "Thursday";
weekdays[6] = "Friday";
let START_DATE="";
let END_DATE="";
let pageNo=1;

const initialState = {
  startDate: null,
  endDate: null,
  focusedInput: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'focusChange':
      return {...state, focusedInput: action.payload}
    case 'dateChange':
      return action.payload
    default:
      throw new Error()
  }
}

export default function Hist (props) {

  const [state, dispatch] = useReducer(reducer, initialState)
  const [doReset,startDoingReset]=useState([])
  const [_, doResetDates] = useReducer((x) => x + 1, 0);
  const [reload, doReload] = useState(false)
  const [sessionTimeOut,setSessionTimeOut]=useState(false);
  let [pageSize,setPageSize]=useState(5);

    function createRegularDateFormat(t, s) {
      let a = [{month: 'numeric'},{day: 'numeric'},  {year: 'numeric'}];
      function format(m) {
         let f = new Intl.DateTimeFormat('en', m);
         return f.format(t);
      }
      return a.map(format).join(s);
   }

   function createIrregularDateFormat(t, s) {
    let a = [  {year: 'numeric'},{month: 'numeric'},{day: 'numeric'}];
    function format(m) {
       let f = new Intl.DateTimeFormat('en', m);
       return f.format(t);
    }
    return a.map(format).join(s);
 }
 START_DATE='';
  function start(startDate){
    let date = createRegularDateFormat(startDate, '-');
    //console.log('date is start ',date,typeof startDate)
      let dateObj=startDate
       START_DATE=createIrregularDateFormat(startDate, '-');
       console.log(START_DATE)
      if(date!=null){
        // MealDetails.getHistory(START,START+1).then(
        //   Response=>{
     
        //     DAYLIST=Response.data
        //   }
        // ).catch(err=>{
        //   console.error("something went wrong ",err)
        // })
      // let startDateArray=dateObj.getUTCFullYear()+'-'+ (dateObj.getUTCMonth())  +'-'+ (dateObj.getUTCDate()) 

      // if(DateArray[0]==undefined ){
      //   DateArray.push(date)
      // } else{
      //   DateArray[0]=date
      // }
      // //console.log('start date',date,DateArray)
      // showTableData(DateArray)
      }
      
    return startDate
  }



  function end(endDate){
    if (process.env.NODE_ENV == "development")console.log("end date selected")
    let date = createRegularDateFormat(endDate, '-');
    END_DATE=createIrregularDateFormat(endDate, '-');
      if(date!=null){
      // let startDateArray=dateObj.getUTCFullYear()+'-'+ (dateObj.getUTCMonth())  +'-'+ (dateObj.getUTCDate()) 
      // MealDetails.getHistory(START,END).then(
      //   Response=>{
      //     DAYLIST=Response.data
      //    console.log(Response.data)
      //   }
      // ).catch(err=>{
      //   console.error("something went wrong ",err)
      // })
      // if(DateArray[1]==undefined ){
      //         DateArray.push(date)
      //       } else{
      //         DateArray[1]=date
      //       }
      // //console.log('s date',date)
      // showTableData(DateArray)
      }
 

    //resetAllDates=false
    // if(resetStartDate=='reset'){
    //   resetStartDate='load'
    //   return;
    // }else{
      
    //   let dateObj=endDate
    //   if(dateObj!=null ){
    //     let endDateArray=dateObj.getUTCFullYear()+'-'+ (dateObj.getUTCMonth()+1)  +'-'+ (dateObj.getUTCDate()+1)
    //     if(DateArray[1]==undefined ){
    //       DateArray.push(endDateArray)
    //     } else{
    //       DateArray[1]=endDateArray
    //     } 
    //     showTableData(DateArray)
    //   }
      return endDate
    
  
     
  }

  function fetchData(){
    console.log(START_DATE,END_DATE,pageNo,pageSize)
    MealDetails.getHistory(START_DATE,END_DATE,pageNo,pageSize).then(
    Response=>{
      DAYLIST=Response.data
     if (process.env.NODE_ENV == "development")console.log(Response.data)
     doReload(!reload)
    }
  ).catch(err=>{
    console.error("something went wrong ",err)
    setSessionTimeOut(true)
  })
 }

  var getDaysArray = function(start, end) {
    for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr;
};


  function showTableData(DateArray){
    let start=-1
    let end=start
    if(DateArray.length!=undefined )
    {
      if(DateArray.length==1){
        start=0
        end=start
      }else if(DateArray.length==2){
        start=0
        end=start+1
      }
      DAYLIST =getDaysArray(new Date(DateArray[start]),new Date(DateArray[end]))
      //console.log(DAYLIST)
      var DAYS=DAYLIST.map(day=>day.toString().split(' ')[0])
      DAYLIST=DAYLIST.map((v)=>v.toISOString().slice(0,10)).join(",")
      DAYLIST=DAYLIST.split(',')
      //console.log("/..",DAYLIST)
    
      var data=[]
      let veg=0
      let nonVeg=veg
      for (let meals = 0; meals< DAYS.length-1;meals++){
          veg=Math.floor(Math.random() * 100)
          nonVeg=Math.floor(Math.random() * 100)
          if('Sat'==DAYS[meals] ||'Sun'==DAYS[meals]){
            continue
          }
        data.push([DAYLIST[meals+1],DAYS[meals],veg,nonVeg,(nonVeg+veg)])
      }
      DAYLIST=data
      TABLEHIDE='block'
     // console.log("List of dates..",DAYLIST)
      
    }
  }

  function reset(){
    DAYLIST=[]
    state.startDate=''
    state.endDate=''
    doResetDates();
    
  }

  // () => {
  //   const [startDate, setStartDate] = useState(new Date());
  //   return (
  //     <DatePicker
  //       selected={startDate}
  //       onChange={(date) => setStartDate(date)}
  //       excludeDates={[new Date(), subDays(new Date(), 1)]}
  //       placeholderText="Select a date other than today or yesterday"
  //     />
  //   );
  // };
  function goToStart(){
    ReactDOM.render(<Start/>,document.getElementById("root"))
 }
 
function goToHome(){
  ReactDOM.render(<MyApp empId={localStorage.getItem('empId')}  />,document.getElementById("root"))
}
  function search(){
   
  }

  function selectRowsPerPage(value) {
    
    console.log('chaning rows',value)
    if (DAYLIST.length != 0) {
      pageSize=value
      pageNo=1
      console.log('chaning rows',START_DATE,END_DATE)
      fetchData()
     
  
    }
    //console.log(rowsPerPage,'/././.'

  }
 

  


  function previousPage() {
    if(pageNo-1>0){
      pageNo-=1
      fetchData()
    }
    console.log('backword')
  }



  function backward() {
    console.log('previous page')
    if(pageNo-2>0){
      pageNo-=2
      fetchData()
    }
    else if(pageNo-1>0){
      pageNo-=1
      fetchData()
    }else{

    }
  }

  function nextPage() {
    
    if(DAYLIST.length!=0){
      console.log('next page')
      console.log(pageNo)
      pageNo=pageNo+1
      console.log(pageNo)
      fetchData()
      
    }

    doResetDates();
  }

  function forward() {
    if(DAYLIST.length!=0){
      pageNo+=2
      fetchData()

    }
    console.log('next page.next page')
  }
  
  return (
      <>
      
      <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="StyleSheet.css" rel="stylesheet" type="text/css" media="only screen" />
        <link href="MobileStyleSheet.css" rel="stylesheet" type="text/css" media="only screen and (max-device-width: 480px) , only screen and (-webkit-min-device-pixel-ratio: 2) , screen and (-webkit-device-pixel-ratio:1.5)" />
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js" />
        <script src="//code.jquery.com/jquery-1.11.1.min.js" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
        
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"/>
        <script src="//code.jquery.com/jquery-1.11.1.min.js"/>
    
        <div class="panel panel-default work-progress-table">
        <div class="panel-heading" style={{ textAlign: "center", fontSize: "30px", height: '10%' }}>MEAL PLANNER
        <div>
          <button onClick={goToHome}  class ="btn btn-primary pull-right" style={{marginLeft:'3px',marginRight:"3px"}}  ><i class="fa fa-arrow-left"> Back</i></button> 
          </div>
      </div>
        
      <div id='reportPage' >
      <p style={{marginRight:"800px"}}>Please select start date and end date to view your history</p>
      <br/>
      <div style={{float:'left'}}>
      <DateRangeInput class='dateRangeInput' 
        
          onDatesChange={(data) =>dispatch({type: 'dateChange', payload: data})}
          onFocusChange={focusedInput => dispatch({type: 'focusChange', payload: focusedInput})}
          startDate={start(state.startDate)} // Date or null
          endDate={end(state.endDate)} // Date or null
          focusedInput={state.focusedInput} // START_DATE, END_DATE or null
          />

        
      </div>
      <button class="btn btn-primary pull-left" style={{ margin: "5px" }} id="home" data-title="Home" onClick={fetchData}
           
      ><span class="fa fa-file" ></span> Get Details</button>
          <button class="btn btn-primary pull-left" style={{margin:"5px"}} id="home" data-title="Home" onClick={reset}><span class="fa fa-refresh" ></span> Reset</button>
    </div>
    <br/>
    <br/>
    <div class ="pull-right">
       {/* <input type="text" id="searchData" style={{ float: 'left', marginTop: '5px' }} placeholder="Search by date" name="search" /> */}

          {/* <button type="submit" onClick={search} class="btn btn-primary pull-left" style={{ marginLeft: '5px', height: "30px", marginTop: '5px' }} data-title="Signout" data-toggle="modal" data-target="#ssignout"><i class="fa fa-search"></i></button> */}
          </div>
    <div >
    <div style={{ height:'25%'}}>
      
    <table class="table" id="mealsTable"  style={{border:"1px" , paddingTop: "2px" , height:'25%'}} >
    <thead>
      <tr>
        <th>Date</th>
        <th>Day</th>
        <th>Meal Status</th>
        <th>Veg/Non-veg</th>
        
      </tr>
    </thead> 
        <tbody  style={{ height: "300px" }}>
          {DAYLIST.length!=0?      
                  DAYLIST.map(
                    eachDay=>
                <tr>
                    <th scope="row">{eachDay[0].slice(0, 10)}</th>
                   
                    <td >{weekdays[new Date(eachDay[0]).getDay()]}</td>
                    <td >{eachDay[1]==true?<span class="label label-success">Taken</span>:<span class="label label-danger">Skipped</span>}</td>
                    <td>{eachDay[2]==true?"veg":"non-veg"}</td>
                    
                   
                </tr>
                    )
                
                :<>
                <p style={{ width: '10%', marginTop: '10%' ,marginLeft:'45%'}}>No data found</p>
                </>}
            </tbody>
  </table>
  </div>
        </div>
        
        </div>
     
        <InvalidUser open={sessionTimeOut}  />
        <Footer selectRowsPerPage={selectRowsPerPage}  backward={backward} previousPage={previousPage} nextPage={nextPage} forward={forward} pageNo={pageNo} />
    </>
  )
}
