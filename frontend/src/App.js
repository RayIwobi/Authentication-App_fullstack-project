import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/Signup';
import Dashboard from './components/Authentication/Dashboard';
import UpdateDetails from './components/Authentication/UpdateDetails';
import ForgotPassword from './components/Authentication/ForgotPassword';

function Counter() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/update' element={<UpdateDetails/>}/>
          <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default Counter;