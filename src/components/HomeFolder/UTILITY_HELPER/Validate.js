import axios  from "axios";
import { MEAL_SUBSCRIPTION } from "../../API's/CommonService";


// const USERS_REST_API_URL="https://api.github.com/users";
const USER_AUTHENTICATION="USER_AUTHENTICATION_API_TAKES_THREE_PARAMETERS";
const SUBMIT_REST_API_URL="http://localhost:8080/employee//employees/"
const sign_up= 'signup_details';
const empMealDetails = 'emp_meal_details';

class Employee {
    checkValidation(strUser,emplpoyessId,emppasswd){
        return axios.get(USER_AUTHENTICATION+'strUser='+strUser+'userId='+emplpoyessId+'pass='+emppasswd);
    }


    checkMealSubscription(){
        return axios.get(MEAL_SUBSCRIPTION)
}
    signupform(signUser,id,mail,p1){
        return axios({
            method: 'put',
            url: sign_up,
            headers: {}, 
            data: {
                signUser:signUser,
                id:id,
                mail:mail,
                p1:p1
                 // This is the body part
            }
          });

    }
    empMealDetails(){

    }
    submitStatus(id){
        return axios.put(SUBMIT_REST_API_URL+id);
    }
    submitValues(dates){
        axios.post()
    }
    validateUser(){


        //Pass the API_URL and json data
        return axios.post()
        
    }

    newUser(UserData){
    //Pass the userdata and API_URL
        return axios.post()
    }
}
export default new Employee();