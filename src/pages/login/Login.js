import React, { useState } from 'react'
import './Login.css';
import { Button, Card, CardContent, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, styled, TextField } from '@mui/material';
import { Google, RememberMe, Style, Visibility, VisibilityOff } from '@mui/icons-material';
import { pink, purple } from '@mui/material/colors';
import { Col, Form, Row } from 'react-bootstrap';
import image from '../../assets/login-image.jpg'
import { FcGoogle } from "react-icons/fc"
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/init-firbase';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';



export default function Login() {

  const [validated, setValidated] = useState(false);
  const { signInWithGoogle, login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate();


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

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
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

  const signInFromGoogle = () => {
    signInWithGoogle()
      .then(user => {
        handleRedirectToOrBack()
        console.log(user)
      })
      .catch(e => console.log(e.message))
  };



  return (

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

          <div>
            <h4 className='login-title'> Login</h4>
          </div>

          <br></br>
          <div>
            <TextField value={email}
              onChange={e => setEmail(e.target.value)} id="outlined-basic" label="Email*" variant="outlined" size="small" margin="none" style={{ width: 300, fontSize: '' }} />
          </div>

          <div>
            <TextField value={password}
              onChange={e => setPassword(e.target.value)} id="outlined-basic" label="Password*" variant="outlined" size="small" margin="dense" style={{ width: 300 }} />
          </div>

          <div style={{ display: 'flex', justifyItems: 'baseline' }}>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
              <Col>
                <Form.Check label="Remember me" fontSize='5px' />
              </Col>
            </Form.Group>

            {/* <Checkbox color="secondary" size="small" style={{fontSize:5}}/>
          <p style={{fontSize:'10px',justifyContent:'center'}}>Remenber Me</p> */}
            {/* <FormGroup style={{fontSize:'5px'}}>
              <FormControlLabel control={<Checkbox color="secondary" size="small" style={{fontSize:5}}/>} label="Remember Me" />

            </FormGroup> */}
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
  )
}
