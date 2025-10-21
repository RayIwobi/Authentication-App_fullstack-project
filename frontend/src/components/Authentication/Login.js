import React, { useEffect, useState } from 'react'
import './authentic.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


//message notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
        const navigate = useNavigate()

        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')

        const [message, setMessage] = useState('')


        
        useEffect(() => {
             axios.get('https://authentication-app-fullstack-project-2.onrender.com/auth/verify', {withCredentials:true})
            //axios.get('http://localhost:10000/auth/verify', {withCredentials:true})
            .then(res => {
                if (res.data.status === true){
                        navigate('/dashboard')
                }
            })
            .catch(err => err)
                
        },[navigate])

        

        axios.defaults.withCredentials = true   //must be added to prevent error generation from backend
        const handleLogin = (e) => {
            // if(!email || !password === ""){
            //     toast.warning("You need to add your email")
            // }
            e.preventDefault()
             axios.post('https://authentication-app-fullstack-project-2.onrender.com/auth/login',{email, password}, {withCredentials: true})
            //axios.post('http://localhost:10000/auth/login',{email, password}, {withCredentials: true})
            .then((res) => {
                if(res.data.status){
                    console.log(res.data.status)
                    navigate('/dashboard')
                }
                else{
                    toast.error(res.data.message)
                    setMessage('login error')
                }
                
            })
            .catch((err) => {
                toast.error('db connection error')
                console.log(err)
                setMessage('server error')
            })
        }
    
  return (
    <div className='sign-up-container' >
        <ToastContainer position="top-right" autoClose={3000} />
    <form className='sign-up-form' onSubmit={handleLogin} style={{backgroundColor:'white'}}>

       <h3 style={{fontSize:'14px'}}>
        Authentication App.  <Link to='signup' style={{fontSize:'14px', textDecoration:'none', color:'blue'}}>Sign up here</Link>
        </h3><br/>

        <div style={{fontSize:'25px', textAlign:'center'}}>Sign in</div>
        {/* <h5 style={{textAlign:'center'}}>We need your details to serve you better</h5> */}
        <br/>

        <label htmlFor='email'>Email: </label>
        <input required
            type='email' 
            //value={email}
            autoComplete='off' 
            placeholder='Email' 
            onChange={(e) => setEmail(e.target.value)} /><br />

        <label htmlFor='password'>Password: </label>
        <input required 
            type='password' 
            //value={password}
            placeholder='Password' 
            onChange={(e) => setPassword(e.target.value)} /> <br />

        <button type='submit' className='submit-button'>Sign in</button><br /><br />
        <h5 style={{color:'red'}}>{message}</h5>
        <Link to='/forgotpassword' className='forgotpassword'>Forgot password?</Link><br/><br/>
        <div className='bottom-link'>
             <h4 style={{fontSize:'17px'}}>Don't have an account? 
                <Link to='/signup' style={{fontSize:'19px', textDecoration:'none', fontFamily:'serif',fontWeight:'200'}}>Sign up</Link></h4>
            {/* <h3>Don't have an account? </h3> */}
        </div>
        </form>
        
</div>

  )
}

export default Login
