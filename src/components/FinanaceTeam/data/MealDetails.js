import axios  from "axios";
import { GET_TOKEN } from "../../Vender/data/Storage";
import { MEAL_DETAILS_BETWEEN_DATES ,
    DATES_WITH_EMPLOYEE_DETSILS,
    SEARCH_BY} from "../../API's/CommonService";




class MealDetails {
   

    getEmployeeMealDates(pageNo,pageSize){
        if (process.env.NODE_ENV !== "development")console.log(DATES_WITH_EMPLOYEE_DETSILS+'pageNo='+pageNo+"&pageSize="+pageSize)
        return axios.get(DATES_WITH_EMPLOYEE_DETSILS+'pageNo='+(pageNo-1)+"&pageSize="+pageSize);
    }

    updateMealDetails(selectedMealDates){
        return axios.post("")
    }
    getMealDates(START_DATE,END_DATE,pageNo,pageSize){
        if (process.env.NODE_ENV !== "development")console.log(DATES_WITH_EMPLOYEE_DETSILS+"/"+START_DATE+"/"+END_DATE+"/"+pageNo+"/"+pageSize)
        return axios.get(DATES_WITH_EMPLOYEE_DETSILS+"/"+START_DATE+"/"+END_DATE+"/"+pageNo+"/"+pageSize,{
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
    }

    searchBy(start_date,end_date,searchBy,searchData){
        let data={
            searchby:searchBy,
            value:searchData
        }
        if (process.env.NODE_ENV !== "development")console.log("data ",data)
        if (process.env.NODE_ENV !== "development")console.log(SEARCH_BY+start_date+"/"+end_date)
        return axios.get(SEARCH_BY+start_date+"/"+end_date,
        {
           params:data,
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
    }
}
export default new MealDetails();