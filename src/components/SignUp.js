import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import { ToastContainer } from 'react-bootstrap';

const SignUp =()=> {
  const [cookies, setCookie] = useCookies(['jwt_token']);
  const [show,setShow] = useState(false)
  const toggleShow = () => setShow(!show);

  const [toast,setToast] = useState("")

  const navigate = useNavigate();

  const OnFormSubmit = (e) =>{

    e.preventDefault()
  
    axios.post(`${process.env.REACT_APP_SERVER_URL}auth/signup`,{
      first_name:e.target[0].value,
      last_name:e.target[1].value,
      email:e.target[2].value,
      password:e.target[3].value
    }).then(res=>{
      
      // console.log(res.data.message);
      if(res.status === 200){
        const token = `Bearer ${res.data.token}`
        setCookie("jwt_token",token,{ path: '/' })
        navigate("/home")
        
      }
      
    }).catch(error=>{
      console.log(error.response.data);
      setShow(true)
      setToast(error.response.data.message)
    })
  }
  return (
    <div>
    <div className="mx-auto col-md-4 col-md-offset-4">
    <h2 className="mt-5 text-center"><u>SignUp</u></h2><br />
    <Form onSubmit={OnFormSubmit}>
        <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" placeholder="First Name" required/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Last Name" required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" required/>
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" required/>
      </Form.Group>
      
      <Button variant="primary" type="submit" className="w-100 mb-4">
        SignUp
      </Button>
    </Form>

    <ToastContainer position='bottom-center'>
      <Toast show={show} onClose={toggleShow}>
        <Toast.Header>
          <Toast.Body>{toast}</Toast.Body>
        </Toast.Header>
      </Toast>
    </ToastContainer>
</div>


</div>
  );
}


export default SignUp;