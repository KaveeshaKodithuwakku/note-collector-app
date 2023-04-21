import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Card, CardContent, Divider, TextField } from '@mui/material';
import image from '../../assets/profile-image.jpg'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getAuth, updatePassword } from "firebase/auth";
import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import image1 from '../../assets/pen.png';
import { FaUndo, FaUser } from 'react-icons/fa';
import { MdEmail, MdLocationOn } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import {BsFillCalendar2Fill } from 'react-icons/bs';
import Swal from 'sweetalert2';





function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



export default function Settings() {

    const [value, setValue] = React.useState(0);
    const [password, setPassword] = useState('')
    const auth = getAuth();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    //Expand
    const [expanded, setExpanded] = React.useState(false);

    const handleChangeExpand = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const reset = (user, newPassword, e) => {
        e.preventDefault();
        console.log('user' + user);

        updatePassword(user, newPassword).then(() => {
            // Update successful.
            Swal.fire(
                'Good job!',
                'New password update successfully!',
                'success'
            )
            console.log('sucess');
            setPassword('');
        }).catch((error) => {
            console.log(error.code);

            if(error.code == 'auth/requires-recent-login'){
                Swal.fire({
                    icon: 'error',
                    title: 'Requires recent login',
                    text: 'Please login from fireabse account!',
                })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            }
           
            console.log(error + "failed");
            // An error ocurred
            // ...
        });
    }


    return (
        <div>

            <div>
                <NavBar />
            </div>

            <div style={{
                display: "flex",
                alignItems: "center",
                height: "100%",
                flexDirection: 'row',
            }}>

                <Card sx={{ width: '100%', height: '575px', borderRadius: 1, display: "flex", boxShadow: 2, margin: 1 }}>
                    <CardContent style={{
                        display: "flex",
                        alignItems: "center",
                        width: "60%",
                        height: "100%",
                        flexDirection: 'column',
                    }}>


                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="Profile" {...a11yProps(0)} />
                                    <Tab label="Reset Password" {...a11yProps(1)} />
                                    {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>

                                <div>
                                    <Accordion expanded={expanded === 'panel1'} onChange={handleChangeExpand('panel1')}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                        >
                                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                                Bio
                                            </Typography>
                                            <Typography sx={{ color: 'text.secondary' }}>I am an developer</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                                                Aliquam eget maximus est, id dignissim quam.
                                            </Typography>
                                            <br></br>

                                            <div>
                                                <img src={image1} alt="img" style={{ display: 'flex', justifyContent: 'flex-end', alignContent: 'end', width: 20, height: 20, boxShadow: 30 }} />
                                            </div>
                                        </AccordionDetails>


                                    </Accordion>
                                    <Accordion expanded={expanded === 'panel2'} onChange={handleChangeExpand('panel2')}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2bh-content"
                                            id="panel2bh-header"
                                        >
                                            <Typography sx={{ width: '33%', flexShrink: 0 }}>Personal Information</Typography>
                                            <Typography sx={{ color: 'text.secondary' }}>
                                                You are currently not an owner
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>

                                            <Row>
                                                <Col style={{ width: '50%' }}>
                                                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                                                        <FaUser/>
                                                        <Form.Label style={{ fontSize: '12px' ,marginLeft: 20}}>First Name</Form.Label>
                                                        <br></br>
                                                        <input value={'Kaveesha'} disabled='true' style={{ fontSize: '12px', width: 300 }} />
                                                    </Form.Group>

                                                </Col>
                                                <Col style={{ width: '50%' }}>
                                                    <Form.Group className="mb-3" controlId="formBasicLastName">
                                                    <FaUser/>
                                                        <Form.Label style={{ fontSize: '12px' ,marginLeft: 20}}>Last Name</Form.Label>
                                                        <br></br>
                                                        <input value={'Kodithuwakku'} disabled='true' style={{ fontSize: '12px', width: 300 }} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col style={{ width: '50%' }}>
                                                    <Form.Group className="mb-3" controlId="formBasicAddress">
                                                        <MdLocationOn/>
                                                        <Form.Label style={{ fontSize: '12px',marginLeft: 20 }}>Address</Form.Label>
                                                        <br></br>
                                                        <input value={'Matara,Sri Lanka'} disabled='true' style={{ fontSize: '12px', width: 300 }} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col style={{ width: '50%' }}>
                                                    <Form.Group className="mb-3" controlId="formBasicContact">
                                                        <IoIosCall/>
                                                        <Form.Label style={{ fontSize: '12px',marginLeft: 20 }}>Contact</Form.Label>
                                                        <br></br>
                                                        <input value={'0715246300'} disabled='true' style={{ fontSize: '12px', width: 300 }} />
                                                    </Form.Group>
                                                </Col>
                                                <Col style={{ width: '50%' }}>
                                                    <Form.Group className="mb-3" controlId="formBasicDob">
                                                        <BsFillCalendar2Fill/>
                                                        <Form.Label style={{ fontSize: '12px',marginLeft: 20  }}>Date Of Birth</Form.Label>
                                                        <br></br>
                                                        <input value={'2011-05-20'} disabled='true' style={{ fontSize: '12px', width: 300 }} />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <div>
                                                <img src={image1} alt="img" style={{ display: 'flex', justifyContent: 'flex-end', alignContent: 'end', width: 20, height: 20, boxShadow: 30 }} />
                                            </div>
                                            {/* <Row>
                                                <Col style={{width:'50%'}}>
                                                <input value={'Kaveesha'} disabled='true' style={{fontSize:'10px'}}/>
                                                </Col>
                                                <Col style={{width:'50%'}}>
                                                <input value={'Kaveesha'} disabled='true' style={{fontSize:'10px'}}/>
                                                </Col>
                                            </Row> */}
                                            {/* <Typography>
                                                Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
                                                varius pulvinar diam eros in elit. Pellentesque convallis laoreet
                                                laoreet.
                                            </Typography> */}
                                        </AccordionDetails>
                                    </Accordion>

                                    <Accordion expanded={expanded === 'panel4'} onChange={handleChangeExpand('panel4')}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel4bh-content"
                                            id="panel4bh-header"
                                        >
                                            <Typography sx={{ width: '33%', flexShrink: 0 }} startIcon={<FaUndo/>} >Email Address</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>


                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <MdEmail/>
                                                        <Form.Label style={{ fontSize: '12px',marginLeft: 20  }}>Email</Form.Label>
                                                        <br></br>
                                                        <input value={auth.currentUser.email} disabled='true' style={{ fontSize: '12px',width:300 }} />
                                                    </Form.Group>


                                            <div>
                                                <img src={image1} alt="img" style={{ display: 'flex', justifyContent: 'flex-end', alignContent: 'end', width: 20, height: 20, boxShadow: 30, marginTop: 20 }} />
                                            </div>

                                            {/* <Typography>
                                                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                                                amet egestas eros, vitae egestas augue. Duis vel est augue.
                                            </Typography> */}
                                        </AccordionDetails>
                                    </Accordion>
                                </div>

                            </TabPanel>
                            <TabPanel value={value} index={1}>

                                <Card sx={{ width: '60%', height: '100%', borderRadius: 1, display: "flex", boxShadow: 2, margin: 1 }}>
                                    <CardContent style={{
                                        display: "flex",

                                        width: "60%",
                                        height: "100%",
                                    }}>

                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                                            <div style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <h5 style={{ fontWeight: 'bolder' }}>Reset Password</h5>
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <TextField value={password}
                                                    onChange={e => setPassword(e.target.value)} id="outlined-basic" label="Password*" type='password' variant="outlined" size="small" margin="dense" style={{ width: 370, fontSize: '5px', marginTop: 35 }} />

                                            </div>

                                            <br></br>

                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                                <Button onClick={(e) => reset(auth.currentUser, password, e)} sx={{ backgroundColor: 'purple', color: 'white', width: 370, ":hover": { backgroundColor: 'purple' } }}>Reset Password</Button>
                                            </div>


                                        </div>




                                    </CardContent>
                                </Card>

                            </TabPanel>
                            {/* <TabPanel value={value} index={2}>
        Item Three
      </TabPanel> */}
                        </Box>

                    </CardContent>


                    <CardContent style={{
                        display: "flex",
                        alignItems: "center",
                        width: "40%",
                        height: "100%",
                        flexDirection: 'column',
                    }}>

                        <img src={image} alt="" className='image-style' />

                    </CardContent>

                </Card>


            </div>



        </div>
    )
}
