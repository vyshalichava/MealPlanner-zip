import { DialogTitle } from '@material-ui/core';
import React, { useState, useLayoutEffect } from 'react';
import Header from './Header'
import Dialog from '@material-ui/core/Dialog';
import './css/App.css'

export default function MealPrice (props){
    
    var { openMealPrice,closeMealPrice ,veg,nonVeg } = props;
    const {_veg,setVeg}=useState(veg)
    const {_nonVeg,setNonVeg}=useState(nonVeg);

   /**
    * Close the dialog box
    */
    function onClose(){
        closeMealPrice();
    }

    /**
     * This is used to open the MealPrice Dialog box
     * And still need to implement it
     * @returns returns a value .Depending upon the 'open'  value the render method of MealPrice will execute
     */
    function helper(){
       
        
        return openMealPrice
    }

    /**
     * 
     * 
     * Need to implement
     */
    function editVeg(){
        console.log("Editing")
        document.getElementById('veg').removeAttribute('disabled')
    }
    /**
     * 
     * 
     * Need to implement
     */
    function editNonVeg(){
        document.getElementById('nonVeg').removeAttribute('disabled')
    }

    /**
     *  This is a event listner used to store the changed veg and nonVeg price to database
     * Tha data is sent to the MealDetails in data folder(yet to be implemented) and from there the 
     * data is sent to API by put method
     */
    function savePrice(){
        veg=document.getElementById('veg').value;
        nonVeg=document.getElementById('nonVeg').value;
        //setVeg(document.getElementById('veg').value);
        onClose();
        
    }

    //create CSV file data in an array

   
 //create a user-defined function to download CSV file 
 function DownloadReport() {
    var csvFileData = [
        ['Alan Walker', 'Singer'],
        ['Cristiano Ronaldo', 'Footballer'],
        ['Saina Nehwal', 'Badminton Player'],
        ['Arijit Singh', 'Singer'],
        ['Terence Lewis', 'Dancer']
     ];
     //define the heading for each row of the data
     var csv = 'Name,Profession\n';
     
     //merge the data with CSV
     csvFileData.forEach(function(row) {
             csv += row.join(',');
             csv += "\n";
     });
  
     //display the created CSV data on the web browser 
     document.write(csv);
 
    
     var hiddenElement = document.createElement('a');
     hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
     hiddenElement.target = '_blank';
     
     //provide the name for the CSV file to be downloaded
     hiddenElement.download = 'Famous Personalities.csv';
     hiddenElement.click();
 }
        return(
            <>
            <Dialog aria-labelledby="simple-dialog-title" open={openMealPrice} onClose={onClose}  >
            <DialogTitle id="simple-dialog-title"> <h3>      Meal price</h3></DialogTitle>
            <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />       
        <div style={{width:'fit-content'}}>
        <form style={{width:'400px'}}>
        <label style={{marginLeft:'10%'}}  >Vegeterian price : </label>
        <input   size="2"  id="veg" name="fname" disabled defaultValue={veg} /><i   class='fa fa-pencil' style={{marginLeft:'2%'}} onClick={editVeg}></i><br/>
        <label  style={{marginLeft:'10%'}} for="lname">Non-vegeterian price:</label>
        <input   size="2"id='nonVeg' disabled  defaultValue={nonVeg}/> <i   class='fa fa-pencil' style={{marginLeft:'2%'}} onClick={editNonVeg}></i>
        
        </form>
         </div>

        <div>
            <br/>
            <button onClick={onClose} 
           style={{marginBottom:'5px',marginRight:'5px'}}
           class="btn btn-primary pull-right"  
            data-title="Back" data-toggle="modal" 
            data-target="#validate" > Save</button>

        <button onClick={savePrice} 
           style={{marginBottom:'5px',marginRight:'5px'}}
           class="btn btn-primary pull-right"  
            data-title="Back" data-toggle="modal" 
            data-target="#validate" > Back</button>
        </div>
        </Dialog>
            </>
        )
    
}