import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
import { ToastContainer } from 'react-bootstrap';

const Login=()=> {
  const navigate = useNavigate()
  const [toast,setToast] = useState("")

  const [cookies, setCookie] = useCookies(['jwt_token']);

  const [show,setShow] = useState(false)
  const toggleShow = () => setShow(!show)

  const OnFormSubmit = (e) =>{
    e.preventDefault()
  
    axios.post(`${process.env.REACT_APP_SERVER_URL}auth/login`,{
      email:e.target[0].value,
      password:e.target[1].value
    }).then(res=>{
      
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
    <h2 className="mt-5 text-center"><u>Login</u></h2><br />
    <Form onSubmit={OnFormSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" placeholder="Enter email" />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" placeholder="Password" />
      </Form.Group>
      
      <Button variant="primary" type="submit" className="w-100">
        Login
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

export default Login;