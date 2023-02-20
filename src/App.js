import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login'
import SignUp from './components/SignUp'
import Landing from './components/Landing'
import Home from './components/Home'
import AddEvent from './components/AddEvent'
import EditEvent from './components/EditEvent'
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import ViewJourney from './components/ViewJourney';
import Profile from './components/Profile';
function App() {
  
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landing/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/add-event" element={<AddEvent/>}></Route>
        <Route path="/edit-event/:id" element={<EditEvent/>}></Route>
        <Route path="/view-journey" element={<ViewJourney/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>

      </Routes>
    </Router>
  );
}

export default App;
