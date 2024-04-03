import React, { useContext ,useState } from "react";

import { AccountContext } from "./accountContext";

import "../../App.css";

import reactDom from "react-dom";
//import Calendar from 'react-calendar';
//import ReactCalendar from "../emp_home";
import { SignupForm } from "./signupForm";
import LoginForm from "./loginForm";


import Calendar from 'react-calendar';
import ValidateToken from "../HomeFolder/UTILITY_HELPER/ValidateToken";
import Vender from "../Vender";
import MyApp from "./Emp_home_new";
import Finance from "../FinanaceTeam/finance";
import WindowFocusHandler from "../HomeFolder/FocusHandler";






export default function Start(props) {

  var loginRequired=localStorage.getItem("validUser")
  const {homeLoginButton,setHomeLoginButton}=useState('Login')
  function onClick(element) {
    document.getElementById("img01").src = element.src;
    document.getElementById("modal01").style.display = "block";
    var captionText = document.getElementById("caption");
    captionText.innerHTML = element.alt;
  }
  
  function goToLogin(){
    //<Calendar selectRange onChange={onChange} value={date} />
    console.log('going to login page...')
   
      reactDom.render(<LoginForm/>,document.getElementById("root"))
    }
    
  // Toggle between showing and hiding the sidebar when clicking the menu icon
  var mySidebar = document.getElementById("mySidebar");
  
  function w3_open() {
    if (mySidebar.style.display === 'block') {
      mySidebar.style.display = 'none';
    } else {
      mySidebar.style.display = 'block';
    }
  }
  
  // Close the sidebar with the close button
  function w3_close() {
      mySidebar.style.display = "none";
  }
  
  
  function buttons(){
    console.log("in button class")
  const buttons = document.querySelectorAll('button');
  buttons.forEach( button =>{
      button.addEventListener('click',()=>{
        if(button.nextElementSibling)
        {
          const para = button.nextElementSibling;
          const icon = button.children[1];
          //let next = target.nextElementSibling;
        
          para.classList.toggle('show');
          icon.classList.toggle('rotate');
        }
      })
  } )
}

{
    return (
      <>
      <div >
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"/>
        <script src="//code.jquery.com/jquery-1.11.1.min.js"/>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
    {/*---- Include the above in your HEAD tag --------*/}
    <WindowFocusHandler/>
<div class="container" style={{width:"100%"}}>
    <div class="row">
            <div class="col-md-12">
                <div class="widget blank no-padding">
                
                    <div class="panel panel-default work-progress-table" >
                            {/* Default panel contents */}
                            {console.log(( localStorage.getItem('validUser')))}
                            <div class="panel-heading" style={{textAlign:"center", fontSize:"30px",width:"100%"}}>MEAL PLANNER
                            <div>
                            <button type="button" class="btn btn-primary pull-right" style={{marginTop:"1%"}} onClick={goToLogin}>{(localStorage.getItem('validUser')==undefined || localStorage.getItem('validUser').includes(false))?"Login":"My account"}</button>
                            </div>
                       {/* <button class="btn primary pull-right" style={{marginTop:"-50px" }} onClick = {goToStart}>Home</button> */}
                        </div>
                        <div class="dropdown rounded"></div>
                        </div>
                  </div>
              </div>
      
      </div>




    <div class="w3-right w3-hide-small">
      
    </div>
    
    <a href="javascript:void(0)" class="w3-bar-item w3-button w3-right w3-hide-large w3-hide-medium" onclick="w3_open()">
      <i class="fa fa-bars"></i>
    </a>
  </div>
</div>


<nav class="w3-sidebar w3-bar-block w3-black w3-card w3-animate-left w3-hide-medium w3-hide-large" style={{display:"none"}} id="mySidebar">
  <a href="javascript:void(0)" onclick="w3_close()" class="w3-bar-item w3-button w3-large w3-padding-16">Close ×</a>
  
</nav>



<div class="w3-container" style={{padding:"50px", marginTop:"-1000px"}} id="about">
<h3 class="w3-center" style={{fontSize:"17px",textAlign:"center"}}>About The Project</h3>
  <div class="w3-row-padding w3-center">

    <div class="w3-row-padding" id="Resolute">
        <div class="w3-col m6">
          
        <section class="faq">
            <div class="questions-container">
                <div class="question">
                    <button onClick={buttons}>
                        <span  style={{fontSize:"14px"}}>What is Meal Planner?</span>
                        <i class="glyphicon glyphicon-menu-up"></i>
                    </button>
                    <p>Meal planner is an web app designed to digitalize the traditional system.The objective of this application is to help food vendors, plan their resources for food/meal requirement in prior, for a given day and which eventually will lead to better planning and reduce food wastages.</p>
                </div>
                <div class="question"  onClick={buttons}>
                    <button>
                        <span style={{fontSize:"14px"}}>How it Works?</span>
                        <i class="glyphicon glyphicon-menu-up"></i>
                    </button>
                    <p>Employees can select dates to book meals and vendors will have employees’ data who all would be availing meal services based on reports/data generated for a future date, they can plan their resources. This report/data can be used by vendors for validation against Employee ID of employees who are availing food services.</p>
                </div>
                <div class="question"  onClick={buttons}>
                    <button>
                        <span style={{fontSize:"14px"}}>What is meal subscription?</span>
                        <i class="glyphicon glyphicon-menu-up"></i>
                    </button>
                    <p>The employee must subscribe mentioning a specific meal type 
                      in order to take the meals.The meal price will be deducted from their account according to the subscription chosen and based on the meal taken. After the subscription amount is exhausted employee needs to pay for the meal .
                    </p>
                </div>
            </div>
        
        </section>
        </div>
        <div class="w3-col m6" style={{marginTop: "20px"}}>
          <img class="w3-image w3-round-large" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStIDE86FvI1BukF7FQpgYPUnAajwQ2RfpMyQ&usqp=CAU"  width="400px" height="700px"/>
        </div>
      </div>
  </div>
</div>





<div id="modal01" class="w3-modal w3-black" onclick="this.style.display='none'">
  <span class="w3-button w3-xxlarge w3-black w3-padding-large w3-display-topright" title="Close Modal Image">×</span>
  <div class="w3-modal-content w3-animate-zoom w3-center w3-transparent w3-padding-64">
    <img id="img01" class="w3-image"/>
    <p id="caption" class="w3-opacity w3-large"></p>
  </div>
</div>


{/* <div class="new" id="contact">
  <div class="h2">
          <h2 style={{fontSize:"15px"}}>Contact Us</h2>
           
        </div> */}
      <div  style={{padding:"1px"}} id="about">
  <h3 class="w3-center" style={{ marginTop:"-0.5%", fontSize:"17px"}}>Contact Us</h3>
  <br></br>
  <table >
            <tr>
              <td style={{padding: "0 90px"}}>
            <h6 >Vyshali Chava <br/>
          <a href = "mailto: vchava@modeln.com">vchava@modeln.com</a></h6>
          </td>
          <td style={{padding: "0 90px"}}>
          <h6 >Vishnu Vadhan Dhandu <br/>
          <a href = "mailto: vdhandu@modeln.com">vdhandu@modeln.com</a></h6>

          </td>
          <td style={{padding: "0 90px"}}>
          <h6 >Sandeep Kumar<br/>
          <a href = "mailto: sdkumar@modeln.com">sdkumar@modeln.com</a></h6>
          </td>
          <td style={{padding: "0 90px"}}>
          <h6 >Vikas Chotukuti <br/> 
          <a href = "mailto: vchotukuri@modeln.com">vchotukuri@modeln.com</a></h6>
          </td>
            </tr>
            </table>
  </div>
 



{/* <footer class="w3-center w3-black w3-padding-64">
  <a href="#home" class="w3-button w3-light-grey"><i class="fa fa-arrow-up w3-margin-right"></i>To the top</a>
  
</footer> */}
 
</>

);

}
  }