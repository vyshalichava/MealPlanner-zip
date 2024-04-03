            // ---------------------Vendor API's------------------------//

//For listing all the emplpoyees on vender's home page
//Request:pageNo:int and pageSize:int
//Expected : List of json objects
//Method type:
export const USERS_REST_API_URL="http://localhost:9000/MealPlannerBackend2/vendor/home";

// For updating daily meal status of particular employee or list of employees
// Request:list of empId 
//Expected:'sucess' message on sucessful updation . 'failed' message on unsucessful updation
//Method type:put
export const SUBMIT_REST_API_URL="http://localhost:9000/MealPlannerBackend2/vendor/updateMealStatus/"



// Return the number of employees of particular vendor id
//Expected :number
//Method type:
export const NUMBER_OF_RECORDS="http://localhost:9000/MealPlannerBackend2/employee/numberOfRecord"

//In vendor's report page , need an API which return the list which have a details like total number of meals
//Request :startDate and endDate as path variable
//Expected:List of json objects
//Method type:
export const MEAL_DETAILS_BETWEEN_DATES='http://localhost:9000/MealPlannerBackend2/vendor/report';

//For updating or changing the meal price in vendor's home page
//Request:veg:$ and nonVeg:$
//Expected:200 status on sucessful updation of meal price 
//Method type:
export const MEAL_PRICE='';



export const SEARCH_BY_IN_VENDOR="http://localhost:9000/MealPlannerBackend2/vendor/searchby"


export const DOWNLOAD_API="http://localhost:9000/MealPlannerBackend2/vendor/downloadreport/"



            // -------------------------Financer API's----------------------------//

//
//Request:
//Expected:
//Method type:
export const DATES_WITH_MEAL_DETAILS="http://localhost:9000/MealPlannerBackend2/employee/getAll";



//For listing all the emplpoyees total meals and price on financer's home page between two dates
//Request:startdate and enddate,pageno,pagesize
//Expected:List of json objects
//Method type:get
export const DATES_WITH_EMPLOYEE_DETSILS="http://localhost:9000/MealPlannerBackend2/mealCalender/home/financer";





export const SEARCH_BY="http://localhost:9000/MealPlannerBackend2/financer/searchby/"

export const DOWNLOAD_API_FOR_FINANCER="http://localhost:9000/MealPlannerBackend2/financer/downloadreport/"



            //-------------------------------Employee API's------------------------//



//Login URL
export const LOGIN="http://localhost:9000/MealPlannerBackend2/userCred/login";



//Signup url
export const SIGNUP="http://localhost:9000/MealPlannerBackend2/userCred/signup";


//
//request:token or employee id
//Expected:true or false
export const MEAL_SUBSCRIPTION='http://localhost:9000/MealPlannerBackend2/employee/subscribe';



export const EMPLOYEE_SELECTED_MEAL_DATES="http://localhost:9000/MealPlannerBackend2/mealCalender/selectMeals"



export const EMPLOYEE_UPDATED_MEAL_DATES="http://localhost:9000/MealPlannerBackend2/mealCalender/cancelMeal";



//delete record from database api 
//request:List<date,mealtype,vendorid,subscribed>
//Expected:delete cancelled meals/dates
//method type:delete
export const EMPLOYEE_CANCEL_MEAL_DATES="http://localhost:9000/MealPlannerBackend2/mealCalender/cancelMeal"



//getexistdates to cancel a meal url
//Request:vendorid
//Expected:mealdate,mealtype
//Method type:get
export const EXISTDATES="http://localhost:9000/MealPlannerBackend2/employee/getexistdates/1";

//History url
//Request:startdate,enddate,pageno,pagesize
//Expected:mealdate,mealtaken,mealtype
//Method type:get
export const EMPLOYEE_HISTORY="http://localhost:9000/MealPlannerBackend2/employee/history/{startdate}/{enddate}/{pageno}/{pagesize}";





//History url
//Request:startdate,enddate,pageno,pagesize
//Expected:mealdate,mealtaken,mealtype
//Method type:get
export const HISTORY="http://localhost:9000/MealPlannerBackend2/employee/history/";

export const EMPLOYEE_NOTIFICATIONS = "http://localhost:9000/MealPlannerBackend2/notifications/sendlist";


export const UPDATE_MEAL_TYPE = "http://localhost:9000/MealPlannerBackend2/employee/updatePlanType";

            //---------------------TOKEN-------------------//
export const TOKEN='';


export const VALIDATE_TOKEN="http://localhost:9000/MealPlannerBackend2/userCred/validate"

