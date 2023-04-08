import React from 'react'
import './Home.css';
import { pink } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
export default function Home() {

  const navigate = useNavigate();

  function handleClick() {
    navigate('/add');
  }



  return (

    <div className='body'>
   <div style={{display:'flex',alignContent: 'center',direction:'row'

   }}>
   <button className='button' onClick={handleClick}>click </button>
   </div>
   <div>
  <p className='body-content'>Welcome to my notes....</p>
   </div>
        
       
</div>
  )
}
