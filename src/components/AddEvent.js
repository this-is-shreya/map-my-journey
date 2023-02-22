import {Button, Form, Modal} from 'react-bootstrap'
import MyNavbar from './MyNavbar'
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Toast from 'react-bootstrap/Toast';
import { ToastContainer } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";

const AddEvent = () => {
    
    let [new_date,setNew_Date] = useState(new Date())

    const [showToast,setShowToast] = useState(false)
    const toggleShow = () => setShowToast(!showToast)
    const [toast,setToast] = useState("")
    const [position, setPosition] = useState("top-center")
    // console.log(new_date.current);
    // new_date.current.datepicker.endDate = tomorrow
    const [new_ref,setNewRef] = useState([])
    const new_d = useRef(null)
    const [achieve,setAchieve] = useState([])
    const achieve_d = useRef(null)
    const [diff,setDiff] = useState([])
    const diff_d = useRef(null)
    const new_d_span=useRef(null)
    const achieve_d_span=useRef(null)
    const diff_d_span=useRef(null)

    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const [id,setId] = useState("")
    const handleClose = () => {setShow(false); navigate("/")}
    const handleRedirect = ()=>{
      navigate("/view-journey")
    }
    const handleEdit = ()=>{
      navigate(`/edit-event/${id}`)
    }
    const [cookies, setCookie] = useCookies(['jwt_token']);
    if(cookies.jwt_token == undefined){
      navigate("/")
    }
    // console.log(new_date.getMonth()+1)
    let y,m = new_date.getMonth()+1,d = new_date.getDate();
    y = new_date.getFullYear()
  // console.log(y,m,d);

    if(new_date.getMonth() < 10){
      m = "0"+(new_date.getMonth()+1)
    }
    if(new_date.getDate()<10){
      d = "0"+new_date.getDate()
    }
    useEffect(()=>{
      

        axios.get(`${process.env.REACT_APP_SERVER_URL}user/get-specific-event/${y+"-"+m+"-"+d}`,{
          headers:{
            Authorization:cookies.jwt_token
          }
        }).then(data=>{
          if(data.data.data.length > 0){
            setShow(true)
            setId(data.data.data[0]._id)
          }

        }).catch(error=>{
          console.log(error)
        })

    },[cookies.jwt_token])

    const CountChars = (a,e)=>{
      if(a === "n")
      new_d_span.current.innerHTML = "("+(e.target.value.length)+"/150)"
      else if(a === "achieve")
      achieve_d_span.current.innerHTML = "("+(e.target.value.length)+"/150)"
      else
      diff_d_span.current.innerHTML = "("+(e.target.value.length)+"/150)"
      
    }
    const checkLength = (e)=>{
      if(e.target.value.length > 149){
        if(e.key !== "Backspace" && e.key !== "Delete"){
          e.preventDefault()

        }
      }
    }

    const selectVal = (a,e)=>{
      let options = e.target.options;
      let value = [];
      for (let i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }

      if(a == "n"){

        setNewRef(value)

      }
      else if(a=="a"){

        setAchieve(value)
      }
      else{
        setDiff(value)
      }

      // console.log(new_ref,achieve,diff)
    }

    const handleSubmit = () => {
      if(new_ref.length === 0 && new_d.current.value !== "" ) {
        setToast("You have not selected any category")
        setPosition("bottom-center")
        setShowToast(true)
      }
      else if(diff.length === 0 && diff_d.current.value !== "" ){
        setToast("You have not selected any category")
        setPosition("bottom-center")
        setShowToast(true)
      }
      else if(achieve_d.current.value !== "" && achieve.length === 0){
        setToast("You have not selected any category")
        setPosition("bottom-center")
        setShowToast(true)
      }
      else{
        let mydate = new Date()
        let y,m = mydate.getMonth()+1,d = mydate.getDate();
        y = mydate.getFullYear()
      // console.log(y,m,d);

        if(mydate.getMonth() < 10){
          m = "0"+(mydate.getMonth()+1)
        }
        if(mydate.getDate()<10){
          d = "0"+mydate.getDate()
        }
        
      axios.post(`${process.env.REACT_APP_SERVER_URL}user/add-event`,
      
      {
        
      date:y+"-"+m+"-"+d,
      new_cat:new_ref,
      new_d:new_d.current.value,
      achieve_cat:achieve,
      achieve_d:achieve_d.current.value,
      diff_cat:diff,
      diff_d:diff_d.current.value

    },{
      headers:{
        Authorization:cookies.jwt_token
      },
    }).then(res=>{
      
      if(res.status === 200){
        navigate("/view-journey")
        
      }
      
    }).catch(error=>{
      console.log(error.response.data);
    })
      
  }
  
    }
    return (
        <div>
            <MyNavbar loggedIn="true"/>
            <div className="mx-auto col-md-4 col-md-offset-4">
              <Form className="mt-5 mb-5">
              <Form.Group className="mb-3">
                  <Form.Label>Today's Date: </Form.Label>
                  <DatePicker selected={new_date} disabled/>
                  
                </Form.Group>
      

      <Form.Group className="mb-3">
        <Form.Label>Did you do something new?</Form.Label><br/>
        <select onChange={(e)=>selectVal("n",e)} multiple>
            {/* <option value="--">Pick a category</option> */}
            <option value="learnt skill">Learnt a new skill 🎯</option>
            <option value="explored">Explored 🔭</option>
            <option value="tried something">Just tried something different 🪁</option>
        </select><br />
        <Form.Label className="mt-3">Describe it</Form.Label><br/>

        <Form.Control type="text" ref={new_d} placeholder="Describe" onKeyDownCapture={checkLength} onKeyUpCapture={(e)=>CountChars("n",e)}/>
        <span className="badge rounded-pill text-bg-light" ref={new_d_span}>(0/150)</span>
      </Form.Group>
      <hr />
      <Form.Group className="mb-3">
        <Form.Label>Did you achieve something?</Form.Label><br/>
        <select onChange={(e)=>selectVal("a",e)} multiple>
            {/* <option value="--">Pick a category</option> */}
            <option value="biggest achievement">My biggest achievement so far 🏆</option>
            <option value="got appreciated">Got appreciated for my work 🌟</option>
            <option value="worked on goal">Finally worked on my goal(s) 🏁</option>
            <option value="habit">Related to habit(s) 🤹🏻‍♀️</option>
            <option value="other">Other 🎖️</option>
        </select><br />
        <Form.Label className="mt-3">Describe it</Form.Label><br/>

        <Form.Control type="textarea" ref={achieve_d} placeholder="Describe" onKeyDownCapture={checkLength} onKeyUpCapture={(e)=>CountChars("achieve",e)}/>
        <span className="badge rounded-pill text-bg-light" ref={achieve_d_span}>(0/150)</span>
      </Form.Group>
      <hr />
      <Form.Group className="mb-3">
        <Form.Label>Faced any difficulties?</Form.Label><br/>
        <select onChange={(e)=>selectVal("d",e)} multiple>
            {/* <option value="--">Pick a category</option> */}
            <option value="failed">Failed at a given task 😔</option>
            <option value="work load">High work load 😥</option>
            <option value="job-related">Job-related 💼</option>
            <option value="other">Other 🏃🏻</option>
        </select><br />
        <Form.Label className="mt-3">Describe it</Form.Label><br/>

        <Form.Control type="text" ref={diff_d} placeholder="Describe" onKeyDownCapture={checkLength} onKeyUpCapture={(e)=>CountChars("d",e)}/>
        <span className="badge rounded-pill text-bg-light" ref={diff_d_span}>(0/150)</span>
      </Form.Group>
      
      <Button variant="primary" className="w-100" onClick={handleSubmit}>
        Save
      </Button>
    </Form>

    <ToastContainer position={position}>
      <Toast show={showToast} onClose={toggleShow}>
        <Toast.Header>
          <Toast.Body>{toast}</Toast.Body>
        </Toast.Header>
      </Toast>
    </ToastContainer>
</div>
 <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>You have already added an event for today, do you want to edit it?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEdit}>
            Yes
          </Button>
          <Button variant="light" onClick={handleRedirect}>
            No
          </Button>
          
        </Modal.Footer>
      </Modal>
        </div>
    )
}

export default AddEvent