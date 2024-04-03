import React, { useEffect,useState  } from 'react';
import reactDom from 'react-dom';
import InvalidUser from './SessionOut';

// User has switched back to the tab


// User has switched away from the tab (AKA tab is hidden)
const onBlur = () => {
  // console.log('Tab is blurred')
  
};

function FocusHandler  (props)  {
    const {invaludUser,setInvalidUser}=useState(false)
    const onFocus = () => {
       
        
        if(localStorage.getItem('validUser')!=null&&(
        localStorage.getItem('validUser').includes(false) ||
        localStorage.getItem('validUser').includes('false'))){
          localStorage.setItem('sessionTimeOut',true);

        }
      };
  
  useEffect(() => {
    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);
    // Specify how to clean up after this effect:
    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
          
    };
  });

  return <>
  </>;
};

export default FocusHandler;