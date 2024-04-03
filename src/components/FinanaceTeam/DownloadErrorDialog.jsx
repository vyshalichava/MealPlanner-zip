import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';



export default function DownloadErrorDialog(props){
    const {open , closeWindow ,download}=props
   
    function goBack(){
      closeWindow()
    }
    
     return (
       <>
     <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
     <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
     <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
     
     <Dialog onClose={closeWindow} aria-labelledby="simple-dialog-title" open={open}>
         <DialogTitle id="simple-dialog-title"><h3 style={{textAlign: "center"}}>Download Error<i class="fa fa-exclamation-triangle" style={{color:'red'}}></i></h3></DialogTitle>
         <div style={{marginLeft:'15px'}}>
           <span style={{marginLeft:'5px'}}>Please try after some time</span>
         </div>
            <div>
              <br/>
              <div>
               <button onClick={goBack} 
              style={{marginBottom:'5px',marginRight:'5px'}}
              class="btn btn-primary pull-right"  
               data-title="Back" data-toggle="modal" 
               data-target="#validate" > Back</button>
              </div>
            </div>
       </Dialog> 
     </>
   );
   }
   
   function ConfirmDownload(props){
    const {open , closeWindow ,download}=props
   
    function goBack(){
      closeWindow()
    }
    function downloadReport(){
      download()
      closeWindow()
    }

    
     return (
       <>
     <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
     <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
     <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
     
     <Dialog onClose={closeWindow} aria-labelledby="simple-dialog-title" open={open}>
         <DialogTitle id="simple-dialog-title"><h3 style={{textAlign: "center"}}>Confirm download </h3></DialogTitle>
         <div style={{marginLeft:'15px'}}>
           <span style={{marginLeft:'5px'}}>Complete data wii be downloaded in 'CSV' format</span>
         </div>
            <div>
              <br/>
              <div>
            
               <button onClick={downloadReport} 
              style={{marginBottom:'5px',marginRight:'5px'}}
              class="btn btn-primary pull-right"  
               data-title="Back" data-toggle="modal" 
               data-target="#validate" > Download</button>

              <button onClick={goBack} 
              style={{marginBottom:'5px',marginRight:'5px'}}
              class="btn btn-primary pull-right"  
               data-title="Back" data-toggle="modal" 
               data-target="#validate" > Cancel</button>
              </div>
            </div>
       </Dialog> 
     </>
   );
   }

   export {ConfirmDownload}