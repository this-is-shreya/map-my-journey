import MyNavbar from './MyNavbar'
import {Card } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Footer from './Footer'

const Landing = ()=>{
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(['jwt_token']);
    const mystyle = {
                width:"25rem",
                background: "rgba(255, 255, 255, 0.34)",
                borderRadius: "16px",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(3.5px)",
                border: "1px solid rgba(255, 255, 255, 0.2)" 
    }
    useEffect(()=>{
        if(cookies.jwt_token){
            navigate("/home")
        }
    },[cookies])
    
    return (
        <div>
            <MyNavbar/>

            <h2 className='text-center p-3'>Start mapping your journey today!</h2>
            <p className='text-center'>Map Your Journey is a free to use tool that allows
            you to map and view your journey in the form of linear graph</p>

            <div className='d-flex flex-column mb-3 flex-wrap justify-content-center'>
                
                <Card className="mx-auto d-block my-2" style={ mystyle }>
                <Card.Body className="text-center">
                    <Card.Title><FontAwesomeIcon icon="fa-regular fa-hand-point-right" />Add the event</Card.Title>
                    
                </Card.Body>
                <Card.Img variant="bottom" src={process.env.PUBLIC_URL +"/addevent.png"} />
                
                </Card>
                <Card className="mx-auto d-block my-2" style={mystyle}>
                <Card.Body className="text-center">
                    <Card.Title><FontAwesomeIcon icon="fa-regular fa-hand-point-right" />View your journey</Card.Title>
                    
                </Card.Body>
                <Card.Img variant="bottom" src={process.env.PUBLIC_URL +"/viewj.png"} />
                
                </Card>
                <Card className="mx-auto d-block my-2" style={mystyle}>
                <Card.Body className="text-center">
                    <Card.Title><FontAwesomeIcon icon="fa-regular fa-hand-point-right" />Earn badges</Card.Title>
                    
                </Card.Body>
                <Card.Img variant="bottom" src={process.env.PUBLIC_URL +"/badge.png"} />
                
                </Card>
                
            
            </div>
            <Footer/>

        </div>
    )
}

export default Landing