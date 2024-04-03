import React from "react";
import './../loginForm'
import {isTSAnyKeword} from '@babel/types';
import reactDom from "react-dom";
import { render ,getByTestId} from "@testing-library/react";
import '@testing-library/jest-dom'
import Employee from './../data/Employee'
import LoginForm from "./../loginForm";
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer'
import EmployeeMealDetails from "./../../Vender/EmployeeMealDetails";
import { fireEvent } from "@testing-library/dom";


 test('add',()=>{
     
 const add = jest.fn((x,y)=>3)
     console.log(add(1,2),'printing add function')
     expect(add(1,2)).toBe(3);
     expect(add).toHaveBeenCalledTimes(2);
 })

//  it('Login click event', () => {
//     const mockCallBack = jest.fn();
//     const {getByTestId} = render(<LoginForm></LoginForm>)
    
//   });

it("calls onLogin when button clicked", () => {
   
    const {container  }=  render(<LoginForm ></LoginForm>);
    console.log('line no 31 in login test')
  
    
    const userid=getByTestId(container ,'userid')
    const usertype=getByTestId(container ,'usertype')
    const signin=getByTestId(container ,'signin')
    expect(userid.textContent).toBe('')
    console.log(userid)
    const password=getByTestId(container ,'password')
    fireEvent.change(userid, { target: { value: '1' } });
    fireEvent.change(password, { target: { value: 'Abc12345' } });
    fireEvent.change(usertype,{target: { value: 'vendor' } });
    expect(userid.textContent).toBe('1')
    fireEvent.click(signin);
    expect(window.localStorage.getItem("role")).toBe(null);
    
    

  });