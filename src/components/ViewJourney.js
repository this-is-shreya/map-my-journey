import React, { useEffect, useState } from 'react';
import {Line} from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement} from 'chart.js'
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MyNavbar from './MyNavbar'
import Insights from './Insights'
import Badge from './Badge';

const ViewJourney = () =>{
  const navigate = useNavigate()
  const [timeperiod,setTimePeriod] = useState("monthly")
    const [cookies, setCookie] = useCookies(['jwt_token']);
    if(cookies.jwt_token == undefined){
      navigate("/")
    }
    
    
    ChartJS.register(CategoryScale)
    ChartJS.register(LinearScale)
    ChartJS.register(LineElement)
    ChartJS.register(PointElement)
    const [label,setLabel] = useState([])
    const [score,setScore] = useState([])
    const [image,setImage] = useState(process.env.PUBLIC_URL+"/ok.svg")
    const sendData =(e)=>{

      let mydate = new Date().getTime() - 1000*60*60*24*30
      mydate = new Date(mydate)
      let y,m = (mydate.getMonth()+1),d = mydate.getDate() 
      y = mydate.getFullYear()
        if(m < 10){
          m = "0"+(mydate.getMonth()+1)
        }
        if(mydate.getDate()<10){
          d = "0"+mydate.getDate()
        }
      if(e.target.value === "monthly"){
        
        axios.get(`${process.env.REACT_APP_SERVER_URL}user/get-maps/${y}-${m}-${d}`,{
          headers:{
            Authorization:cookies.jwt_token
          }
        }).then(res=>{
          if(res.data.data.diff.length > 0 && res.data.data.tried.length === 0 && res.data.data.achieve.length === 0){

            setImage(process.env.PUBLIC_URL + "/cheer_up.svg")
          }
          else if(res.data.data.achieve.length > 0 && res.data.data.tried.length > 0 && res.data.data.diff.length === 0){
            
            setImage(process.env.PUBLIC_URL +"/mic_drop.svg")
          }
          
          setTimePeriod(res)
          // console.log("entered monthly")
        }).catch(error=>{
          console.log(error)
        })
        

        axios.get(`${process.env.REACT_APP_SERVER_URL}user/get-events/${y}-${m}-${d}`,{
        headers:{
          Authorization:cookies.jwt_token
        }
      }).then(res=>{
        // console.log(res)
        if(res.data.data.length > 0){

        for(let i=0;i<res.data.data.length;i++){
          if(!label.includes(res.data.data[i].date)){
            // console.log("ent->",label,res.data.data[0].data[i].date)

            setLabel([...label,res.data.data[i].date])
          
              setScore([...score,res.data.data[i].score])
              // console.log(score)
          }
             
            }
  
      }
    }).catch(err=>{
          console.log('error '+err)
        })
      }
      else{
        mydate = new Date()
        let y = mydate.getFullYear()-1, m = (mydate.getMonth()+1), d= mydate.getDate()
        if(m < 10){
          m = "0"+(mydate.getMonth()+1)
        }
        if(mydate.getDate()<10){
          d = "0"+mydate.getDate()
        }
        axios.get(`${process.env.REACT_APP_SERVER_URL}user/get-maps/${y}-${m}-${d}`,{
          headers:{
            Authorization:cookies.jwt_token
          }
        }).then(res=>{
          setTimePeriod(res)
          if(res.data.data.diff.length > 0 && res.data.data.tried.length === 0 && res.data.data.achieve.length === 0){

            setImage(process.env.PUBLIC_URL + "/cheer_up.svg")
          }
          else if(res.data.data.achieve.length > 0 && res.data.data.tried.length > 0 && res.data.data.diff.length === 0){
            
            setImage(process.env.PUBLIC_URL +"/mic_drop.svg")
          }
          // console.log("entered monthly")
        }).catch(error=>{
          console.log(error)
        })

        axios.get(`${process.env.REACT_APP_SERVER_URL}user/get-events/${y}-${m}-${d}`,{
        headers:{
          Authorization:cookies.jwt_token
        }
      }).then(res=>{
        if(res.data.data.length > 0){

        for(let i=0;i<res.data.data.length;i++){
          if(!label.includes(res.data.data[i].date)){

            setLabel([...label,res.data.data[i].date])
          
              setScore([...score,res.data.data[i].score])
          }
             
            }
  
      }
    }).catch(err=>{
          console.log('error '+err)
        })
      }
    }

    useEffect(()=>{
      
    const month_earlier = new Date(Date.now() - 1000*60*60*24*30)
    let y,m = month_earlier.getMonth()+1,d = month_earlier.getDate();
    y = month_earlier.getFullYear()

    if(month_earlier.getMonth() < 10){
      m = "0"+(month_earlier.getMonth()+1)
    }
    if(month_earlier.getDate()<10){
      d = "0"+month_earlier.getDate()
    }
    

    axios.get(`${process.env.REACT_APP_SERVER_URL}user/get-maps/${y}-${m}-${d}`,{
      headers:{
        Authorization:cookies.jwt_token
      }
    }).then(res=>{
      if(res.status === 200){
        
        if(res.data.data.diff.length > 0 && res.data.data.tried.length === 0 && res.data.data.achieve.length === 0){

          setImage(process.env.PUBLIC_URL + "/cheer_up.svg")
        }
        else if(res.data.data.achieve.length > 0 && res.data.data.tried.length > 0 && res.data.data.diff.length === 0){
          
          setImage(process.env.PUBLIC_URL +"/mic_drop.svg")
        }

      }
      
    }).catch(error=>{
      console.log(error)
    })

      axios.get(`${process.env.REACT_APP_SERVER_URL}user/get-events/${y}-${m}-${d}`,{
        headers:{
          Authorization:cookies.jwt_token
        }
      }).then(res=>{
        if(res.data.data.length > 0){

        for(let i=0;i<res.data.data.length;i++){
          if(!label.includes(res.data.data[i].date)){

            setLabel([res.data.data[i].date,...label])
          
              setScore([res.data.data[i].score,...score])
          }
             
            }
  
      }
    }).catch(err=>{
          console.log('error '+err)
        })
    },[cookies.jwt_token,label,score,cookies.date])
    
      
    //  
      // console.log(label,score)
      
    //
    const state = ({
      labels: label,
      datasets: [
        {
          
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,2)',
          borderWidth: 1,
          data: score
        }
      ],
      
    })
      // console.log(state)
    return (
      <div>
      <MyNavbar loggedIn="true"/>
      <select onChange={sendData} className='mx-3 my-4'>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
      <Line style={{maxWidth:"70%", margin:"0 20%"}}
          data={state}
          options={{
            title:{
              display:true,
              text:"Your Journey",
              fontSize:2
            },
            legend:{
              display:true,
              position:'right'
            },
            
            scales: {
              x: {
                ticks: {
                display: false,
              },
                grid: {
                  display: false
                }
              },
              y: {
                ticks: {
                display: false,
              },
                grid: {
                  display: false
                }
              }
            }
          }}
          />
      
          <Badge/>
          
          <Insights type={timeperiod} image={image}/>
          
      </div>
        
    );
  }

export default ViewJourney