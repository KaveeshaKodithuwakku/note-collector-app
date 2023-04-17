import React, { useEffect, useState } from 'react'
import './Login.css';
import { Button, Card, CardContent, Divider, InputLabel, TextField } from '@mui/material';
import image from '../../assets/login-background-new.jpg'
import loginImage from '../../assets/login (1).png'
import { FcGoogle } from "react-icons/fc"
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/init-firbase';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {

  const [validated, setValidated] = useState(false);
  const { signInWithGoogle, login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [Checked, setIsChecked] = useState(false)
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

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  function handleClickSingUp() {
    navigate('/signup');
  }

  function handleRedirectToOrBack() {
    navigate('/home');
  }

  function handleClickForgotPassword() {
    navigate('/forgot_password');
  }

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    handleClose();
  }, [])

  const onLogin = (e) => {
    e.preventDefault();
    if (email.length == 0 || password.length == 0) {
      handleClickOpen();
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          if (Checked) {
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            localStorage.setItem('isCheked', Checked);
            console.log(Checked);
            console.log("email -" + localStorage.getItem('email'));
            console.log("password -" + localStorage.getItem('password'));
            console.log("isCheked -" + localStorage.getItem('isCheked'));
          } else {
            localStorage.setItem('email', '');
            localStorage.setItem('password', '');
            localStorage.setItem('isCheked', false);
            console.log(Checked);
            console.log("email -" + localStorage.getItem('email'));
            console.log("password -" + localStorage.getItem('password'));
            console.log("isCheked -" + localStorage.getItem('isCheked'));
          }
          const user = userCredential.user;
          navigate('/home')
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage)
        });
    }
  }

  const signInFromGoogle = () => {
    signInWithGoogle()
      .then(user => {
        handleRedirectToOrBack()
        console.log(user)
      })
      .catch(e => console.log(e.message))
  };

  useEffect(() => {
    setEmail(localStorage.getItem('email'));
    setPassword(localStorage.getItem('password'));
    setIsChecked(localStorage.getItem('isCheked'));

  }, [])

  return (

    <div>

      <div style={{ position: 'absolute' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }} >

            Please fill all the fileds
          </Alert>
        </Snackbar>
      </div>

      <div className='body-login' style={{
        display: "flex",
        alignItems: "center",
        height: "100%",
        flexDirection: 'column',
      }}>

        <Card sx={{ width: '700px', borderRadius: 1, marginTop: 15, display: "flex", boxShadow: 20 }}>
          <CardContent style={{
            display: "flex",
            alignItems: "center",
            width: "80%",
            height: "100%",
            flexDirection: 'column',
          }}>

            <img src={image} alt="" className='image-style' />

          </CardContent>

          <CardContent style={{
            display: "flex",

            height: "100%",
            width: "80%",
            flexDirection: 'column',
            backgroundColor: 'ghostwhite',
          }}>

            {/* <div>
<img className='login-icon-image ' src={loginImage} />
            </div> */}

            <div>
              <Divider> <h4 className='login-title'> Login</h4></Divider>

            </div>

            <br></br>
            <div>
              <TextField value={email}
                onChange={e => setEmail(e.target.value)} id="outlined-basic" label="Email*" variant="outlined" size="small" margin="none" sx={{ width: 300, fontSize: '5px' }} />
            </div>

            <div>
              <TextField value={password}
                onChange={e => setPassword(e.target.value)} id="outlined-basic" type='password' label="Password*" variant="outlined" size="small" margin="dense" style={{ width: 300 }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', justifyItems: 'center', alignItems: 'center' }}>

              <input type="checkbox" name="lsRememberMe" value={Checked}
                onChange={e => setIsChecked(e.target.checked)} />

              <label style={{ fontSize: '13px',marginLeft:10 }}>Remember me</label>

              <div style={{ display: 'flex', flexDirection: 'row', justifyItems: 'center', alignItems: 'center', marginTop: 15, marginLeft: 80 }}>
                <p style={{ color: 'blue', fontWeight: 'bold', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end', fontSize: '13px' }} onClick={handleClickForgotPassword}>Forgot Password ?</p>

              </div>
            </div>

            <div>
              <Button className='login-btn' type="submit" onClick={onLogin}>Sign In</Button>
            </div>

            <div style={{ display: 'flex', fontSize: '12px', marginTop: 5 }}>
              <p>Don't you have an account?</p>
              <p style={{ color: 'blue', fontWeight: 'bold' }} onClick={handleClickSingUp}>Sign Up</p>
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
