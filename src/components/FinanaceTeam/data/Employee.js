import axios  from "axios";
import { DOWNLOAD_API_FOR_FINANCER } from "../../API's/CommonService";


// const USERS_REST_API_URL="https://api.github.com/users";
const USERS_REST_API_URL="http://localhost:8080/employee/getAll";
const SUBMIT_REST_API_URL="http://localhost:8080/employee//employees/"

class Employee {
    getUsers(){
        return axios.get(USERS_REST_API_URL);
    }

    submitStatus(id){
        return axios.put(SUBMIT_REST_API_URL+id);
    }


}
export default new Employee();