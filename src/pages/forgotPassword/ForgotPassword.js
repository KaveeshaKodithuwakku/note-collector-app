import React, { useState } from 'react'
import { auth } from '../../utils/init-firbase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Button, Card, CardContent, TextField } from '@mui/material';
import image from '../../assets/forgot-password.jpg'
import './ForgotPassword.css';

export default function ForgotPassword() {

    const [email, setEmail] = useState('')

    const forgotPassword = (uEmail, e) => {
        e.preventDefault();
        return sendPasswordResetEmail(auth, uEmail, {
            url: `http://localhost:3000`,
        })
    }

    return (
        <div className='main-line-forgot'>

            <Card sx={{ width: '400px', height: '500px', borderRadius: 1, display: "flex", boxShadow: 2, margin: 10 }}>
                <CardContent style={{ display: "flex", width: "50%", height: "100%" }}>

                    <div className='card-div'>

                        <div style={{ height: '60px', marginTop: 50, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <img src={image} alt="" className='image-style' />
                        </div>

                        <div style={{ marginTop: 80 }}>
                            <h5 style={{ fontWeight: 'bolder' }}>Forgot Password</h5>
                        </div>

                        <div>
                            <p style={{ fontSize: '12px', color: 'gray' }}>Enter your email address to retrieve your password</p>
                        </div>

                        <div>
                            <TextField value={email}
                                onChange={e => setEmail(e.target.value)} id="outlined-basic" label="Email*" variant="outlined" size="small" margin="dense" style={{ width: 370, fontSize: '5px' }} />
                        </div>

                        <br></br>

                        <div>
                            <Button onClick={(e) => forgotPassword(email, e)} sx={{ backgroundColor: 'purple', color: 'white', width: 370, ":hover": { backgroundColor: 'purple' } }}>Reset Password</Button>
                        </div>

                    </div>

                </CardContent>
            </Card>
        </div>
    )
}

