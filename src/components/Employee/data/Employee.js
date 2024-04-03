import axios  from "axios";
import { LOGIN,SIGNUP,MEAL_SUBSCRIPTION} from "../../API's/CommonService";
import { GET_TOKEN } from "../../Vender/data/Storage";

// const USERS_REST_API_URL="https://api.github.com/users";


class Employee {
    getUsers(){
        return axios.get();
    }

    submitStatus(id){
        return axios.put();
    }
    checkValidation(userId,password,strUser){
        console.log("details",userId,password,strUser)
        return axios.post(LOGIN,null, { params: { username: userId ,password:password, userrole:strUser } })
    }
    createAccount(userType,userId,password,userName,userEmail,mealSubscribed){
        console.log("Type of user",userType);
        // var d = []
        // d.push(userId,userType,password)
        // con
        return axios.post(SIGNUP,
            {
                id:userId,
                name:userName,
                email:userEmail,
                role:userType,
                pass:password,
                meal_subscribed:0,
                meal_plan_type:0
            })
    }
    checkMealSubscription(){
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };
        console.log(MEAL_SUBSCRIPTION)
        return axios.get(MEAL_SUBSCRIPTION,config);
}
}
export default new Employee();