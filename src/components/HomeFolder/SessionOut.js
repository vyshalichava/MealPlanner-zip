import LoginForm from "../Employee/loginForm";
import React, { useState ,useStyles } from 'react';
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
import reactDom from 'react-dom';

export default function InvalidUser(props){
   
    let { open } = props;
   console.log("Invalid user",open)
    
   function goToHome(){
     console.log("Going to home page")
     localStorage.clear()
      reactDom.render(<LoginForm/>,document.getElementById('root'))
  }
    
    const goBack=()=>{
      goToHome()
    }
   
    //For confirmation whether the list of SelectedEmployees contains any ids or not
   
    return (
      <>
     
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    
    <Dialog  aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title"><h3 style={{textAlign: "center"}}>Something went wrong</h3></DialogTitle>
        <div style={{marginLeft:'15px'}}>
          <span style={{marginLeft:'5px'}}>Please close other tab</span>
        </div>
           <div>
             <br/>
             <div>
              <button onClick={goBack} 
             style={{marginBottom:'5px',marginRight:'5px'}}
             class="btn btn-primary pull-right"  
              data-title="Back" data-toggle="modal" 
              data-target="#validate" > Close</button>
             </div>
           </div>
      </Dialog> 
    </>
  );
   
  }
  