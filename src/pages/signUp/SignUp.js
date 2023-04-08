import React, { useState } from 'react'
import './SignUp.css';
import { Button, Card, CardContent, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, styled, TextField } from '@mui/material';
import { Google, RememberMe, Style, Visibility, VisibilityOff } from '@mui/icons-material';
import { pink, purple } from '@mui/material/colors';
import { Col, Form, Row } from 'react-bootstrap';
import image from '../../assets/signup-1.jpg'
import { FcGoogle } from "react-icons/fc"
import { useNavigate } from 'react-router-dom';

export default function SignUp() {

    const [validated, setValidated] = useState(false);
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
                    <Form.Control type="email" placeholder="Enter email" required />
                    <Form.Control.Feedback type="invalid">
                      Please enter valid email.
                    </Form.Control.Feedback>
                  </Form.Group>
  
                  <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label className='form-text'>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" required />
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
  
                  <Button className='login-btn' type="submit" onClick={handleClick}>Sign Up</Button>
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
                  <Button className='login-google' type="submit" onClick={handleClick}> <FcGoogle size={"20px"}/>
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
