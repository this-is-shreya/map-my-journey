import axios from 'axios'
import { useEffect, useState } from 'react'
import {Button, Form, Modal} from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const Badge = (props)=>{
    const navigate = useNavigate()
    const [show,setShow] = useState(false)
    const handleClose = ()=> setShow(!show)
    const [cookies, setCookie] = useCookies(['jwt_token']);
    const [badge, setBadge] = useState("Starter")
    const [image,setImage] = useState(process.env.PUBLIC_URL + "/starter.svg")
    if(!cookies.jwt_token){
      navigate("/")
    }
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_SERVER_URL}user/get-user`,{
            headers:{
                Authorization:cookies.jwt_token
            }
        }).then(res=>{
            if( res.data.data.starter_badge !== true){
                setBadge("Starter")
                setShow(true)
                console.log(cookies.jwt_token)
                axios.put(`${process.env.REACT_APP_SERVER_URL}user/modify-badge`,{},{
                    headers:{
                        Authorization:cookies.jwt_token
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
            else if(res.data.data.overall_score >= 50 && res.data.data.achiever_badge !== true){
                setBadge("Acheiver")
                setShow(true)
                axios.put(`${process.env.REACT_APP_SERVER_URL}user/modify-badge`,{},{
                    headers:{
                        Authorization:cookies.jwt_token
                    }
                }).catch(err=>{
                    console.log(err)
                })
      
                setImage(process.env.PUBLIC_URL + "/achiever.svg")
            }
            else if(res.data.data.overall_score >= 100 && res.data.data.perseverance_badge !== true){
                setBadge("Perseverance")
                setShow(true)
                axios.put(`${process.env.REACT_APP_SERVER_URL}user/modify-badge`,{},{
                    headers:{
                        Authorization:cookies.jwt_token
                    }
                }).catch(err=>{
                    console.log(err)
                })
      
                setImage(process.env.PUBLIC_URL + "/perseverance.svg")
            }
        })
        
    },[cookies])
    
    
return (
<Modal show={show} onHide={handleClose} className='modal-sm'>
        <Modal.Header closeButton>
          
        </Modal.Header>
        <br />
        <Modal.Title> <h2 className="text-center">Congratulations!</h2></Modal.Title>

        <Modal.Body>
        <Image src={image}></Image>
            <h3 className='text-center'>You have earned the {badge} Badge!</h3>
        </Modal.Body>
       
      </Modal>
)
}
export default Badge