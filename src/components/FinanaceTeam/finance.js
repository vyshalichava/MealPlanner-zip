
import '../Vender/css/App.css'
import reactDom from 'react-dom';
import React, { useState, useEffect } from 'react'

import EmployeeMealDetails from './EmployeeDetsils';
import Start from '../Employee/home';
import WindowFocusHandler from '../HomeFolder/FocusHandler';
import InvalidUser from '../HomeFolder/SessionOut';
const signout = () => {
  //console.log("Signout")
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  localStorage.setItem('validUser', false)
  reactDom.render(<Start />, document.getElementById("root"))
}

const notification = [];
let EmployeeList = []
let Users = {};
let doOpen = false;


export default function Finance(props) {

  const { invaludUser, setInvalidUser } = useState(false)
  const onFocus = () => {


    if (localStorage.getItem('validUser') != null && (
      localStorage.getItem('validUser').includes(false) ||
      localStorage.getItem('validUser').includes('false'))) {
      localStorage.setItem('sessionTimeOut', true);
      setInvalidUser(true)
      //console.log('Tab is in focus....', typeof invaludUser);
    }
  };

  function sessionOut() {

  }
  // User has switched away from the tab (AKA tab is hidden)
  const onBlur = () => {
    //console.log('Tab is blurred')

  };


  /**
   * As nothing is required beacuse this rendor is in read mode
   */

  return (

    <>


      <div >
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js" />
        <script src="//code.jquery.com/jquery-1.11.1.min.js" />
        {/*---- Include the above in your HEAD tag --------*/}

        <div class="container" style={{ width: "100%" }}>
          <div class="row">
            <div class="col-md-12">
              <div class="widget blank no-padding">

                <div class="panel panel-default work-progress-table">
                  {/* Default panel contents */}
                  <div class="panel-heading" style={{ textAlign: "center", fontSize: "30px" }}>MEAL PLANNER
                    <div >
                      <button

                        class="btn btn-primary pull-right" style={{ margin: "5px" }} data-title="Signout" data-toggle="modal" data-target="#ssignout" onClick={signout}><span class="fa fa-sign-out"></span>Signout</button>

                    </div>
                  </div>

                  <div >
                    <EmployeeMealDetails />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}








