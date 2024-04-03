import axios  from "axios";
import { USERS_REST_API_URL } from "../../API's/CommonService";
import { GET_TOKEN } from "./Storage";
// const USERS_REST_API_URL="https://api.github.com/users";

const SUBMIT_REST_API_URL="http://localhost:8080/employee//employees/"
const NUMBER_OF_RECORDS="http://localhost:8080/employee/numberOfRecord"

class Employee {
    getUsers(pageNo,pageSize){

        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };
        return axios.get(USERS_REST_API_URL+"/"+pageNo+"/"+pageSize,config);
    }
    getNoOfRecords(pageNo,pageSize){
        return axios.get(NUMBER_OF_RECORDS);
    }

    submitStatus(id){
        return axios.put(SUBMIT_REST_API_URL+id);
    }
   
}
export default new Employee();