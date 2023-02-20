import {Container, Navbar, Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown';
import Avatar from 'react-avatar'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useEffect, useState } from 'react';
const MyNavbar = (props) => {

  const navigate = useNavigate()
  
  const loggedIn = props.loggedIn
  const [cookies, setCookie, removeCookie] = useCookies(['jwt_token']);
  const [name,setName] = useState("")
    useEffect(()=>{
      if(cookies.jwt_token !== undefined){

      
      axios.get(`${process.env.REACT_APP_SERVER_URL}user/get-user`,{
          headers:{
              Authorization:cookies.jwt_token
          }
        }).then(res=>{
          setName(res.data.data.first_name +" "+res.data.data.last_name)
        }).catch(err=>{
          console.log(err)
        })
      }
    },[cookies.jwt_token])
  
  const Logout = ()=>{

    removeCookie('jwt_token',{path:'/'});
    
    navigate("/")
    
  }
  const Home = ()=>{
    navigate("/home")
  }
  const Profile = ()=>{
    navigate("/profile")
  }
  if(loggedIn === "true"){
    return (
      <>
      
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand>Map My Journey</Navbar.Brand>
          <Nav className="justify-content-end">
          <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            <Avatar name={name} size="40"/>
          </Dropdown.Toggle>

          <Dropdown.Menu align='end'>
          <Dropdown.Item  onClick={Home}>Home</Dropdown.Item>

            <Dropdown.Item  onClick={Profile}>Profile</Dropdown.Item>

            <Dropdown.Item  onClick={Logout}>Logout</Dropdown.Item>
            
          </Dropdown.Menu>
        </Dropdown>
          
          </Nav>

        </Container>
      </Navbar>
    </>
    )
  }

  return (
    <>
      
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand>Map My Journey</Navbar.Brand>
          <Nav className="justify-content-end">
          <LinkContainer to="/login">
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/signup">
            <Nav.Link to="/signup">Signup</Nav.Link>
          </LinkContainer>
          </Nav>

        </Container>
      </Navbar>
    </>
  );
}

export default MyNavbar;