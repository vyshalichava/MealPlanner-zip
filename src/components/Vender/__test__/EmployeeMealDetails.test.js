import EmployeeMealDetails from "../EmployeeMealDetails";
import { render } from '@testing-library/react'
import renderer from 'react-test-renderer'


test("demo",()=>{

    const component=renderer.create(<EmployeeMealDetails ></EmployeeMealDetails>).getInstance()
    const domComponent=render(<EmployeeMealDetails ></EmployeeMealDetails>)
   
    let tree=component.bond();
    expect(tree).toBe('hello')
  
})