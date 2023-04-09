import React, { useState } from 'react'
import './SignUp.css';
import { Button, Card, CardContent, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, styled, TextField } from '@mui/material';
import { Google, RememberMe, Style, Visibility, VisibilityOff } from '@mui/icons-material';
import { pink, purple } from '@mui/material/colors';
import { Col, Form, Row } from 'react-bootstrap';
import image from '../../assets/signup-1.jpg'
import { FcGoogle } from "react-icons/fc"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../../utils/init-firbase';

export default function SignUp() {

    const [validated, setValidated] = useState(false);
    const { signInWithGoogle, register } = useAuth()
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
  
    function handleLoginClick() {
      navigate('/');
    }

    function handleRedirectToOrBack() {
      navigate('/home');
    }
  

    // const userSignUp = () => {
    //    setIsSubmitting(true)
    //   console.log("inside reg******")
    //         register(email, password)
    //           .then(user => {
    //             console.log(user)
    //             console.log("inside yes ////////")
    //           //  handleClick()
    //           })
    //           .catch(error => {
    //             console.log(error.message)
    //             console.log("inside error=======")
    //             // toast({
    //             //   description: error.message,
    //             //   status: 'error',
    //             //   duration: 9000,
    //             //   isClosable: true,
    //             // })
    //           })
    //           .finally(() => {
    //              setIsSubmitting(false)
    //              console.log("inside finnaly+++++++")
    //            // mounted.current && setIsSubmitting(false)
    //           })
    // };

  
    const onSubmit = async (e) => {
      e.preventDefault()
     
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            handleClick();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });
 
   
    }

    const signInFromGoogle = () => {
      signInWithGoogle()
      .then(user => {
        // handleRedirectToOrBack()
        console.log(user);
        handleClick()
      })
      .catch(e => console.log(e.message))
    };
  

  return (
   
    <div className='body-signup' style={{
        display: "flex",
        alignItems: "center",
        flexDirection: 'column'
      }}>
  
  
  
        <Card sx={{ maxWidth: '1000vw', borderRadius: 5,marginTop:2 }}>
          <CardContent style={{
            display: "flex",
            alignItems: "center",
            height: "550px",
            flexDirection: 'column',
            marginTop:10
          }}>
  
            <Row>
  
              <Col>
                <img src={image} alt="" className='image-style' />
              </Col>
              <Col >
  
                <h4 className='login-title'> Sign Up </h4>
                <br></br>
                <Form className='text_content' noValidate validated={validated} onSubmit={handleSubmit}>

  
  
                  <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label className='form-text'>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" required  value={email}
                onChange={e => setEmail(e.target.value)}/>
                    <Form.Control.Feedback type="invalid">
                      Please enter valid email.
                    </Form.Control.Feedback>
                  </Form.Group>
  
                  <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label className='form-text'>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" required  value={password}
                onChange={e => setPassword(e.target.value)}/>
                    <Form.Control.Feedback type="invalid">
                      Please enter valid password.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label className='form-text'>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" required />
                    <Form.Control.Feedback type="invalid">
                      Please entered password.
                    </Form.Control.Feedback>
                  </Form.Group>
  
                  {/* <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
                    <Col>
                      <Form.Check label="Remember me" />
                    </Col>
                  </Form.Group> */}
  
                  <Button className='login-btn' type="submit" onClick={onSubmit}>Sign Up</Button>
                  <br></br>
                  <br></br>
  
                  <Row style={{display:"flex",justifyContent:"center",alignItems: "center"}}>
                    <Col className='header-col1'>
                      <Form.Text className='header-col1-text'>
                        You already have an account?
                      </Form.Text>
                    </Col>
                    <Col className='header-col2'>
                      <Form.Text className='header-col2-text' onClick={handleLoginClick}>
                        Sign In
                      </Form.Text>
                    </Col>
                  </Row>
                  <Divider>OR</Divider>
                  <br></br>
                  <Button className='login-google' type="submit" onClick={signInFromGoogle}> <FcGoogle size={"20px"}/>
                    <InputLabel>  Sign with Google</InputLabel>
                  
                  </Button>
  
                </Form>
              </Col >
  
            </Row>
          </CardContent>
  
        </Card>
  
  
  
  
    </div>
  )
}
