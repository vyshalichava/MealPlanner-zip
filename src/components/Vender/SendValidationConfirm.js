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
import {removeEmployees} from './EmployeeMealDetails'
import {releaseEmployee} from './Header'
import Employee from './data/Employee';




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
var EmployeesList=[]

export default function SendValidation(props) {
  const classes = useStyles();
  let { open,onClose,SelectedEmplopyees , uncheck} = props;
 
  const handleClose = () => {
    let date=new Date().toJSON().slice(0,10).replace(/-/g,'/');
    if (process.env.NODE_ENV == "development")console.log("Employees who took meal today ")
    var data=JSON.parse('{"date":"'+date+'", "EmployeesIDs":'+JSON.stringify([SelectedEmplopyees])+'}');
    if (process.env.NODE_ENV == "development")console.log(data)
    uncheck(SelectedEmplopyees)
    onClose()
  };
  const goBack=()=>{
    onClose();
  }
  const closeWindow=()=>{
  onClose();
  }
  const handleListItemClick = (value) => {
    onClose(value);
  };
 
  //For confirmation whether the list of employees contains any ids or not
 if(SelectedEmplopyees.length==0 || SelectedEmplopyees.length==undefined){
  return (
    <>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
  <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
      
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
  <Dialog onClose={closeWindow} aria-labelledby="simple-dialog-title" open={open}>
    <DialogTitle id="simple-dialog-title"> Please select atleast one employee to submit</DialogTitle>
        <div>
          <div>
          <button onClick={closeWindow} 
          class="btn btn-primary pull-right" 
          style={{marginBottom:'15px',marginRight:'15px'}} 
          data-title="Validate" 
          data-toggle="modal" 
          data-target="#validate" >close</button>
          </div>
        </div>
  </Dialog>
  </>
);
 }else{
  return (
      <>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
  
    <Dialog onClose={closeWindow} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title"><h3 style={{textAlign: "center"}}>Confirm submission</h3></DialogTitle>
      <div style={{marginLeft:'15px'}}>
        <span style={{marginLeft:'5px'}}>Once submission is done you can't edit<br/> the submission</span>
      </div>
         <div>
           <br/>
           <div>
           <button onClick={handleClose} 
           style={{marginBottom:'5px',marginRight:'5px'}}
           class="btn btn-primary pull-right"  
            data-title="Validate" data-toggle="modal" 
            data-target="#validate" > Submit</button>

            <button onClick={goBack} 
           style={{marginBottom:'5px',marginRight:'5px'}}
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

function bindEmployee(EmployeeList,Employeees){
  // EmployeesList=EmployeeList;
  // EmployeesList.sort();
  // if (process.env.NODE_ENV == "development")console.log("In bindEmployee",EmployeesList)
 return true;
}


function updateOpen(){
 // open=true
}


function InvalidUsers(props) {
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

export { bindEmployee ,updateOpen ,InvalidUsers}