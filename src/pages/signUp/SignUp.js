import React, { useState } from 'react'
import './SignUp.css';
import { Button, Card, CardContent, Divider, InputLabel, TextField } from '@mui/material';
import image from '../../assets/signup-1.jpg'
import { FcGoogle } from "react-icons/fc"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/init-firbase';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Swal from 'sweetalert2';
import swal from 'sweetalert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignUp() {

  const { signInWithGoogle, register } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [conPassword, setConPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  function handleClick() {
    navigate('/home');
  }

  function handleLoginClick() {
    navigate('/');
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    if (email !== '' || password !== '' || conPassword !== '') {
      if (password === conPassword) {

        await createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            swal("Success!", "Create account successfully", "success")
              .then((value) => {
                const user = userCredential.user;
                console.log(user);
                handleClick();
              });
          })
          .catch((error) => {
            if (error.code === 'auth/invalid-email') {
              Swal.fire({
                icon: 'error',
                title: 'Invalid Email',
                text: 'Please check your credentials and try again...',
              })
            } else if (error.code === 'auth/missing-password') {
              Swal.fire({
                icon: 'error',
                title: 'Missing Password ',
                text: 'Please fill all the fields',
              })
            }
            else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
              })
            }
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
          });
      } else {
        console.log("mis match");
        setMessage("Please check your password and confirm password again...");
        handleClickOpen();
      }
    } else {
      console.log("please fill all the fields");
      setMessage("Please fill all the fields...");
      handleClickOpen();
    }
  }

  //-------------------------- sign in from google --------------------------

  const signInFromGoogle = () => {
    signInWithGoogle()
      .then(user => {
        console.log(user);
        handleClick()
      })
      .catch(e => console.log(e.message))
  };
  //---------------------------------------------------------------------------------

  return (

    <div>

      <div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      </div>

      <div className='body-signup'>

        <Card sx={{ width: '700px', borderRadius: 1, marginTop: 15, display: "flex", boxShadow: 20 }}>
          <CardContent style={{ display: "flex", alignItems: "center", width: "80%", height: "100%", flexDirection: 'column' }}>
            <img src={image} alt="" className='image-style' />
          </CardContent>

          <CardContent style={{ display: "flex", height: "100%", width: "80%", flexDirection: 'column', backgroundColor: 'ghostwhite', }}>
            <div>
              <Divider>  <h4 className='login-title'> Sign Up</h4></Divider>
            </div>

            <br></br>
            <div>
              <TextField value={email}
                onChange={e => setEmail(e.target.value)} id="outlined-basic" label="Email*" variant="outlined" size="small" margin="none" style={{ width: 300 }} />
            </div>

            <div>
              <TextField value={password}
                onChange={e => setPassword(e.target.value)} id="outlined-basic" label="Password*" type='password' variant="outlined" size="small" margin="none" style={{ width: 300, marginTop: 5 }} />
            </div>

            <div>
              <TextField value={conPassword}
                onChange={e => setConPassword(e.target.value)} id="outlined-basic" label="Confirm Password*" type='password' variant="outlined" size="small" margin="none" style={{ width: 300, marginTop: 5, marginBottom: 10 }} />
            </div>

            <div>
              <Button className='login-btn' type="submit" onClick={onSubmit}>Sign Up</Button>
            </div>

            <div style={{ display: 'flex', fontSize: '12px', marginTop: 5 }}>
              <p>Do you already have an account?</p>
              <p style={{ color: 'blue', fontWeight: 'bold', marginLeft: 10 }} onClick={handleLoginClick}> Sign In</p>
            </div>

            <div>
              <Divider style={{ fontSize: '13px' }}> OR</Divider>
            </div>

            <br></br>
            <div>
              <Button className='login-google' onClick={signInFromGoogle}> <FcGoogle size={"20px"} />
                <InputLabel style={{ fontSize: '13px' }}>  Sign with Google</InputLabel>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
