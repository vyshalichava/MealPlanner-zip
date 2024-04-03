import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { uncheck } from './EmployeeMealDetails';
import { removeEmployees } from './EmployeeMealDetails'
import { releaseEmployee } from './Header'
import Employee from './data/Employee';
import Start from '../Employee/home';
import reactDom from 'react-dom';
import LoginForm from '../Employee/loginForm';
import MealDetails from './data/MealDetails';


var weekdays = new Array(7);
weekdays[0] = "Saturday";
weekdays[1] = "Sunday";
weekdays[2] = "Monday";
weekdays[3] = "Tuesday";
weekdays[4] = "Wednesday";
weekdays[5] = "Thursday";
weekdays[6] = "Friday";




const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

//Pop window 
/**
 * 
 * @param {*} props 
 * @returns two popups :one is close popup it depends on nuumber of ID's in EmployeesList
 * when length of EmployeesList is 0 
 * And second popup is list of employees who are selected in the home page (is a confirm page)
 */
var EmployeesList = []

export default function SimpleDialog(props) {
  const classes = useStyles();
  let { open, onClose, SelectedEmployees, Users ,timeOut } = props;
  const [sessionTimeOut,setSessionTimeOut]=useState(false)

  const submitIds = () => {
    let date = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

    var data = JSON.parse('{"date":"' + date + '", "EmployeesIDs":' + JSON.stringify([SelectedEmployees]) + '}');
    MealDetails.submitId(SelectedEmployees).then(response=>{
      if(response.status==200){
        if (process.env.NODE_ENV == "development")console.log("Submitted sucessfully ",response.data)
        onClose()
        uncheck(SelectedEmployees)
        releaseEmployee();
      }
    }).catch(err=>
      {
        if(err.response.status == 403){
         
          timeOut()
          console.log("session time out......",sessionTimeOut)
          onClose()
        }
        
        if (process.env.NODE_ENV == "development")console.log("Found error ",err)
      })
  

  };
  const closeWindow = () => {
    onClose();
  }
  const handleListItemClick = (value) => {
    onClose(value);
  };
  const goBack = () => {
    onClose()
  }

  //For confirmation whether the list of SelectedEmployees contains any ids or not

  if (SelectedEmployees.length == 0 || SelectedEmployees.length == undefined) {
    return (
      <>
     
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />

        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <Dialog onClose={closeWindow} aria-labelledby="simple-dialog-title" open={open}>
          <DialogTitle id="simple-dialog-title"> Please select atleast one employee to Submit</DialogTitle>
          <div>
            <div>
              <button onClick={closeWindow}
                class="btn btn-primary pull-right"
                style={{ marginBottom: '15px', marginRight: '15px' }}
                data-title="Validate"
                data-toggle="modal"
                data-target="#validate" >close</button>
            </div>
          </div>
        </Dialog>
        <InvalidUser open={sessionTimeOut}  />
      </>
    );
  } else {
    return (
      <>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

        <Dialog onClose={closeWindow} aria-labelledby="simple-dialog-title" open={open}>
          <DialogTitle id="simple-dialog-title"><h3 style={{ textAlign: "center" }}>Confirm submission</h3></DialogTitle>
          <div style={{ marginLeft: '15px' }}>
            <span style={{ marginLeft: '5px' }}>You can't edit the submission</span>
          </div>
          <div>
            <br />
            <div>
              <button onClick={submitIds}
                style={{ marginBottom: '5px', marginRight: '5px' }}
                class="btn btn-primary pull-right"
                data-title="Validate" data-toggle="modal"
                data-target="#validate" > Submit</button>

              <button onClick={goBack}
                style={{ marginBottom: '5px', marginRight: '5px' }}
                class="btn btn-primary pull-right"
                data-title="Back" data-toggle="modal"
                data-target="#validate" > Back</button>
            </div>
          </div>
        </Dialog>



      </>

    );
  }
}

function bindEmployee(EmployeeList, Employeees) {
  EmployeesList = EmployeeList;
  EmployeesList.sort();

  return true;
}


function updateOpen() {
  //open=true
}

function SaveSubmit(props) {
  const classes = useStyles();
  let { doSave, onSaveClose } = props;

  const handleClose = () => {
    onSaveClose()

  };
  const closeWindow = () => {
    onSaveClose();
  }
  const handleListItemClick = (value) => {
    onSaveClose(value);
  };
  const goBack = () => {
    onSaveClose()
  }

  //For confirmation whether the list of SelectedEmployees contains any ids or not

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

      <Dialog onClose={closeWindow} aria-labelledby="simple-dialog-title" open={doSave}>
        <DialogTitle id="simple-dialog-title"><h3 style={{ textAlign: "center" }}>Please submit</h3></DialogTitle>
        <div style={{ marginLeft: '15px' }}>
          <span style={{ marginLeft: '5px' }}>The changes you made will be lost if you won't submit</span>
          &nbsp;
          &nbsp;
        </div>
        <div>
          <br />
          <div>


            <button onClick={goBack}
              style={{ marginBottom: '5px', marginRight: '5px' }}
              class="btn btn-primary pull-right"
              data-title="Back" data-toggle="modal"
              data-target="#validate" > Back</button>
          </div>
        </div>
      </Dialog>
    </>
  );

}


function DownloadConfirm(props) {
  let TABLE_HEAD =[]
  const { open, closeWindow, error, report, startDate, endDate ,type} = props
  if(type!=undefined && type=='vendor'){
    TABLE_HEAD = ['Date', 'Day', 'Vegeterian', 'Non vegetrain', 'Total_meals']



  }else{
    TABLE_HEAD = ['Employee ID', 'Name', 'Email', 'Total_meals','Total_money']
  }
  
  function goBack() {
    closeWindow()
  }
  function download() {

    if(type!=undefined && type=='vendor'){
      MealDetails.downloadData(startDate,endDate).then(
        function(Response){
          if(Response.status!=200){
            return
          }
          var csvData = TABLE_HEAD[0];
          //define the heading for each row of the data
          for (let each = 1; each < TABLE_HEAD.length; each = each + 1) {
            csvData = csvData + ',' + TABLE_HEAD[each]
          }
          let name=''
          csvData = csvData + '\n'
          let data = Response.data;
          if(type!=undefined && type=='vendor'){
            if (process.env.NODE_ENV == "development")console.log("Vendor downloading")
            name="vendor"
            data.forEach(function (row) {
     
              csvData += row[0] + ',' + weekdays[new Date(row[0]).getDay()] + ',' + row[1] + ',' + row[2] + ',' + row[3] + ',';
              csvData += "\n";
            });
          }else{
            if (process.env.NODE_ENV == "development")console.log("finanace downloading")
            name="Finanace"
            data.forEach(function (row) {
      
              csvData += row[0] + ',' + weekdays[new Date(row[0]).getDay()] + ',' + row[1] + ',' + row[2] + ',' + row[3] + ','+ row[4]+',';
              csvData += "\n";
            });
          }
      
          var hiddenElement = document.createElement('a');
          hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvData);
          hiddenElement.target = '_blank';
      
          //provide the name for the CSV file to be downloaded
          hiddenElement.download = name+' Meal Report ' + startDate + " to " + endDate + '.csv';
          hiddenElement.click();
          closeWindow()
        }
      )
    }else{
      MealDetails.downloadDataForFinance(startDate,endDate).then(
        function(Response){
          if(Response.status!=200){
            return
          }
          var csvData = TABLE_HEAD[0];
          //define the heading for each row of the data
          for (let each = 1; each < TABLE_HEAD.length; each = each + 1) {
            csvData = csvData + ',' + TABLE_HEAD[each]
          }
          let name=''
          csvData = csvData + '\n'
          let data = Response.data;
          
            if (process.env.NODE_ENV == "development")console.log("finanace downloading")
            name="Finanace"
            data.forEach(function (row) {
      
              csvData += row[0]  + ',' + row[1] + ',' + row[2] + ',' + row[3] + ','+ row[4]+',';
              csvData += "\n";
            });
          
      
          var hiddenElement = document.createElement('a');
          hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvData);
          hiddenElement.target = '_blank';
      
          //provide the name for the CSV file to be downloaded
          hiddenElement.download = name+' Meal Report ' + startDate + " to " + endDate + '.csv';
          hiddenElement.click();
          closeWindow()
        }
      )
    }

  
    
  }
  if (error != 0) {


    return (
      <>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

        <Dialog onClose={closeWindow} aria-labelledby="simple-dialog-title" open={open}>
          <DialogTitle id="simple-dialog-title"><h3 style={{ textAlign: "center" }}>Confirm download</h3></DialogTitle>
          <div style={{ marginLeft: '15px' }}>
            <span style={{ marginLeft: '5px' }}>The meal details between {startDate} and {endDate} are downloaded</span>
          </div>
          <div>
            <br />
            <div>
              <button onClick={goBack}
                style={{ marginBottom: '5px', marginRight: '5px' }}
                class="btn btn-primary pull-right"
                data-title="Back" data-toggle="modal"
                data-target="#validate" > Back</button>

              <button onClick={download}
                style={{ marginBottom: '5px', marginRight: '5px' }}
                class="btn btn-primary pull-right"
                data-title="Back" data-toggle="modal"
                data-target="#validate" > Download</button>

            </div>

          </div>
        </Dialog>
      </>
    );
  }
  else {

    return (
      <>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

        <Dialog onClose={closeWindow} aria-labelledby="simple-dialog-title" open={open}>
          <DialogTitle id="simple-dialog-title"><h3 style={{ textAlign: "center" }}>Download Error<i class="fa fa-exclamation-triangle" style={{ color: 'red' }}></i></h3></DialogTitle>
          <div style={{ marginLeft: '15px' }}>
            <span style={{ marginLeft: '5px' }}>Please select the dates to download report </span>
            &nbsp;
            &nbsp;
          </div>
          <div>
            <br />
            <div>
              <button onClick={goBack}
                style={{ marginBottom: '5px', marginRight: '5px' }}
                class="btn btn-primary pull-right"
                data-title="Back" data-toggle="modal"
                data-target="#validate" > Back</button>
            </div>
          </div>
        </Dialog>
      </>
    );
  }
  
}



function InvalidUser(props) {
  console.log("edvsfgb")
  const classes = useStyles();
  let { open } = props;


  function goToHome() {
    if (process.env.NODE_ENV == "development")console.log("Going to home page")
    localStorage.clear()
    reactDom.render(<LoginForm />, document.getElementById('root'))
  }

  const goBack = () => {
    goToHome()
  }

  //For confirmation whether the list of SelectedEmployees contains any ids or not

  return (
    <>

      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

      <Dialog aria-labelledby="simple-dialog-title" open={open}>
        {console.log('wefrfbg')}
        <DialogTitle id="simple-dialog-title"><h3 style={{ textAlign: "center" }}>Session time out</h3></DialogTitle>
        <div style={{ marginLeft: '15px' }}>
          <span style={{ marginLeft: '5px' }}>Please login</span>
        </div>
        <div>
          <br />
          <div>
            <button onClick={goBack}
              style={{ marginBottom: '5px', marginRight: '5px' }}
              class="btn btn-primary pull-right"
              data-title="Back" data-toggle="modal"
              data-target="#validate" > Close</button>
          </div>
        </div>
      </Dialog>
    </>
  );

}



export { bindEmployee, updateOpen, SaveSubmit, DownloadConfirm, InvalidUser }

