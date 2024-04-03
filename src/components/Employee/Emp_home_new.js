import React, { useState, useCallback, useReducer } from 'react';
import Calendar from 'react-calendar';
import ReactDOM from 'react-dom';
import 'react-calendar/dist/Calendar.css';
import Start from './home';
import Hist from './Emp_history';
import './css/empHomecss.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Employee from './data/Employee';
import { SET_TOKEN } from '../Vender/data/Storage';
import MealDetails from './data/MealDetails';
import { dateSingleInputPhrases } from '@datepicker-react/styled';
import { Notifications } from '@material-ui/icons';
import { each } from 'jquery';

toast.configure();

var prevoiusdatesforcancel =[]
// =
//     [
//       ["2021-10-01" ,'veg'],
//       ["2021-10-04",'nonveg'],
//       ["2021-10-06",'nonveg'],
//       ["2021-10-07",'veg'],
      
//     ]

var selectedDatesList = []
// [
  
//   ["2021-9-30", 'nonveg'],
//   ["2021-10-3", 'veg'],
//   ["2021-10-5", 'nonveg'],
//   ["2021-10-6", 'veg'],

// ]

var TABLE_HIDE = 'none';
var btn_hide = 'none';
var datesArray=[];
var dates = []
var typeOfMeal;
var subnv = false;
var subveg = false;
var enable = false;
var deleteddates = [];
var datespulsmealtype = []
var datesmealtype2d = []
var duplicate = []
var empHistData 



export default function MyApp(props) {
  var meal_subscribed
  const { empId, token } = props;
  //const { empId, meal_subscribed, token } = props;
  const [value, onChange] = useState(false);
  var [dates2, setDates] = useState([])
  const [reload, doReload] = useReducer((x) => x + 1, 0)
  //var [selectedDatesList,setSelectDatesList]=useState([])
  const [SELECTED_MEAL_DATES_HIDE, setSelectedMealDatesHide] = useState('none')
  const [notifmessage, setMessage] = useState();
  const[notifdate, setNotifdate] = useState();
  const[msgs,setMsgs] = useState([])
  const [showCalendar, setShowCalendar] = useState(true);
  

  function goToEmphist() {

    ReactDOM.render(<Hist />, document.getElementById("root"))
  }


  function goToStart() {
    localStorage.clear()
    localStorage.setItem('validUser', 'false')
    ReactDOM.render(<Start />, document.getElementById("root"))
  }

//   function comparedisp(datesmealtype2d){
    
//     for(var i = 0; i< selectedDatesList.length; i++){
//       for(var j=0 ; j< datesmealtype2d.length; j++){
//       if(datesmealtype2d[j][0] == selectedDatesList[i][0]){
//         datesmealtype2d[j][1] = selectedDatesList[i][1] 
//         if(datesmealtype2d[j][1] == 'veg')
//         console.log(datesmealtype2d[j][0]+"veg")
//         document.getElementById(datesmealtype2d[j][0]+"veg").checked = true
//       }
//       else if(datesmealtype2d[j][1] == 'non-veg'){
//         console.log(datesmealtype2d[j][0]+"nonveg")
//         document.getElementById(datesmealtype2d[j][0]+"nonveg").checked = true
//       }
//       else{
//         datesmealtype2d[j][1] = null
//       }
//    }
   
// }

//   }
  
  

// function insertdatemealtype(duplicate,comparedisp){
//   console.log("duplicate insertdatemealtype",typeof duplicate)
//     for(var i=0;i<duplicate.length;i++){
//       console.log("duplicate[i]", duplicate[i].slice(0,10))
//        datesmealtype2d.push([duplicate[i].slice(0,10),duplicate[i].slice(10,)])
//        //console.log("datesmealtype2d[i][0]",datesmealtype2d)
//        //datesmealtype2d[i][0] = duplicate[i].slice(0,10)
//       // datesmealtype2d[i][1] = duplicate[i].slice(11,14)
       
//     }
//     console.log("datesmealtype2d",datesmealtype2d)
//     console.log("datesmealtype2d,selectedDatesList start",datesmealtype2d,selectedDatesList)
//     comparedisp(datesmealtype2d)
//   }


  // function goToNotify() {
  //   document.getElementById("myFormNotif").style.display = "block";
  // }


  function closeFormNotif() {
    document.getElementById("myFormNotif").style.display = "none";
  }


function getDetails(e){
  
  var n = e.target.id
  console.error("e.target",e.target.id)
  datespulsmealtype.push(n)
  var date=e.target.id
  date=e.target.id.slice(0,10)

  var mealtype = e.target.id.slice(10,)

  if(e.target.id.includes('nonveg') ){
    
  if(e.target.checked){

    document.getElementById(date+'nonveg').disabled=false
    document.getElementById(date+'veg').checked=false
    document.getElementById(date+'veg').disabled=true
    }else{

     document.getElementById(date+'veg').disabled=false
      document.getElementById(date+'nonveg').checked=false
    }

  }else{

    if(e.target.checked){

  
      document.getElementById(date+'veg').disabled=false
      document.getElementById(date+'nonveg').checked=false
       document.getElementById(date+'nonveg').disabled=true
    }else{

       document.getElementById(date+'nonveg').disabled=false
       document.getElementById(date+'veg').disabled=false

      }

  }
}




function subscribed(e){
  //var type = document.getElementById("veg").value
  //console.log("clicked veg/nonveg")
  
  enable = true
  ////console.log("enable set to true",enable)
  goToSubs();
  typeOfMeal = e.target.id
  //console.log("typeOfMeal....",typeOfMeal)
  ////console.log(e.target.id)
  if(e.target.id.includes('nonveg') ){
    if(e.target.checked){
      document.getElementById('nonveg').disabled=false
        document.getElementById('veg').disabled=true
      }else{
        document.getElementById('veg').disabled=false
        document.getElementById('nonveg').disabled=false
      }

    } else {
      if (e.target.checked) {
        document.getElementById('nonveg').disabled = true
        document.getElementById('veg').disabled = false
      } else {
        document.getElementById('veg').disabled = false
        document.getElementById('nonveg').disabled = false

      }
      goToSubs();
    }

  }


  function finalSubsciption() {
    closeForm1();
    //alert("subscribed for "+typeOfMeal+" successfully")
    if (typeOfMeal == 'nonveg') {
      subnv = true
      console.log("making subnv true")
    }
    if (typeOfMeal == 'veg') {
      subveg = true
      console.log("making subveg true")
    }

    document.getElementById("subinheader").disabled = true;
    toast.success(
      "subscribed for " + typeOfMeal + " successfully",
      {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER
      }
    )
    updatemeal(typeOfMeal)

  }


var getDaysArray = function (start, end) {
  for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
    //console.log("checking for days",dt.getDay())
    if (0 == dt.getDay() || 6 == dt.getDay())
      continue
    arr.push(new Date(dt));
  }
  return arr;
};



var index
function goToDel(e) {
  console.log("onclickkkkk", e.target.parentNode.id)
  //document.getElementById(e.target.id)
  //console.log(e.target.parentNode.parentNode)
  var a = e.target.parentNode.id
  var getdate = a.slice(0, 10)
  console.log(getdate)
  console.log("dates2",dates2)
  for(var i = 0;i<dates2.length;i++){
    if(getdate == dates2[i][0]){
      console.log(i)
      index = i
    }
  }
  //index = dates2.indexOf(getdate)
  console.log("checking index",getdate,index)


  //console.log("deleted delete and index ",getdate,index,dates2)

  dates2.splice(index, 1)
  
  
  console.log("dates after deleting ",dates2)
  var i = e.target.parentNode.parentNode.parentNode.rowIndex;
  //document.getElementById("mealsTable").deleteRow(i);
  //e.target.parentNode.parentNode.parentNode.style.display="none"
  //console.log("datesarray ",dates2)
  doReload();
}


  function createRegularDateFormat(arr1) {
    var d
  
        d = new Date(arr1)
        var day = d.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        var month = d.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        var year = d.getFullYear();
       return year + "-" + month + "-" + day
        //console.log("string date in date format ",year + "-" + month + "-" + day)
        //console.log("datespulsmealtype[i]",datespulsmealtype.replace(datespulsmealtype[i].slice(0,11),year + "-" + month + "-" + day))
    }

    function goToSubs() {
      console.log("in subs")
      let pro='vikas'
        Employee.checkMealSubscription().then((Response)=>{
          console.log(Response.data);
          if(Response.data!=null && Response.data!=undefined &&Response.data!=''){

    
          meal_subscribed=Response.data
          console.log("meal_subscribed",meal_subscribed[0][1])
          pro='vyshali'
          //console.log("meal_subscribed",meal_subscribed[0][0])
          if (meal_subscribed[0][0] == true) {
              document.getElementById("myprofile").style.display = "none";
              document.getElementById("myFormNotif").style.display = "none";
              toast.info(
                "Subscribed!",
                {
                  autoClose: 1500,
                  position: toast.POSITION.TOP_CENTER
                }
              )
              return
            }
            else{
              if (enable) {
                document.getElementById("proceedtosub").disabled = false;
              }
              else {
                //console.log("not subscribed and proceedtosub is not disabled")
                document.getElementById("proceedtosub").disabled = true;
              }
             
              document.getElementById("sub").style.display = "block";
              document.getElementById("myprofile").style.display = "none";
              document.getElementById("myFormNotif").style.display = "none";

            }
            //console.log("meal_subscribed 324",meal_subscribed[0][1])
           
      //goToTable(meal_subscribed[0][1])
          }else{
            console.log('wrong status....')
          }
       })
    
  }

  function closeFormprofile() {
    document.getElementById("myprofile").style.display = "none";
  }

  function closeForm1() {
    document.getElementById("sub").style.display = "none";
  }

function goToprofile(){
  document.getElementById("myprofile").style.display = "block";
  document.getElementById("myFormNotif").style.display = "none";
  document.getElementById("sub").style.display = "none";
}


function getTodaysDate() {
  var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
console.log("printing todays date ..",today)
return today = yyyy + '-' + mm + '-' + dd;
}

const [date , setDate] = useState(new Date()) 
const onChangeDate = date => {
  setDate(date);

  datesArray = getDaysArray(date[0], date[1])
  var newdate = date.toString()
  var tempDatesArray=[]
  var arr1 = newdate.split(' ');
  for (let i = 0; i < datesArray.length; i++) {

   // console.log("STRING CONVERSION",createRegularDateFormat(datesArray[i],'-'))
    tempDatesArray.push([ createRegularDateFormat(datesArray[i])])
  }
  datesArray=tempDatesArray
  
  var now = getTodaysDate()
  console.log("todays date",now.toString(),"type",typeof now)
  console.log("datesArray",datesArray)
 //var nn = createRegularDateFormat(d.getDate())
 if(datesArray.length!=0 ){

 
 console.log("datesArray.includes(['2021-07-10'])",datesArray[0].includes(now))
 console.log(datesArray)
  if( datesArray[0].includes(now.toString())){
    datesArray.shift()
    // var inf = datesArray.indexOf(now) 
    // datesArray.splice(inf,1)
    console.log("after removing",datesArray)
  }
}
  
}


// function createRegularDateFormat(t, s) {
//   let a = [{ year: 'numeric' }, { month: 'numeric' }, { day: 'numeric' }];
//   function format(m) {
//     let f = new Intl.DateTimeFormat('en', m);
//     return f.format(t);
//   }
//   return a.map(format).join(s);
// }


  const today1 = new Date()
  const tomorrow = new Date(today1)
  tomorrow.setDate(tomorrow.getDate() + 1)




  function init() {
    document.getElementById("subinheader").disabled = meal_subscribed
  }

var selectedmealtype

  function goToTable() {
    console.log("in table",dates2)
    console.log(dates2)
    var currentSelectedDatesList
    document.getElementById("myprofile").style.display = 'none'
    document.getElementById("myFormNotif").style.display = 'none'
    Employee.checkMealSubscription().then((Response)=>{
      console.log(Response.status);
      if(Response.data!='' &&Response.data!=undefined && Response.data.length!=0){
        meal_subscribed=Response.data
      
        selectedmealtype = meal_subscribed[0][1]
        MealDetails.getSelectedDates(empId).then(Response=>{
          console.log("Fetching the selected mealdates",Response.status);
          if(Response.status==200){
            console.log(Response.data,'from api');
            prevoiusdatesforcancel =Response.data;
            if(!meal_subscribed[0][0]) {
              toast.error(
                "Please Subscribe!",
                {
                  autoClose: 2000,
                  position: toast.POSITION.TOP_CENTER
                }
              )
              return
              
            }
            setSelectedMealDatesHide('block')
          
            for(var eachDay=0;eachDay<prevoiusdatesforcancel.length;eachDay++){
              if(!prevoiusdatesforcancel[eachDay][1]){
                prevoiusdatesforcancel[eachDay][1]='nonveg'
              }else{
                prevoiusdatesforcancel[eachDay][1]='veg'
              }
            }
    
            
        console.log(prevoiusdatesforcancel,'///../',datesArray)
        selectedDatesList=prevoiusdatesforcancel
        currentSelectedDatesList=datesArray
        for(var previouslySelectedDate=0;previouslySelectedDate<selectedDatesList.length;previouslySelectedDate++){
          for(var currentSelectedDate=0;currentSelectedDate<currentSelectedDatesList.length;currentSelectedDate++){
              if(selectedDatesList[previouslySelectedDate][0].includes(currentSelectedDatesList[currentSelectedDate][0])){
                  if(currentSelectedDatesList[currentSelectedDate][1]!=undefined){
                    currentSelectedDatesList[currentSelectedDate][1]=selectedDatesList[previouslySelectedDate][1]
                  }else{
                    currentSelectedDatesList[currentSelectedDate].push(selectedDatesList[previouslySelectedDate][1])
                  }
              }
          }
      }
        
      setShowCalendar(false)
    
    
        
        document.getElementById('mealsTable').style.display = 'none'
        document.getElementById('selectedMealDates').style.display = 'none'
        document.getElementById('btn1').style.display = 'none'
        document.getElementById('btn2').style.display = 'none';
        
        //console.log("meal_subscribed[1][0]",meal_subscribed[1][0])
        console.log("subveg,selectedmealtypesubnv",selectedmealtype)
       // selectedmealtype == true ? subnv = true : subveg = true
        console.log("subveg,subnv",subveg,subnv)
    
        if (!selectedmealtype) {
          console.log("entering into gototable and non veg ")
          document.getElementById('mealsTable').style.display = 'block';
          document.getElementById('btn1').style.display = 'block';
          document.getElementById('subbtn').style.display='block';
          setDates(currentSelectedDatesList)
          //console.log("type of dates ...",typeof datesArray)
        }
    
        else  {
          console.log("entering into gototable and veg section ")
          document.getElementById('mealsTableveg').style.display = 'block';
          document.getElementById('mealsTable').style.display = 'none';
          document.getElementById('btn1').style.display = 'block';
          document.getElementById('subbtn').style.display='block';
          setDates(currentSelectedDatesList)
        }
        
        document.getElementById('btn1').style.display = 'block';
        document.getElementById('subbtn').style.display='block';
    
          setDates(currentSelectedDatesList)
    
          }
        });
      }else{
         setDates(currentSelectedDatesList)

      }
     
  }).catch(err=>{
  console.log(JSON.stringify(err))
  })
  }



function cancelMeal(e){
  console.log("this is in cancel meal")
  MealDetails.getSelectedDates().then(Response=>{
    console.log("Fetching the selected mealdates",Response.data);
    if(Response.data == ''){
      toast.error(
        'You have not selected any dates!',
        {
          autoClose: 2000,
          position: toast.POSITION.TOP_CENTER
        }
      )
      document.getElementById('myprofile').style.display='none'
      document.getElementById('myFormNotif').style.display='none'
      document.getElementById('sub').style.display='none'
      return
    }
    if(Response.status==200){

      prevoiusdatesforcancel =Response.data;

      document.getElementById('btn2').style.display='block';
      document.getElementById('btn1').style.display='none';
      document.getElementById('subbtn').style.display='block';
      document.getElementById('mealsTable').style.display='none'
      document.getElementById('selectedMealDates').style.display='block'
      document.getElementById('mealsTable').style.display='none'
      document.getElementById('myprofile').style.display='none'
      document.getElementById('myFormNotif').style.display='none'
      document.getElementById('sub').style.display='none'
      setSelectedMealDatesHide('block')
    
      for(var eachDay=0;eachDay<prevoiusdatesforcancel.length;eachDay++){
        if(!prevoiusdatesforcancel[eachDay][1]){
          prevoiusdatesforcancel[eachDay][1]='nonveg'
        }else{
          prevoiusdatesforcancel[eachDay][1]='veg'
        }
      }
      setShowCalendar(false)
      doReload();
    }
  }).catch(err=>console.log("Caught error ",err)).finally()
  //meal_date,meal_type
}


// function cancelMeal(e){
//   setShowCalendar(false)
//
//   console.log("this is in cancel meal")
//   MealDetails.getSelectedDates().then(Response=>{
//     console.log("Fetching the selected mealdates",Response.data);
//     if(Response.data == ''){
//             toast.error(
//               'You have not selected any dates!',
//               {
//                 autoClose: false,
//                 position: toast.POSITION.TOP_CENTER
//               }
//             )
//             document.getElementById('myprofile').style.display='none'
//             document.getElementById('myFormNotif').style.display='none'
//             document.getElementById('sub').style.display='none'
//             return
//           }
//     if(Response.status==200){

//       prevoiusdatesforcancel =Response.data;

//       document.getElementById('btn2').style.display='block';
//       document.getElementById('btn1').style.display='none';
//       document.getElementById('subbtn').style.display='block';
//       document.getElementById('mealsTable').style.display='none'
//       document.getElementById('selectedMealDates').style.display='block'
//       document.getElementById('myprofile').style.display='none'
//       document.getElementById('myFormNotif').style.display='none'
//       //document.getElementById('sub').style.display='none'
//       document.getElementById('mealsTable').style.display='none'
//       setSelectedMealDatesHide('block')
    
//       for(var eachDay=0;eachDay<prevoiusdatesforcancel.length;eachDay++){
//         if(!prevoiusdatesforcancel[eachDay][1]){
//           prevoiusdatesforcancel[eachDay][1]='nonveg'
//         }else{
//           prevoiusdatesforcancel[eachDay][1]='veg'
//         }
//       }

//       doReload();
//     }
//   }).catch(err=>console.log("Caught error in 595",err)).finally()
//   //meal_date,meal_type

  
// }

function submitDetails(){
  Employee.checkMealSubscription().then((Response)=>{
    meal_subscribed=Response.data
  selectedmealtype = meal_subscribed[0][1]
    //if(datesArray.length == datespulsmealtype.length){
      if(selectedmealtype){
        datespulsmealtype = dates2
        console.log("datespulsmealtype in submission",datespulsmealtype)
      }
    MealDetails.submitMealDetails(datespulsmealtype,empId).then(Response=>{
      console.log("Response code for updating the mealdates ",Response.status)
      setShowCalendar(true)
    document.getElementById('mealsTable').style.display = 'none'
    document.getElementById('mealsTableveg').style.display = 'none'
   // document.getElementById('selectedMealDates').style.display = 'none'
    document.getElementById('btn2').style.display = 'none';
    document.getElementById('btn1').style.display = 'none';
    document.getElementById('subbtn').style.display = 'none';
    toast.success(
      'submission successful',
      {autoClose:2000}
      )
    doReload();
    }).catch(err=>console.log("Caught err ",err))
   
  // }
  // else{
  //   alert("please select meal type")
  // }
    });
  }
  

function updateDetails(){
  //  for(var i =0; i< deleteddates.length;i++){
  //    selectedDatesList[i] = deleteddates[i]
  //  }

  
    
  MealDetails.updateMealDetails(deleteddates,empId).then(Response=>{
    console.log("Response code for updating the mealdates ",Response.status)
    setShowCalendar(true)
    document.getElementById('mealsTable').style.display = 'none'
    document.getElementById('mealsTableveg').style.display = 'none'
    document.getElementById('selectedMealDates').style.display = 'none'
    document.getElementById('btn2').style.display = 'none';
    document.getElementById('btn1').style.display = 'none';
    document.getElementById('subbtn').style.display = 'none';
    toast.success(
      "Meal  updated  successfully",
      {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER
      }
    )
  }).catch(err=>console.log("Caught err ",err))
}


function cancelSingleMeal(e){
  console.log("onclickkkkk",e.target.parentNode.id)
  document.getElementById(e.target.id)
  console.log(e.target.parentNode.id)
  var a =e.target.parentNode.id
  var getdate = a.slice(0,10)
  console.log(getdate)
  var canceledmealtype = a.slice(11,)
  console.log(deleteddates)
  if(!deleteddates.includes([getdate,canceledmealtype])){
    deleteddates.push([getdate,canceledmealtype])
  }
  console.log(deleteddates)

  var index =-1

  for (var i=0;i<prevoiusdatesforcancel.length;i=i+1){
    
    if(prevoiusdatesforcancel[i][0].includes(getdate)){
      index=i;
      console.log(prevoiusdatesforcancel[i][0],getdate)
      break
    }
    index=-1
  }
   // var index = dates2.indexOf(prevoiusdatesforcancel)

    prevoiusdatesforcancel.splice(index,1)

 // var i = e.target.parentNode.parentNode.parentNode.rowIndex;
  
  doReload();
  }

  function closeTable() {
    //dates2= []
    setShowCalendar(true)
    document.getElementById('mealsTable').style.display = 'none'
    document.getElementById('mealsTableveg').style.display = 'none'
    document.getElementById('selectedMealDates').style.display = 'none'
    document.getElementById('btn2').style.display = 'none';
    document.getElementById('btn1').style.display = 'none';
    document.getElementById('subbtn').style.display = 'none';
    doReload();
  }

 
  function goToNotify(){
    MealDetails.ViewNotifications().then(Response =>{
      console.log("notifications",Response.data.length)
      if(Response.data.length == 0){
        document.getElementById('noNotif').style.display = 'block'
        document.getElementById("myFormNotif").style.display = 'block'
        document.getElementById("myprofile").style.display = "none";
        document.getElementById("sub").style.display = "none";
        return
      }
      
      var notif = Response.data
      for(var i= 0; i< notif.length; i++){
       setMessage(notif[i][0]) 
       setNotifdate(notif[i][1].slice(0,10))
       setMsgs(notif)
       //msgs.push(notifmessage,notifdate)
       console.log(msgs)
       
       //document.getElementById("myFormNotif").innerHTML = msgs;
      }
      console.log("after fot loop")
      document.getElementById("myFormNotif").style.display = 'block'
      document.getElementById("myprofile").style.display = "none";
      doReload();
    })
  }


  function updatemeal(typeOfMeal) {
    typeOfMeal == "veg"?subveg=true:subnv=true;
    console.log(subnv,subveg)
    MealDetails.updatemealplantype(typeOfMeal).then(Response=>{
      console.log("Response code for updating the mealdates ",Response.data)
    }).catch(err=>console.log("Caught err ",err))
  }

  
  return (
    <>
      <div >
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
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
        <div class="panel panel-default work-progress-table">
          <div class="panel-heading" style={{ textAlign: "center", fontSize: "30px", height: '10%' }}>MEAL PLANNER

            <div>
            <button onClick={goToprofile} id="myprof" class="btn btn-primary pull-right " style={{marginLeft:'3px',marginRight:"3px"}} ><i class="fa fa-user"> Profile</i></button>
            <button onClick={cancelMeal} id="caninheader" class="btn btn-primary pull-right" style={{marginLeft:'3px',marginRight:"3px"}} ><i class="fa fa-envelope">  Cancel Meal</i></button>
            <button onClick={goToNotify} id="mynotif" class="btn btn-primary pull-right" style={{marginLeft:'3px',marginRight:"3px"}} ><i class="fa fa-bell">  Notifications</i></button>
            <button onClick={goToEmphist} class="btn btn-primary pull-right" style={{marginLeft:'3px',marginRight:"3px"}} ><i class="fa fa-history">  History</i></button>
            <button onClick={goToSubs} id="subinheader" class="btn btn-primary pull-right" style={{marginLeft:'3px',marginRight:"3px"}} ><i class="fa fa-envelope">  Subscribe</i></button>
            </div>
          </div>


<div class="form-popup pull-right" id="myprofile" style={{ position: "fixed", top: "18%", left: "90%", marginLeft: "-30px" }}>
                <form class="form-container" style={{ textAlign: "left" }}>
                  <p>Welcome {empId} </p>
                  <a onClick={goToStart} class="btn btn-primary pull-right " style={{ marginTop: "-8px", marginRight: "0.8%" }} ><i class="fa fa-sign-out"> Signout</i></a>
                  <button type="button" class="btn btn-primary" onClick={closeFormprofile}>Close</button>
                </form>
              </div>

              <div class="form-popup" id="myFormNotif" style={{ position: "fixed", top: "18%", left: "100%", marginLeft: "-400px" }}>
              <form class="form-container" style={{ textAlign: "left" }}>
              <h4>Employee Notifications</h4>
              <p id = "noNotif" style={{display:btn_hide}}>No notifications</p>
              {console.log(msgs)}
              {msgs.map(
                i => 
                <p>{i[0]} on {i[1]} </p>
              )}
                  {console.log(notifmessage,notifdate)}
                  <button type="button" class="btn btn-primary" onClick={closeFormNotif}><i class="fa fa-close"> Close </i></button>
                </form>
              </div>

          <div class="form-popup" id="sub" style={{ position: "fixed", top: "18%", left: "90%", marginLeft: "-300px" }}>
            <form class="form-container" style={{ width: "400px", textAlign: "left", backgroundColor: "#f0f5fc" }} >
              <p>The minimum meal price for vegetarian is Rs.800/-</p>
              <p>The minimum meal price for non-vegetarian is Rs.1400/-</p>
              <p>Please select the meal type : </p>
              <input type="checkbox" id="veg" value="veg" onChange={subscribed} />
              <label>veg</label>
              <br></br>
              <input type="checkbox" id="nonveg" value="nonveg" onChange={subscribed} />
              <label>nonveg</label>
              <br />
              <p><strong>NOTE:</strong></p>
              <p>The meal price will be deducted from your account according to the subscription chosen whether you take the meals or not.
                After the subscription amount is exhausted you need to pay for the meal .
              </p>
              <p>
                *This subscription is valid for 1 year
              </p>

              <button type="button" id="proceedtosub" class="btn btn-primary" onClick={finalSubsciption}>Proceed to subscribe</button>
              <button type="button" class="btn btn-primary" onClick={closeForm1}>Close</button>
            </form>
          </div>

        
          <div style={{ marginLeft: "450px", marginRight: "auto" }}>
          </div>
          <div>
          
            <p style={{color:"white"}}>.</p>
            
            <div style={{
              alignItems: "center", justifyContent: "center", display: "flex",
              flexDirection: "column", marginTop: "-15px"
            }}>
            
            <div style={{ marginLeft: "100px", marginRight: "100px" }} className={showCalendar ? "" : "hide"}>
              <p style={{textAlign:"center"}}>Please select date range from the calendar : </p>
              <Calendar selectRange onChange={onChangeDate} value={date} minDate={tomorrow} id="demo1"  />
              {console.log(date)}
              {/* {date.toString()}   */}
            <button onClick={goToTable} class="btn btn-primary center " style={{ marginLeft: "35%", marginTop: "5px" }} >Select Dates</button>
       
            </div>
           

         
          <div>
        
          
          <table class="table" id="mealsTable" style={{  marginLeft: "1%", display: TABLE_HIDE }} >
            <thead>
              <tr >
                <th style={{ marginLeft: "100px" }}>Date</th>
                {/* <th>Day</th> */}
                <th>Veg</th>
                <th>Non-Veg</th>
                <th>Cancel</th>
              </tr>
            </thead>
            
            <tbody>
            {console.log("near html tbale")}
              {
                
                dates2.map(eachDay =>
                  <tr >
                    {console.log(eachDay.length,eachDay)}
                    <th style={{ padding: "10px 20px" }} scope="row" value={eachDay[0]}><p id="datesFromCheckBox">{eachDay[0]}</p></th>
                    <th style={{ padding: "10px 50px" }}>
                      {/* id={eachday} */}
                      <input type="checkbox" id={eachDay.length==2?eachDay[0]+ 'veg':eachDay+'veg'} onChange={getDetails} checked={eachDay.length==2?(eachDay[1].includes('nonveg')?null:true):null} />

                    </th>
                    <th style={{ padding: "10px 50px" }}>
                      {/* {console.log(eachDay,eachDay.length)} */}
                      <input type="checkbox" id={eachDay.length==2?eachDay[0]+ 'nonveg':eachDay+'nonveg'} onChange={getDetails} checked={eachDay.length==2?(eachDay[1].includes('nonveg')?true:null):null}  />
                      {eachDay.length==1?document.getElementById(eachDay+'veg')!=undefined?document.getElementById(eachDay+'veg').checked=false:'':''}
                      {eachDay.length==1?document.getElementById(eachDay+'nonveg')!=undefined?document.getElementById(eachDay+'nonveg').checked=false:'':''}
                      {eachDay.length==1?document.getElementById(eachDay+'nonveg')!=undefined?document.getElementById(eachDay+'nonveg').disabled=false:'':''}
                      
                      {eachDay.length==1?document.getElementById(eachDay+'veg')!=undefined?document.getElementById(eachDay+'veg').disabled=false:'':''}
                    </th>
                    <th>
                      <span onClick={goToDel} id={eachDay + "delete"}><i class="fa fa-trash" style={{ fontSize: "14px", color: "black" }} ></i></span>
                    </th>
                  </tr>)
              }
            </tbody>
          </table>


          <table class="table" id="selectedMealDates" style={{  marginLeft: "1%", display: SELECTED_MEAL_DATES_HIDE }} >
            <thead>
              <tr >
                <th style={{ marginLeft: "100px" }}>Date</th>
                {/* <th>Day</th> */}
                <th>Veg</th>
                <th>Non-Veg</th>
                <th>Cancel Meal</th>
              </tr>
            </thead>
            {console.log(prevoiusdatesforcancel.length, "in html")}
            <tbody>
              {

prevoiusdatesforcancel.map(eachDay =>
                  <tr >
                    <th style={{ padding: "10px 20px" }} scope="row"  value={eachDay[0]}><p id="datesFromCheckBox">{eachDay[0].slice(0,10)}</p></th>
                    <th style={{ padding: "10px 50px" }}>
                      {/* id={eachday} */}
                      <input type="checkbox" id={eachDay + 'veg'} disabled onChange={getDetails} checked={(eachDay[1]) == 'veg'} />

                    </th>
                    <th style={{ padding: "10px 50px" }}>

                      <input type="checkbox" id={eachDay + 'nonveg'} disabled onChange={getDetails} checked={(eachDay[1]) == 'nonveg'} />

                    </th>
                    <th>
                      <span onClick={cancelSingleMeal} id={eachDay}><i class="fa fa-trash" style={{ fontSize: "14px", color: "black" }} ></i></span>
                    </th>
                  </tr>)
              }
            </tbody>
          </table>


          <br></br>
          <table class="table" id="mealsTableveg" style={{ marginLeft: "1%", display: TABLE_HIDE }} >
            <thead>
              <tr >
                <th style={{ marginLeft: "100px" }}>Date</th>
                {/* <th>Day</th> */}
                {/* <th>Veg</th>
        <th>Non-Veg</th> */}
                <th>Cancel</th>
              </tr>
            </thead>

            <tbody>
              {
                dates2.map(eachDay =>
                  <tr >
                    <th style={{ padding: "10px 20px" }} scope="row" value={eachDay}><p id="datesFromCheckBox">{eachDay[0]}</p></th>
                    {/* <th style={{ padding: "10px 50px"}}>
             
              <input type="checkbox" id={eachDay+'veg'} onChange={getDetails} />
              
            </th>
            <th style={{ padding: "10px 50px"}}>
            
              <input type="checkbox" id={eachDay+'nonveg'} onChange={getDetails} />
              
            </th> */}
                    <th>
                      <span onClick={goToDel} id={eachDay + "delete"}><i class="fa fa-trash" style={{ fontSize: "14px", color: "black" }} ></i></span>
                    </th>
                  </tr>)
              }
            </tbody>
          </table>
          <button id="btn1" class="btn btn-primary" onClick={submitDetails} style={{ marginLeft: "40%", marginTop: "-40px", display: btn_hide }} >Submit</button>
          <button id="btn2" class="btn btn-primary" onClick={updateDetails} style={{ marginLeft: "40%", marginTop: "-40px", display: btn_hide }} >Update</button>
          <button id="subbtn" class="btn btn-primary" onClick={closeTable}  style={{ marginLeft: "50%", marginTop: "-35px", display: btn_hide }} >Close</button>
          </div>
          </div>
        </div>
      </div>
      </div>
    </>

  );
}