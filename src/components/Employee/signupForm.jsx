import React, { useContext , useState } from "react";
import "../../App.css";
import Employee from "./data/Employee";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import reactDom  from "react-dom";
import './css/signUpFormcss.css'
import  LoginForm  from "./loginForm";
import MyApp from "./Emp_home_new";
import Start from "./home";
import Demo from "./subscribe";
import Vender from "../Vender";
import Finance from "../FinanaceTeam/finance";
toast.configure();
var USERTYPE='employee';
export default function SignupForm(props) {
//   const { switchToSignin } = useContext(AccountContext);
    const [userType,changeUserType]=useState('employee');
    const [showText, setShowText] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [repeatPassword, setRepeatPassword] = useState('');
  
//   const [onLoginSucess,isLogined]=useState('');
//   const [name,setName]=useState('');
//   const [id,setID]=useState('');


//   function validateEmail(email) {
//       var re = /\S+@\S+\.\S+/;
//       console.log(re.test(email))
//         return re.test(email);
//   }

 
//   const submitValue = () => {
//     if(!validateEmail(email)){
//       alert("Enter valid EMail address")
//       return ;
//     }else{
//       console.log("Email is verified")
//     }
   
//       // Validate lowercase letters
//       var lowerCaseLetters = /[a-z]/g;  
//       // Validate capital letters
//       var upperCaseLetters = /[A-Z]/g;
//       // Validate numbers
//       var numbers = /[0-9]/g;
//       if(!password.match(numbers) || password.length < 8 || !password.match(upperCaseLetters) || !password.match(lowerCaseLetters)) {  
//         console.log("Password field is not strong")
//         alert("Password is too small")
//         return;
//       }
//     if(password!=repeatPassword){
//       alert("Password not matching")
//       return;
//     }
//     if(email && password){
//       isLogined(true)
//       const element=document.getElementById("root")
//       reactDom.render(<UserComponent/>,element);
//     }
//     else{
//       alert("Enter valid details...")
//     }    
// }

function goToLogin(){
  reactDom.render(<LoginForm/>,document.getElementById("root"))
}
const [showDialog,setShowDialog]=useState(false);

function setUserType(e){
  USERTYPE=e.target.value;
}

function goToHome(e){
  e.preventDefault()
  var useuse = document.getElementById("userType").value;
  if (process.env.NODE_ENV == "development")console.log("use use",useuse)
  var userType=USERTYPE;
  var userId=document.getElementById("userId").value;
  var userName=document.getElementById("userName").value;
  var userEMail=document.getElementById("userEmail").value;
  var userPassword = document.getElementById("password").value
  var confirmPassword = document.getElementById("confirmPassword").value
  //var mealSubscribed=document.getElementById("mealSubscribed").value;
  var mealSubscribed=false;
  var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(userId == '' || userName == '' || userPassword == '' || userType == '' || userEMail== '' || confirmPassword== ''){
      alert("please fill all fields")
      return
    }
    if(/[A-Z]/.test(userId) == true ||
            /[a-z]/.test(userId) == true 
        ){
            alert("ID should only contain Integers!")
            return
        }

        if (process.env.NODE_ENV == "development")console.log(typeof userName)
        if(userName.match(numbers)){
          alert("Name should contain only alphabets" )
          return
        }
        
        if(!userPassword.includes(confirmPassword)){
          alert("passwords dindn't match")
          return
        }
        
     

      if(!userEMail.match(mailformat)){
        alert("You have entered an invalid email address!" )
        return
      }


      if( userPassword.length >= 8  &&
       userPassword.match(lowerCaseLetters) != null && 
     userPassword.match(upperCaseLetters) !=null && 
   userPassword.match(numbers) != null && 
     userPassword.includes(confirmPassword) &&
     userId.match(lowerCaseLetters) == null &&
     userId.match(upperCaseLetters) == null 
      )
      {
    
     var token=''
     //if (process.env.NODE_ENV == "development")console.log("New User details")
     //if (process.env.NODE_ENV == "development")console.log(userType,userId,userPassword,userName,userEMail,mealSubscribed)
     Employee.createAccount(userType,userId,userPassword,userName,userEMail,mealSubscribed).then(Response=>{
       if (process.env.NODE_ENV == "development")console.log(Response.status)
     //reactDom.render(<MyApp />,document.getElementById("root"))
      if(Response.status==200 ){
          //go to next page
          if (process.env.NODE_ENV == "development")console.log("response success",Response.data)
          if(Response.data == 'exists'){
            alert("User already exists")
            return
          }
          if (process.env.NODE_ENV == "development")console.log("usertype",useuse)
          token=Response.data;
          if (process.env.NODE_ENV == "development")console.log('Token generated')
          if (process.env.NODE_ENV == "development")console.log(token)
          reactDom.render(<LoginForm />,document.getElementById("root"))
          toast.success(
            "Registered Successfully",
            {
              autoClose: 2000,
              position: toast.POSITION.TOP_CENTER
            }
          )
       // }
              }else{
                if (process.env.NODE_ENV == "development")console.log('details wrong')
                  //Reload component or input fields make empty
              }
          }).catch(err=>{

            if (process.env.NODE_ENV == "development")console.log('Something went wrong')})
        }
        else{
          setShowText(true)

          return
        }
        
      }
        
    



function goToStart(){
  reactDom.render(<Start/>,document.getElementById("root"))
}




  return (
    <>
    <div >
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"/>
        <script src="//code.jquery.com/jquery-1.11.1.min.js"/>
    {/*---- Include the above in your HEAD tag --------*/}

<div class="container">
    <div class="row">
            <div class="col-md-12">
                <div class="widget blank no-padding">
                
                    <div class="panel panel-default work-progress-table">
                            {/* Default panel contents */}
                            <div class="panel-heading" style={{textAlign:"center", fontSize:"30px"}}>MEAL PLANNER
                        <button class="btn btn-primary pull-right" style={{marginTop:"1%"}} onClick = {goToStart}>Home</button>
                         </div>
                  </div>
                        
                        
      </div>
      </div>
      
      </div>
        <body>
      
        <div class="container">
            <div class="right" style={{marginLeft:"25%",marginTop:"1%"}}>
                <div class="formBox" style={{backgroundColor:"#D3D3D3", height:"560px"}}>
                    <p class="sign" style={{marginTop:"-30px"}}>Create Account</p>
                    <form  style={{marginTop:"-35px"}}>
                        <p style={{marginTop:"-10px",fontSize:"15px",marginLeft:"1px"}}>SignUp
                        <select name="cars" id="userType" style={{marginTop:"1px",width:"40%",marginLeft:"6px",textAlign: 'center' }} class = "btn btn-primary" onChange={setUserType} >
                        <option value="employee">Employee</option>
                        <option value="vendor" >Vendor</option>
                        <option value="financer">Finance Department</option>
                        </select>
                        </p>
                        <br></br>
                        <div style={{marginTop:"-20px"}}>
                        <p>ID</p>
                        <input type="text" name="userId" placeholder="ID"  id="userId" style={{ textAlign: 'center' }} required/>
                        
                        <p>Name</p>
                        <input type="text" name="userName" placeholder="Name"  id="userName" style={{ textAlign: 'center' }} required/>
                        
                        <p>E-mail Address</p>
                        <input type="email" name="userId" placeholder="Enter your Mail ID" id="userEmail" style={{ textAlign: 'center' }} required/>
                        
                        <p>Create Password</p>
                        <input type="Password" name="password" placeholder="Create a Strong Password" id="password" style={{ textAlign: 'center' }} required/>
                        
                        <p>Confirm Password</p>
                        <input type="Password" name="password" placeholder="Re-enter your Password" id="confirmPassword" style={{ textAlign: 'center' }} required/>
                        
                        <p  className={showText ? "" : "hide"} style={{fontSize:"11px", color:"red"}}>Password should contain atleast one lower case, one upper case, one number and minimum length 8 </p>
                        <span id = "message2" style={{color:"red",fontSize: "10px"}}> </span> 
                        <button class="btn btn-primary" onClick={goToHome} >create an account</button>
                         
                        <p class="create" style={{marginTop:"-95px",marginLeft:"-100px"}}>Already a Member?<a class="tag" onClick={goToLogin}>Sign In</a></p>
                   </div>
                    </form>
                </div>
            </div>
            
        </div>
      
      </body>
      </div>
      </div>
        </>
  );
}