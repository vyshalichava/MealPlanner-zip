import React from 'react';  
import "../../App.css";
import { Button,Modal} from 'react-bootstrap';  
class Demo extends React.Component {  
  constructor(){  
    super();  
    this.state={  
      show:false  
    }  
  }  
  handleModal(){  
    this.setState({show:!this.state.show})  
  }  
  render(){  
    return ( 
      <div>  
        <div className="modalClass">  
          <Button  onClick={()=>this.handleModal()} style={{marginLeft:'-700px'}}>subscribe in component............................................................</Button>  
        </div>  
      
          
        <Modal show={this.state.show} onHide={()=>this.handleModal()}>  
          <Modal.Header closeButton>SUBSCRIPTION</Modal.Header>  
          <Modal.Body>
       
          <p>The minimum meal price for vegetarian is Rs.1200/-</p>
          <p>The minimum meal price for non-vegetarian is Rs.2400/-</p>
           <p>Please select the meal type : </p>
           <input type="checkbox"/>
            <label>veg</label>
           <br></br>
           <input type="checkbox"/>
            <label>nonveg</label>
            <p>NOTE:</p>
           <p>
             The meal price will be deducted from your account according to the subscription chosen whether you take the meals or not.After the subscription amount is null you need to pay for the meal .
           </p>
          </Modal.Body>  
          <Modal.Footer>  
            <Button onClick={()=>this.handleModal()}>Yes</Button>  
            <Button onClick={()=>this.handleModal()}>No</Button>  
          </Modal.Footer>  
        </Modal>  
      </div>  
    )  
  }  
}  
export default Demo;  













// import React,{useState} from 'react';  
// //import './App.css';  
// import { Button,Modal} from 'react-bootstrap'; 

// export default function Example() {
//     const [show, setShow] = useState(false);
  
//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);
  
//     return (
//       <>
//         <Button variant="primary" onClick={handleShow}>
//           Launch demo modal
//         </Button>
  
//         <Modal show={show} onHide={handleClose}>
//           <Modal.Header closeButton>
//             <Modal.Title>Modal heading</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleClose}>
//               Close
//             </Button>
//             <Button variant="primary" onClick={handleClose}>
//               Save Changes
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </>
//     );
//   }
  
  













// import React from "react";
// import ReactDOM from "react-dom";

// class App2 extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       name: "",
//     };
//   }

//   render() {
//     return (
//       <div className="App">
//         <h1>Hello!! {this.state.name}</h1>
//         <a href="javascript:;">
//           Open Modal
//         </a>
//       </div>
//     );
//   }
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App2 />, rootElement);

// export default App2 











// import React from 'react';  
// import './App.css';  
// import { Button,Modal} from 'react-bootstrap';  

// export default function MyVerticallyCenteredModal(props) {
//     return (
//       <Modal
//         {...props}
//         size="lg"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title id="contained-modal-title-vcenter">
//             subscription
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//         <p>The minimum meal price for vegetarian is Rs.800/-</p>
//          <p>The minimum meal price for non-vegetarian is Rs.1400/-</p>
//           <p>Please select the meal type : </p>
//           <input type="checkbox"/>
//            <label>veg</label>
//           <br></br>
//           <input type="checkbox"/>
//            <label>nonveg</label>
//            <p>NOTE:</p>
//           <p>
//             The meal price will be deducted from your account according to the subscription chosen whether you take the meals or not.After the subscription amount is null you need to pay for the meal .
//           </p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button onClick={props.onHide}>Save</Button>
//           <Button onClick={props.onHide}>Close</Button>
  
//         </Modal.Footer>
//       </Modal>
//     );
//   }
  
//   export default function App1() {
//     const [modalShow, setModalShow] = React.useState(false);
  
//     return (
//       <>
//         <Button variant="primary" onClick={() => setModalShow(true)}>
//           Launch vertically centered modal
//         </Button>
  
//         <MyVerticallyCenteredModal
//           show={modalShow}
//           onHide={() => setModalShow(false)}
//         />
//       </>
//     );
//   }
  
//   render(<App1 />);