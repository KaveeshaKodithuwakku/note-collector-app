import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import IconButton from '@mui/material/IconButton';
import { Edit } from '@mui/icons-material';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { BiImageAdd } from "react-icons/bi";
import Swal from 'sweetalert2'




export default function UpdateDialog(props) {

  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [cdate, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState('');
  const [image, setImage] = useState(null);

  const currDate = new Date().toLocaleDateString();
  const currTime = new Date().toLocaleTimeString();

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };


  useEffect(() => {

    showDetails(props.noteId);
    console.log("id - " + props.noteId);
    setDate(currDate+" " +currTime);
  }, [])



  const showDetails = (id) => {
    axios.get(`http://localhost:8080/note/get-note/${id}`)
      .then(function (response) {
        setData(response.data)
        setTitle(response.data.title)
        setDescription(response.data.description)
        setImage(response.data.image)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

    const updateDetails = (id,e) => {
   e.preventDefault();

      axios.put(`http://localhost:8080/note/update-note/${id}`, {
        title: title,
        dateTime: cdate,
        description: description,
        image: image,
      })
        .then(function (response) {
          Swal.fire(
            'Success!',
            'Note Update successfully!',
            'success'
          )
          handleClose();
            props.onLoad();
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
    <div>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button> */}

      <IconButton color="primary" aria-label="edit" component="label" onClick={handleShow}>
        <input hidden accept="image/*" />
        <Edit />
      </IconButton>

<div>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Note</Modal.Title>
          </Modal.Header>
          <Modal.Body>

         <div style={{display:'flex',flexDirection:'column'}}>

         <TextField value={title} onChange={(e) => { setTitle(e.target.value) }} label="Title" id="outlined-size-small" size="small"/>

<TextField value={description} onChange={(e) => { setDescription(e.target.value) }} label="Description" id="outlined-size-small" size="small" margin='dense'/>

          </div> 

          <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          <TextField value={image} onChange={(e) => { setImage(e.target.value) }} style={{width:'90%'}} label="Image" id="outlined-size-small" size="small" margin='dense'/>

          <IconButton style={{width:'10%'}} color="primary" aria-label="upload picture" component="label">
                          <input hidden accept="image/*" type="image" />
                          <BiImageAdd color='black'/>
                        </IconButton>
          </div>
 
         

          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="secondary" onClick={handleClose}>
              Close
            </Button> */}
            <Button variant="primary" onClick={(e) => updateDetails(data.noteId, e)}>Update</Button>
          </Modal.Footer>
        </Modal>
  

</div>

      

    </div>
  )
}
