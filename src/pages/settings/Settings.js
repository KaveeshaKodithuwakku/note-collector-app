import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Card, CardContent, TextField } from '@mui/material';
import image from '../../assets/Profile.jpg'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { purple } from '@mui/material/colors';
import { auth } from '../../utils/init-firbase';
import { useLocation } from 'react-router-dom';
import { confirmPasswordReset, sendPasswordResetEmail } from 'firebase/auth';





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

// ------------------password reset ------------------------------


// function forgotPassword(email) {
//     return sendPasswordResetEmail(auth, email, {
//       url: `http://localhost:3000/settings`,
//     })
//   }

  const forgotPassword = (uEmail, e) => {
    e.preventDefault();
    return sendPasswordResetEmail(auth, uEmail, {
        url: `http://localhost:3000/settings`,
      })

  }

//--------------------------------------------------------------------



export default function Settings() {

    const [value, setValue] = React.useState(0);
    const [email, setEmail] = useState('')

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    //Expand
    const [expanded, setExpanded] = React.useState(false);

    const handleChangeExpand = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const forgotPassword = (uEmail, e) => {
        e.preventDefault();
        return sendPasswordResetEmail(auth, uEmail, {
            url: `http://localhost:3000/`,
          })
    
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

                <Card sx={{ width: '100%', height: '100%', borderRadius: 1, display: "flex", boxShadow: 2, margin: 1 }}>
                    <CardContent style={{
                        display: "flex",
                        alignItems: "center",
                        width: "70%",
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
                                                About
                                            </Typography>
                                            <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                                                Aliquam eget maximus est, id dignissim quam.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion expanded={expanded === 'panel2'} onChange={handleChangeExpand('panel2')}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2bh-content"
                                            id="panel2bh-header"
                                        >
                                            <Typography sx={{ width: '33%', flexShrink: 0 }}>Occupation</Typography>
                                            <Typography sx={{ color: 'text.secondary' }}>
                                                You are currently not an owner
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
                                                varius pulvinar diam eros in elit. Pellentesque convallis laoreet
                                                laoreet.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>

                                    <Accordion expanded={expanded === 'panel4'} onChange={handleChangeExpand('panel4')}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel4bh-content"
                                            id="panel4bh-header"
                                        >
                                            <Typography sx={{ width: '33%', flexShrink: 0 }}>Personal data</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                                                amet egestas eros, vitae egestas augue. Duis vel est augue.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>

                            </TabPanel>
                            <TabPanel value={value} index={1}>

                                <Card sx={{ width: '50%', height: '100%', borderRadius: 1, display: "flex", boxShadow: 2, margin: 1 }}>
                                    <CardContent style={{
                                        display: "flex",

                                        width: "50%",
                                        height: "100%",
                                    }}>

                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                                            <div style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <h5 style={{ fontWeight: 'bolder' }}>Reset Password</h5>
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <TextField value={email}
                                                    onChange={e => setEmail(e.target.value)} id="outlined-basic" label="Email*" variant="outlined" size="small" margin="dense" style={{ width: 370, fontSize: '5px' }} />
                                            </div>

                                            <br></br>

                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                                <Button onClick={(e) => forgotPassword(email, e)} sx={{ backgroundColor: 'purple', color: 'white', width: 370 }}>Reset Password</Button>
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
                        width: "30%",
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
