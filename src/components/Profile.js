import MyNavbar from "./MyNavbar"
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useEffect, useState } from "react";
import {Card} from 'react-bootstrap'

const Profile = ()=>{
  const navigate = useNavigate()

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
        arr.push(res.data.data.email)
        arr.push(res.data.data.starter_badge)
        arr.push(res.data.data.achiever_badge)
        arr.push(res.data.data.perseverance_badge)
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
            <div>
                <h4 className="text-center mt-4">Name: {userdata[4]} {userdata[5]}</h4>
                <h4 className="text-center">Email: {userdata[0]}</h4>
                <h3 className="p-5">Your Badges: </h3>
                    <br /> <br />
                <div className="d-flex flex-column flex-md-row mb-3 flex-wrap justify-content-center ">

                    

                {
                   userdata.map((ele,index,array)=>{
                    if(array.length == 1){
                        return (
                            <h4 className="text-muted text-center">No badges yet..</h4>
                        )
                    }
                    else if(index == 1 && ele == true){

                        return (

                            <Card key={index} className="mx-auto d-block my-2" style={{ width:"15rem"  }}>
                            <Card.Img variant="top" src={process.env.PUBLIC_URL +"/starter_badge.png"} />
                            <Card.Body className="text-center">
                                <Card.Title>Starter Badge</Card.Title>
                                
                            </Card.Body>
                            </Card>
                            
                        )
                    }
                    else if(index == 2 && ele == true){

                        return (
                            <Card key={index} className="mx-auto d-block my-2" style={{ width:"15rem"  }}>
                            <Card.Img variant="top" src={process.env.PUBLIC_URL +"/achiever_badge.png"} />
                            <Card.Body className="text-center">
                                <Card.Title>Achiever Badge</Card.Title>
                                
                            </Card.Body>
                            </Card>
                        )
                    }
                    else if(index == 3 && ele == true){

                        return (
                            <Card key={index} className="mx-auto d-block my-2" style={{ width:"15rem"  }}>
                            <Card.Img variant="top" src={process.env.PUBLIC_URL +"/perseverance_badge.png"} />
                            <Card.Body className="text-center">
                                <Card.Title>Perseverance Badge</Card.Title>
                                
                            </Card.Body>
                            </Card>
                        )
                    }
                   })
                    

                }

               
                </div>
            </div>
            
        </div>
    )
}

export default Profile