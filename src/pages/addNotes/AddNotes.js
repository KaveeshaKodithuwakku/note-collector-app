import React, { useEffect, useState } from 'react'
import { Button, Card, CardActions, CardContent} from '@mui/material';
import {  Save } from '@mui/icons-material';
import './AddNotes.css';
import Swal from 'sweetalert2'
import axios from 'axios';



export default function AddNotes() {

  const currDate = new Date().toLocaleDateString();
  const currTime = new Date().toLocaleTimeString();
  const number = new Date();

// console.log('====================================');

  const [title, setTitle] = useState('');
  const [date, setDate] = useState(currDate+" " +currTime);
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    console.log(currDate);
    console.log(currTime);
    console.log('====================================');
    console.log( currDate+" " +currTime);
    console.log('====================================');
    console.log(number.getTime());
  })

  //save data
  const savePost = () => {

    console.log(currDate);
    console.log(currTime);

    axios.post('http://localhost:8080/note/save-notes', {
      title: title,
      date: date,
      // userId: userId,
      description: description,
      image: image,
    })
      .then(function (response) {
        Swal.fire(
          'Save Success!'
        )
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
              <pa> Title : </pa><br></br>
              <input value={title} onChange={(e) => { setTitle(e.target.value) }} className='text' type={"text"} placeholder="Title" />
               </div>

            <div className="mb-4">
              <pa> Description : </pa><br></br>
              <textarea className='text-box-multi' style={{height:"150px"}} value={description} onChange={(e) => { setDescription(e.target.value) }}  type={"text"} placeholder="Description"/>
            </div>

            <div className="mb-4">
              <pa> File or Image Upload : </pa><br></br>
              <input className='img-placement' type={"text"} placeholder="Title" />
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



      {/* <Card sx={{ maxWidth: 345 }}>

      <h1>Hello</h1>

        <CardMedia
          sx={{ height: 140 }}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="green iguana"
        />

    <CardActions>
    <IconButton color="primary" aria-label="upload picture" component="label">
  <input hidden accept="image/*" type="file" />
  <AttachFile />
</IconButton>
        </CardActions>
        <CardContent>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" margin="normal"/>
        <br></br>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" margin="normal"/>
        <br></br>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" margin="normal" />
        <br></br>
        <TextField id="outlined-basic" label="Outlined" variant="outlined"margin="normal" />
        <br></br>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" margin="normal"/>
        <br></br>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card> */}
    </div>
  )
}
