import {Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = ()=>{
    return (
        <Card className='footer w-100 bottom-0 position-fixed'>
        <Card.Body className="text-center">
            <p className="text-center p-3"> 2023 <FontAwesomeIcon icon="fa-solid fa-copyright" /> <a href="https://www.instagram.com/this_is_code_cafe/"><FontAwesomeIcon icon="fa-brands fa-instagram" /></a> <a href="https://youtube.com/@this-is-code-cafe"> <FontAwesomeIcon icon="fa-brands fa-youtube" /></a> <a href="https://storyset.com/"> Storyset</a> <a href="https://icons8.com/"> Icons8</a>
            </p>
            
        </Card.Body>
        
        </Card>
        
    
    
    )
}

export default Footer