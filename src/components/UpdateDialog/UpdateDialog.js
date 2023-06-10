import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { BiImageAdd } from "react-icons/bi";
import Swal from 'sweetalert2'
import { GrFormClose } from "react-icons/gr";
import { Col, Row } from 'react-bootstrap';
import './UpdateDialog.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

export default function UpdateDialog(props) {
 
  const [data, setData] = useState([]);
  const [nId, setNId] = useState('');
  const [title, setTitle] = useState('');
  const [cdate, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('No Image Selected');
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('noteId') === ""){
      setData([]);
      setTitle("No Title");
      setDescription("No Description");
      setImage("No Image Selected");
      setFavorite(false);
    }else{
      showDetails(localStorage.getItem('noteId'));
    }
   
    console.log("44"+localStorage.getItem('noteId'));
    setCurrentDateTime();
  }, [props.noteId])

  const setCurrentDateTime = () => {
    const currDate = new Date().toLocaleDateString();
    const currTime = new Date().toLocaleTimeString();
    setDate(currDate + " " + currTime);
}

  const showDetails = async (id) => {

   await axios.get(`http://localhost:8080/api/v1/note/get-note/${id}`)
      .then(function (response) {
        setData(response.data)
        setTitle(response.data.title)
        setDescription(response.data.description)
        setImage(response.data.file_path)
        setFavorite(response.data.favorite)
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const updateDetails = (id, e) => {
    e.preventDefault();

    axios.put(`http://localhost:8080/api/v1/note/update-note-without-image/${id}`, {
      title: title,
      dateTime: cdate,
      description: description,
      image: image,
      favorite: favorite,
      userId: localStorage.getItem('userId'),
    })
      .then(function (response) {
        props.onClose();
        Swal.fire(
          'Success!',
          'Note Update successfully!',
          'success'
        )

        props.onLoad();
        clearFeilds();
      })
      .catch(function (error) {
        props.onClose();
        clearFeilds();
        Swal.fire({
          icon: 'error',
          text: 'Something went wrong!',
        })
      });
  }

  const clearFeilds = async () => {
    setTitle('');
    setDescription('');
    setImage('');
    await localStorage.setItem('noteId',"");
  }

  return (
    <div>

      <Modal
        //  {...props}
       
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Row>
            <Col>
              <div>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Edit Note
                </Typography>
              </div>
            </Col>

            <Col>
              <div className='edit-btn-close-line'>
                <IconButton onClick={props.onClose} style={{ size: '50px' }} color="primary" aria-label="close" component="label">
                  <input hidden accept="image/*" />
                  <GrFormClose color='gray' />
                </IconButton>
              </div>
            </Col>
          </Row>

          <div className='edit-text-line-style'>
            <TextField value={title} onChange={(e) => { setTitle(e.target.value) }} label="Title" id="outlined-size-small" size="small" />

            <TextField value={description} onChange={(e) => { setDescription(e.target.value) }} label="Description" id="outlined-size-small" size="small" margin='dense' />

          </div>

          <div className='edit-text-field-div'>
            <TextField value={image} onChange={(e) => { setImage(e.target.value) }} sx={{ width: '90%', marginTop: 0.5 }} label="Image" id="outlined-size-small" size="small" />

            <IconButton sx={{ width: '10%' }} color="primary" aria-label="upload picture" component="label">
              <input hidden accept="image/*" type="file" onChange={({ target: { files } }) => {
                files[0] && setImage(files[0])
              }} />
              <BiImageAdd color='black' type="file" />
            </IconButton>
          </div>

          <div className='edit-btn-save-line'>
            <Button onClick={(e) => updateDetails(data.noteId, e)} sx={{ height: 30, fontSize: 12, marginTop: 1, color: 'white', backgroundColor: 'green', ":hover": { backgroundColor: 'green' } }} >Update</Button>
          </div>
        </Box>
      </Modal>

    </div>
  )
}
