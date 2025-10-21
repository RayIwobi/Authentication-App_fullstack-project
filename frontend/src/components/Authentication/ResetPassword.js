import React, { useState } from 'react'
import axios from 'axios'
import './authentic.css'
import { Link, useParams } from 'react-router-dom'

//message notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {

    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState("")

    const [homelink, setHomelink] = useState(false)


    const {token} = useParams()

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

       axios.post(`https://authentication-app-fullstack-project-2.onrender.com/auth/reset-password/${token}`, {password} , {withCredentials:true})
        // axios.post(`https://yarnix-social.onrender.com/auth/reset-password/${token}`, {password} , {withCredentials:true})
        .then((res) => {
            if(res.data.status){
                toast.success("Password reset successfully")
                setHomelink(true)
            }
        })
        .catch((err) => {
            console.log(err)
            toast.error('an error')
        })
    }

    return (
        <div className='sign-up-container' id='resetpassword-container'>
            <ToastContainer position="top-right" autoClose={3000} />
            
            <form className='sign-up-form' onSubmit={handleSubmit}>

                <h2 className='forgotpwd'>Reset Password</h2>

                <label htmlFor='password'>New password: </label>
                <input 
                    type='password' 
                    //value={password}
                    placeholder='New Password' 
                    onChange={(e) => setPassword(e.target.value)} /> <br />

                <button type='submit' disabled={loading} className='submit-button'>
                    {loading ? 'Reset' : 'Reset'}
                </button>
                 
                <div className='homelink'>
                    {homelink === false ? "" : <div>Go to <Link to='/login'>login</Link> page</div>}
                </div>
            </form>

            
        </div>
    )
}

export default ForgotPassword
