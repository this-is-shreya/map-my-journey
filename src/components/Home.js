import {Button} from 'react-bootstrap'
import MyNavbar from './MyNavbar';
import {LinkContainer} from 'react-router-bootstrap'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useEffect, useState } from "react";

const Home = () =>{
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(['jwt_token']);
  if(cookies.jwt_token == undefined){
    navigate("/")
  }
  const [userdata,setUserData] = useState([])

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_SERVER_URL}user/get-user`,{
        headers:{
            Authorization:cookies.jwt_token
        }
      }).then(res=>{
        let arr=[]
        arr.push(res.data.data.first_name)
        arr.push(res.data.data.last_name)
        setUserData(arr)
      }).catch(err=>{
        console.log(err)
      })
  },[cookies.jwt_token])

    return (
        <div>
            <MyNavbar loggedIn="true"/>
            <h2 className="p-2 text-center">Hi {userdata[0]} {userdata[1]}!</h2>
            <br />
            <p className="p-3 text-center fs-3">What would you like to do?</p>
            
            <div className="btn-group position-absolute top-50 start-50 translate-middle">
            <LinkContainer to="/add-event">
            <Button variant="info">Add an event</Button>
            </LinkContainer>
            <br />
            <LinkContainer to="/view-journey">
            <Button variant="light">View your journey</Button>
            </LinkContainer>
            </div>
            
        </div>

    )
}

export default Home;