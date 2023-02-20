import axios from 'axios';
import {Image, Accordion} from 'react-bootstrap'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Insights = (props)=>{
  const navigate = useNavigate()

  const [cookies, setCookie] = useCookies(['jwt_token']);
  if(cookies.jwt_token == undefined){
    navigate("/")
  }
  const [triedArray,setTriedArray] = useState([])
  const [achievedArray,setAchievedArray] = useState([])
  const [diffArray,setDiffArray] = useState([])
  const [image,setImage] = useState("")
  const month_earlier = new Date(Date.now() - 1000*60*60*24*30)
  let y = month_earlier.getFullYear(),m = month_earlier.getMonth()+1,d = month_earlier.getDate();

  if(month_earlier.getMonth() < 10){
    m = "0"+(month_earlier.getMonth()+1)
  }
  if(month_earlier.getDate()<10){
    d = "0"+month_earlier.getDate()
  }
   
    
  useEffect(()=>{
    
    if(props.type.data == undefined){
      // if(props.image == undefined){
      //   setImage(process.env.PUBLIC_URL +"/ok.svg")
      // }
      // else{
      //   console.log("ppp")
      //   setImage(process.env.PUBLIC_URL +props.image)

      // }


      axios.get(`${process.env.REACT_APP_SERVER_URL}user/get-maps/${y}-${m}-${d}`,{
        headers:{
          Authorization:cookies.jwt_token
        }
      }).then(res=>{
        if(res.status == 200){
          setTriedArray(res.data.data.tried)

          setAchievedArray(res.data.data.achieve)
          setDiffArray(res.data.data.diff)

          

        }
        
        // console.log("entered monthly")
      }).catch(error=>{
        console.log(error)
      })
    }
    else{

      setTriedArray(props.type.data.data.tried)

      setAchievedArray(props.type.data.data.achieve)
      setDiffArray(props.type.data.data.diff)

      
    }
      
    
  },[props.type])
  
return (
  
    <div className="d-flex flex-row flex-wrap justify-content-center mt-3">
     <div className='w-70'>
    <Image src={props.image} className='w-100' ></Image>


    </div>
    <div >
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>You have tried {triedArray.length} new thing(s)</Accordion.Header>
        <Accordion.Body>
          <ul>
            {
              triedArray.map((ele,index)=>{
                if(ele[1] != ''){
                  return(
                  <li key={index}>
                    {ele[0]} - {ele[1]}
                  </li>
                )
              
                }
                else{
                  return(
                  <li key={index}>
                    {ele[0]}
                  </li>
                )
              
                }
              })
            }
          </ul>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>You have achieved {achievedArray.length} thing(s)</Accordion.Header>
        <Accordion.Body>
        <ul>
            {
              achievedArray.map((ele,index)=>{
                if(ele[1] != ''){
                  return(
                  <li key={index}>
                    {ele[0]} - {ele[1]}
                  </li>
                )
              
                }
                else{
                  return(
                  <li key={index}>
                    {ele[0]}
                  </li>
                )
              
                }
              })
            }
          </ul>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>You have faced {diffArray.length} obstacle(s)</Accordion.Header>
        <Accordion.Body>
        <ul>
            {
              diffArray.map((ele,index)=>{
                if(ele[1] != ''){
                  return(
                  <li key={index}>
                    {ele[0]} - {ele[1]}
                  </li>
                )
              
                }
                else{
                  return(
                  <li key={index}>
                    {ele[0]}
                  </li>
                )
              
                }
              })
            }
          </ul>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
        
    </div>
    
     
    </div>
          
  
)
}
export default Insights;