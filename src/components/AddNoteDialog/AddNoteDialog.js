import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { BiImageAdd } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";
import Swal from 'sweetalert2'
import { Col, Row } from 'react-bootstrap';
import './AddNoteDialog.css';

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
    const [image, setImage] = useState(null);
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        clearFeilds();
        setCurrentDateTime();
    }, [])

    const setCurrentDateTime = () => {
        const currDate = new Date().toLocaleDateString();
        const currTime = new Date().toLocaleTimeString();
        setDate(currDate + " " + currTime);
    }

    const savePost = () => {

        const formData = new FormData();

        formData.append('userId', localStorage.getItem("userId"))
        formData.append('title', title)
        formData.append('description', description)
        formData.append('dateTime', cdate)
        formData.append('favorite', favorite)
        formData.append('image', image);

        try{
            axios({
                method:"post",
                url:"api/v1/note/save-notes",
                data: formData,
                headers:{"Content-Type":"multipart/formData"}
            }) 
            .then(res=>{
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
                })
                props.onClose();
                props.onLoad();
                clearFeilds();
            });
        }catch(error){
            console.error(error);
        }
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

                    <Row>
                        <Col>
                            <div >
                                <Typography style={{ width: '90%' }} id="modal-modal-title" variant="h6" component="h2">
                                    Add Note
                                </Typography>
                            </div>
                        </Col>

                        <Col>
                            <div className='btn-close-line'>
                                <IconButton onClick={props.onClose} style={{ size: '50px' }} color="primary" aria-label="close" component="label">
                                    <input hidden accept="image/*" />
                                    <GrFormClose color='gray' />
                                </IconButton>
                            </div>
                        </Col>
                    </Row>



                    <div className='text-line-style'>

                        <TextField value={title} onChange={(e) => { setTitle(e.target.value) }} label="Title" id="outlined-size-small" size="small" />

                        <TextField value={description} onChange={(e) => { setDescription(e.target.value) }} label="Description" id="outlined-size-small" size="small" margin='dense' />

                    </div>

                    <div className='text-field-div'>
                        <TextField value={image} onChange={(e) => { setImage(e.target.value) }} style={{ width: '90%', marginTop: 5, marginBottom: 10 }} label="Image" id="outlined-size-small" size="small" margin='none' />

                        <IconButton style={{ width: '10%' }} color="primary" aria-label="upload picture" component="label">
                            <input hidden accept="image/*" type="file" onChange={({ target: { files } }) => {
                                files[0] && setImage(files[0])
                            }} />
                            <BiImageAdd color='black' type="file" />
                        </IconButton>
                    </div>


                    <div className='btn-save-line'>
                        <Button onClick={savePost} sx={{ height: 30, fontSize: 12, color: 'white', backgroundColor: 'green', ":hover": { backgroundColor: 'green' } }} >Save Note</Button>
                    </div>
                </Box>
            </Modal>

        </div>
    )
}
