import React, { useEffect, useState } from 'react'
import { Button, Card, CardActions, CardContent, IconButton} from '@mui/material';
import {  Save } from '@mui/icons-material';
import './AddNotes.css';
import Swal from 'sweetalert2'
import axios from 'axios';
import { BiImageAdd, IconName } from "react-icons/bi";
import { FaUpload } from 'react-icons/fa';




export default function AddNotes() {


  const number = new Date();

// console.log('====================================');

  const [title, setTitle] = useState('');
  const [cdate, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState('');
  const [image, setImage] = useState(null);
  const currDate = new Date().toLocaleDateString();
  const currTime = new Date().toLocaleTimeString();
  

  useEffect(() => {
    // console.log(currDate);
    // console.log(currTime);
    console.log('====================================');
    console.log( currDate+" " +currTime);
    console.log('====================================');

    setDate(currDate);
  })

  //save data
  const savePost = () => {

    axios.post('http://localhost:8080/note/save-notes', {
      title: title,
      dateTime: cdate,
      description: description,
      image: image,
    })
      .then(function (response) {
        Swal.fire(
          'Good job!',
          'Note Saved successfully!',
          'success'
        )
        clearFeilds();
      })
      .catch(function (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
      });

  }

  const clearFeilds = () => {
    setTitle('');
    setDescription('');
   
  }

  

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      flexDirection: 'column'
    }}>

      <Card sx={{ minWidth: 275, marginTop: 2 }}>
        <CardContent className='card'>
          <div >
            <h3 className='title'>Add Notes</h3>
          </div>
          <div className="card-body">
            <div className="mb-4">
              <pa className='header_title'> Title : </pa><br></br>
              <input value={title} onChange={(e) => { setTitle(e.target.value) }} className='text' type={"text"} placeholder="Title" />
               </div>

            <div className="mb-4">
              <pa> Description : </pa><br></br>
              <textarea className='text-box-multi' style={{height:"150px"}} value={description} onChange={(e) => { setDescription(e.target.value) }}  type={"text"} placeholder="Description"/>
            </div>

            <div className="mb-4">
              <pa> File or Image Upload : </pa>
              <IconButton color="primary" aria-label="upload picture" component="label">
                          <input hidden accept="image/*" type="image" />
                          <BiImageAdd color='black'/>
                        </IconButton>

                      
              {/* <input className='img-placement' type='file' accept='image/*'
              //  hidden onChange={({target: {files}}) => {
              
              //   if(files){
              //     setImage(URL.createObjectURL(files[0]))
              //   }
              // }}
               /> */}
              
            <img src={image} width={150} height={150} alt='image'/>
        
            </div>

          </div>
        </CardContent>
        <CardActions>
          {/* <div className="card-footer">
        <div className="row p-0 m-0">  
          <div className="col p-0 m-0 text-end">
            <button className="btn btn-outline-primary m-1" type="submit">Save Student</button>
            <button className="btn btn-outline-secondary m-1" type="reset">Clear</button>
          </div>
        </div>
      </div> */}
          {/* <Button size="small"> <FaSave color='purple'/>Learn More</Button> */}

          <div style={{ display: "flex", justifyContent: 'flex-end' }}>
            <Button onClick={savePost} className='btn-icon' variant="contained" startIcon={<Save />}>
              Save
            </Button>

          </div>

        </CardActions>
      </Card>



    </div>
  )
}
