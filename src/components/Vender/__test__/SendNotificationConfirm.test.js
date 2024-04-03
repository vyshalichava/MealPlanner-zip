import { render } from '@testing-library/react'
import React from 'react'
import reactDom from 'react-dom'
import {SaveSubmit,DownloadConfirm , InvalidUser} from './../SendNotificationConfirm'
import renderer from 'react-test-renderer'
// test('confirm submit ',()=>{
//     const div=document.createElement('div')
//     reactDom.render(<SaveSubmit></SaveSubmit>,div)
// })


//Dont leave with out saving
test ('confirm save submit with props',()=>{
    const div=document.createElement('div')
    reactDom.render(<SaveSubmit></SaveSubmit>,div)
    //const {getByTestId}=render(<SaveSubmit doSave={true} ></SaveSubmit>)

})

test('test download confirm',()=>{
   
    const tree=renderer.create(<DownloadConfirm doSave={true} ></DownloadConfirm>).toJSON();
    expect(tree).toMatchSnapshot();
})


test('invalid user',()=>{
    const tree=renderer.create(<InvalidUser doSave={true} ></InvalidUser>).toJSON();
    expect(tree).toMatchSnapshot();

})

