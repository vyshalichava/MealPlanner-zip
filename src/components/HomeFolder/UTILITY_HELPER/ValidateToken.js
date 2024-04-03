import { VALIDATE_TOKEN } from "../../API's/CommonService"
import axios from 'axios'


export default function ValidateToken(token){
    return axios.get(VALIDATE_TOKEN,{
        headers: { Authorization: `Bearer ${token}` }
    }).then(
        res=>{
            if (process.env.NODE_ENV !== "development")console.log("Token valid")
            return true
        }
    ).catch(
        err=>{
            if (process.env.NODE_ENV !== "development")console.log("Invalid token")
            return false
        }     
    )
}