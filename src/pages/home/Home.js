import React from 'react'
import './Home.css';
import { pink } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import image from '../../assets/note-book.jpg'


export default function Home() {

  const navigate = useNavigate();

  function handleClick() {
    navigate('/add');
  }



  return (

    <div className='body'>

      <div style={{justifyContent:"center",alignItems:"center",display:"flex",flexDirection:"column"}}>
        <Button className='body-button' onClick={handleClick} style={{marginTop:5}}>Start Your Jounrney </Button>
      </div>

      <div>
        <p className='body-title'>Welcome to my notes....</p>
        <p className='body-content'>Capure your moments with MyNotes. </p>
        <p className='body-content2'>......... </p>
      </div>

      {/* <div>
      <img src={image} alt="" className='image-style' />
      </div> */}


    </div>
  )
}
