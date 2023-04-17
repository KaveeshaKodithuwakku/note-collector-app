import React, { useEffect, useState } from 'react'
import './Login.css';
import { Button, Card, CardContent, Divider, InputLabel, TextField } from '@mui/material';
import { Col, Row, } from 'react-bootstrap';
import image from '../../assets/login-background-new.jpg'
import loginImage from '../../assets/login (1).png'
import { FcGoogle } from "react-icons/fc"
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/init-firbase';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


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
  const [isChecked, setIsChecked] = useState(false)
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

  function handleClick() {
    navigate('/home');
  }

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


  // const userLogin = () => {
  //   setIsSubmitting(true)
  //           login(email, password)
  //             .then(res => {
  //               handleRedirectToOrBack()
  //             })
  //             .catch(error => {
  //               console.log(error.message)
  //               // toast({
  //               //   description: error.message,
  //               //   status: 'error',
  //               //   duration: 9000,
  //               //   isClosable: true,
  //               // })
  //             })
  //             .finally(() => {
  //               // setTimeout(() => {
  //               //   mounted.current && setIsSubmitting(false)
  //               //   console.log(mounted.current)
  //               // }, 1000)
  //               setIsSubmitting(false)
  //               //mounted.current && setIsSubmitting(false)
  //             })
  // };


  const onLogin = (e) => {
    e.preventDefault();
    if (email.length == 0 || password.length == 0) {
      handleClickOpen();
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          if(isChecked){
            localStorage.setEmail = email;
            localStorage.setPassword = password;
            localStorage.setIsChecked = isChecked;
          }else{
            localStorage.setEmail = '';
            localStorage.setPassword = '';
            localStorage.setIsChecked = false;
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

            {/* <div >
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
                onChange={e => setPassword(e.target.value)} id="outlined-basic" type='password' label="Password*"  variant="outlined" size="small" margin="dense" style={{ width: 300 }} />
            </div>

            <div style={{ display: 'flex',flexDirection:'row' ,justifyItems: 'center', alignItems: 'center' }}>

{/* 
            <FormGroup>
  <FormControlLabel control={<Checkbox  size="small" value={password}
                onChange={e => setPassword(e.target.value)}/>} label="Remember Me" />
  
          
</FormGroup> */}

<input type="checkbox"  name="lsRememberMe" value={isChecked}
                onChange={e => setIsChecked(e.target.value)}/>

<label style={{fontSize:'13px'}}>Remember me</label>

              <div style={{ display: 'flex',flexDirection:'row' ,justifyItems: 'center', alignItems: 'center' ,marginTop: 15,marginLeft: 35}}>
              {/* <Checkbox label='Remember Me' size="small" sx={{alignItems:'center',justifyContent:'center'}}/> */}
              {/* <p style={{width:150,fontSize:14}}>Remember Me</p> */}
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



            {/* <Row>
            <Col >
              <h4 className='login-title'> Login</h4>
              <br></br>
              <Form className='text_content' noValidate validated={validated} onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label className='form-text'>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" required   value={email}
                onChange={e => setEmail(e.target.value)}/>
                  <Form.Control.Feedback type="invalid">
                    Please enter valid email.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label className='form-text'>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" value={password}
                required
                onChange={e => setPassword(e.target.value)} />
                  <Form.Control.Feedback type="invalid">
                    Please enter valid password.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
                  <Col>
                    <Form.Check label="Remember me" />
                  </Col>
                </Form.Group>

                <Button className='login-btn' type="submit" onClick={onLogin}>Sign In</Button>
                <br></br>
                <br></br>

                <Row style={{display:"flex",justifyContent:"center",alignItems: "center"}}>
                  <Col className='header-col1'>
                    <Form.Text className='header-col1-text'>
                      Don't have an account?
                    </Form.Text>
                  </Col>
                  <Col className='header-col2' >
                    <Form.Text className='header-col2-text' onClick={handleClickSingUp}>
                      Sign Up
                    </Form.Text>
                  </Col>
                </Row>
                <Divider>OR</Divider>
                <br></br>
                <Button className='login-google' onClick={signInFromGoogle}> <FcGoogle size={"20px"} />
                  <InputLabel>  Sign with Google</InputLabel>
                
                </Button>

              </Form>
            </Col >

          </Row> */}
          </CardContent>

        </Card>




      </div>



    </div>
  )
}
