
import  Header from './Header';

import { GET_TOKEN, SET_TOKEN } from './data/Storage';
import InternalServerError from '../HomeFolder/ErrorHandler/InternalServerError';

export default function Vender(props){
const token=GET_TOKEN()
if (process.env.NODE_ENV == "development")console.log("Going to vedor", token)
if(token!=="" && token!==undefined){
    SET_TOKEN(token)
    return(<Header />)
}else{
    return (<InternalServerError/>)
}
    
}
