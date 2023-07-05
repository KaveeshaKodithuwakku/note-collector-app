import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { Box, Button, IconButton, Modal, TextField, Typography } from '@mui/material';
import { Col, Row } from 'react-bootstrap';
import { GrFormClose } from 'react-icons/gr';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';


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


export default function AddReminderDialog(props) {

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState(null);
    //save data

    const savePost = () => {

        axios.post('reminder/save-reminder', {
            title: title,
            description: description,
            date: date,
            time: time,
        })
            .then(function (response) {
                Swal.fire(
                    'Good job!',
                    'Reminder Saved successfully!',
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
                console.log(error);
                props.onClose();
                props.onLoad();
                clearFeilds();


            });

    }

    const clearFeilds = () => {
        setTitle('');
        setDescription('');
        setDate('');
        setTime('');

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


                            <div style={{ display: 'flex', flexDirection: 'row' }}>

                                <Typography style={{ width: '90%' }} id="modal-modal-title" variant="h6" component="h2">
                                    Add Reminder
                                </Typography>


                            </div>

                        </Col>

                        <Col>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 0 }}>
                                <IconButton onClick={props.onClose} style={{ size: '50px' }} color="primary" aria-label="close" component="label">
                                    <input hidden accept="image/*" />
                                    <GrFormClose color='gray' />
                                </IconButton>
                            </div>
                        </Col>
                    </Row>



                    <div style={{ display: 'flex', flexDirection: 'column' }}>

                        <TextField value={title} onChange={(e) => { setTitle(e.target.value) }} label="Title" id="outlined-size-small" size="small" />

                        {/* <TextField value={description} onChange={(e) => { setDescription(e.target.value) }} label="Description" id="outlined-size-small" size="small" margin='dense' /> */}

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker label={'"year", "month" and "day"'}
                                    views={['year', 'month', 'day']} value={date} onChange={(newValue) => {
                                        setDate(newValue);
                                    }
                                    }
                                    renderInput={(params) => <TextField {...params} format="DD-MM-YYYY" />} />
                            </DemoContainer>
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer
                                components={[
                                    'MobileTimePicker',
                                ]}
                            >

                                <DemoItem label="Time" >
                                    <MobileTimePicker style={{}} value={time} onChange={(newValue) => {
                                        setTime(newValue);
                                    }
                                    }
                                        renderInput={(params) => <TextField {...params} />} />
                                </DemoItem>
                            </DemoContainer>
                        </LocalizationProvider>

                    </div>


                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
                        <Button onClick={savePost} sx={{ height: 30, fontSize: 12, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', color: 'white', backgroundColor: 'green', ":hover": { backgroundColor: 'green' } }} >Save Reminder</Button>
                    </div>
                </Box>
            </Modal>

        </div>
    )
}
