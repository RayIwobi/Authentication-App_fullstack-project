import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './authentic.css'

function UpdateDetails() {

    const navigate = useNavigate()
    const [profile, setProfile] = useState({
      username:'',
      email:'',
      phone:'',
      address:''
    })

    axios.defaults.withCredentials = true
     useEffect(() => {
      //axios.get('https://yarnix-social.onrender.com/auth/verify', {withCredentials:true})
          axios.get('http://localhost:10000/auth/verify', {withCredentials:true})
        .then((res) => {
            if(res.data.status){

            }
            else{
                navigate('/')
            }
        })
    }, [navigate])

    useEffect(() => {
     // axios.get('https://yarnix-social.onrender.com/auth/dashboard',{ withCredentials: true })
      axios.get('http://localhost:10000/auth/dashboard',{ withCredentials: true })
      .then(res => setProfile(res.data))
      .catch(err => console.log(err))
    },[])

    const handleChange = (e) => {
      const {name, value} = e.target;
      setProfile({...profile, [name]: value})
    }

    const handleclick = () =>{
   //axios.put('https://yarnix-social.onrender.com/auth/update', profile, { withCredentials: true})
         axios.put('http://localhost:10000/auth/update', profile, { withCredentials: true})
      .then(res => {
        if(res.data.status){
          navigate('/dashboard')
          console.log('updated successfully')
        }else{
          console.error('update failed')
        }
      })
      .catch(err => console.log(err))
    }

  return (
    <div className='dashboard-container'>
      <div className='dashboard-title'>
        <h3>Update Profile</h3>
      </div>
      
      <div className='update-form'>
        <h3>User Profile</h3>
        <hr className='hr'/>

         <label>Name</label>
         <div>
          <input
            type='text'
            name='username'
            value={profile.username} 
            onChange={handleChange}
          />
          <label>Email</label>
          <input required
            type='text'
            name='email'
            value={profile.email} 
            onChange={handleChange}
          />
          <label>Phone Number</label>
          <input
            type='number'
            name='phone'
            value={profile.phone} 
            onChange={handleChange}
          />
          <label>Address</label>
          <textarea
            type='text'
            name='address'
            value={profile.address} 
            onChange={handleChange}
          /><br /><br/>

          <div>
            <button onClick={handleclick} className='submit-button'>Update</button>
            <Link to='/dashboard'><button className='submit-button'>Back</button></Link>
          </div>
      </div>
    </div>
  </div>
  )
}

export default UpdateDetails
