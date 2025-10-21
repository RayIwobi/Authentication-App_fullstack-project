import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './authentic.css'


function Dashboard() {
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate()

      axios.defaults.withCredentials = true
     useEffect(() => {
         axios.get('https://authentication-app-fullstack-project-2.onrender.com/auth/verify' ,{ withCredentials: true })
       //axios.get('http://localhost:10000/auth/verify' ,{ withCredentials: true })
        .then((res) => {
            if(res.data.status){

            }
            else{
                navigate('/login') 
            }
        })
    }, [navigate])


  // Step 1: Get the current user 
  useEffect(() => {
    axios.get('https://authentication-app-fullstack-project-2.onrender.com/auth/dashboard', { withCredentials: true })
    //axios.get('http://localhost:10000/auth/dashboard', { withCredentials: true })
      .then(res => {
        setCurrentUser(res.data);
      })
      .catch(err => {
        console.error('Error fetching user:', err);
      });
  }, []);


   axios.defaults.withCredentials = true
    const handleLogout = () => {
    axios.get('https://authentication-app-fullstack-project-2.onrender.com/auth/logout' , { withCredentials: true })
       //axios.get('http://localhost:10000/auth/logout' , { withCredentials: true })
      .then(res => {
        if(res.data.status){
          navigate('/')
          window.location.reload()
        }
        else{}
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div style={{ padding: '20px' }}> 
      <br/>
      <br/>
      <div className='dashboard-title'>
         <h3>Dashboard</h3>
       <Link to='/'><h2 style={{color:'blue'}}>Return to home</h2></Link>
       <button 
       onClick={handleLogout}
       className='logoutbutton'
       >Logout
       </button>
       <br/>
       <br/>
       </div>

      {currentUser ? (
        <>
          <div className='profilearea'>
          <p>Welcome, {currentUser.username}</p><br/>
          <div><strong>Email: </strong>{currentUser.email}</div><br/>
         <div><strong>Phone number:</strong> {currentUser.phone}</div><br/>
          <div><strong>Address:</strong> {currentUser.address}</div><br/><br/>
          <Link to='/update'><button className='update-profile'>Update profile</button></Link>

          </div>
        </>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
}

export default Dashboard;
