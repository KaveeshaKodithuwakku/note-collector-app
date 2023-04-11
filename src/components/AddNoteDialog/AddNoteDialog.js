import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import { Edit } from '@mui/icons-material';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { BiImageAdd } from "react-icons/bi";
import { GrFormClock, GrFormClose, IconName } from "react-icons/gr";
import Swal from 'sweetalert2'



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



export default function AddNoteDialog(props) {

    const [title, setTitle] = useState('');
    const [cdate, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [userId, setUserId] = useState('');
    const [image, setImage] = useState(null);

    const currDate = new Date().toLocaleDateString();
    const currTime = new Date().toLocaleTimeString();


    useEffect(() => {
        setDate(currDate + " " + currTime);
    }, [])


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
                props.onClose();
                props.onLoad();
                clearFeilds();

            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href="">Why do I have this issue?</a>'
                })
                console.log(error);
                props.onClose();
                props.onLoad();
                clearFeilds();

               
            });

    }

    const clearFeilds = () => {
        setTitle('');
        setDescription('');
        setImage('');
       
      }
    

  return (
    <div>
        
        <Modal
            // {...props}
                open={props.open}
                 onClose={props.onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',alignItems:'flex-end',marginTop:0}}>
          <IconButton onClick={props.onClose} style={{ size:'50px' }} color="primary" aria-label="close" component="label">
                            <input hidden accept="image/*"  />
                            <GrFormClose color='gray'/>
                        </IconButton>
                    </div>

                    <div style={{display:'flex',flexDirection:'row'}}>

                    <Typography style={{width:'90%'}} id="modal-modal-title" variant="h6" component="h2">
            Add Note 
          </Typography>


                    </div>


          
                    <div style={{ display: 'flex', flexDirection: 'column' }}>

                        <TextField value={title} onChange={(e) => { setTitle(e.target.value) }} label="Title" id="outlined-size-small" size="small" />

                        <TextField value={description} onChange={(e) => { setDescription(e.target.value) }} label="Description" id="outlined-size-small" size="small" margin='dense' />

                    </div>

                    <div className='text-field-div'>
                        <TextField value={image} onChange={(e) => { setImage(e.target.value) }} style={{ width: '90%' }} label="Image" id="outlined-size-small" size="small" margin='dense' />

                        <IconButton style={{ width: '10%' }} color="primary" aria-label="upload picture" component="label">
                            <input hidden accept="image/*" type="image" />
                            <BiImageAdd color='black' />
                        </IconButton>
                    </div>

        
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 5 }}>
                        <Button onClick={savePost} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' ,color:'white', backgroundColor:'green',":hover":{backgroundColor:'green'}}} >Save Note</Button>
                    </div>
                </Box>
            </Modal>

    </div>
  )
}
