import MyNavbar from "./MyNavbar"
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useEffect, useState } from "react";
import {Card, Button, Modal} from 'react-bootstrap'

const Profile = ()=>{
  const navigate = useNavigate()

  const [cookies, setCookie, removeCookie] = useCookies(['jwt_token']);
  if(cookies.jwt_token == undefined){
    navigate("/")
  }
  const [userdata,setUserData] = useState([])
  const [show,setShow] = useState(false)
  const showModal = () => setShow(true)
  const hideModal = ()=> setShow(false)

  const handleDeleteAccount = ()=>{
    axios.delete(`${process.env.REACT_APP_SERVER_URL}user/delete-account`,
    {headers:{
        Authorization:cookies.jwt_token
    },
    },{}
    ).then(res=>{
        if(res.status == 200){
            removeCookie('jwt_token',{path:'/'});
            
            navigate("/")
        }
    }).catch(error=>{
        console.log(error)
    })
  }

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
            <div className="text-center">
                <h4 className="mt-4">Name: {userdata[4]} {userdata[5]}</h4>
                <h4>Email: {userdata[0]}</h4>
                <h3 className="p-5">Your Badges: </h3>
                    <br /> <br />
                <div className="d-flex flex-column flex-md-row mb-3 flex-wrap justify-content-center ">

                    

                {
                   userdata.map((ele,index,array)=>{
                    if(index===0 && array[1] === false){
                        return (
                            <h4 key={index} className="text-muted">No badges yet..</h4>
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
            <Button variant="danger" className="w-50 mx-auto d-block mt-4 mb-3" onClick={showModal}>
                    Delete Account
                </Button>

            <Modal show={show} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>We will miss you🥺</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteAccount}>
            Yes
          </Button>
          <Button variant="light" onClick={hideModal}>
            No
          </Button>
          
        </Modal.Footer>
      </Modal>
        </div>
    )
}

export default Profile