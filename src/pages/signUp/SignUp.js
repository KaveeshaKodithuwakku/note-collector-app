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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/init-firbase';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function SignUp() {

  const [validated, setValidated] = useState(false);
  const { signInWithGoogle, register } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [conPassword, setConPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate();

  //------------------- alert ------------------------------

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

  //--------------------------------------------------------

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  
  //-------------- handle navigations ---------------------------
  function handleClick() {
    navigate('/home');
  }

  function handleLoginClick() {
    navigate('/');
  }

  function handleRedirectToOrBack() {
    navigate('/home');
  }

  //---------------------------------------------------------

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


  //------------------------- create account -------------------------------

  const onSubmit = async (e) => {
    e.preventDefault()

    if (email != '' || password != '' || conPassword != '') {
      if (password == conPassword) {

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
      } else {
        console.log("mis match");
        setMessage("Please check password and confirm password again...");
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
        // handleRedirectToOrBack()
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
            <h4 className='login-title'> Sign Up</h4>
          </div>

          <br></br>
          <div>
            <TextField value={email}
              onChange={e => setEmail(e.target.value)} id="outlined-basic" label="Email*" variant="outlined" size="small" margin="dense" style={{ width: 300, fontSize: '' }} />
          </div>

          <div>
            <TextField value={password}
              onChange={e => setPassword(e.target.value)} id="outlined-basic" label="Password*" type='password' variant="outlined" size="small" margin="none" style={{ width: 300 }} />
          </div>

          <div>
            <TextField value={conPassword}
              onChange={e => setConPassword(e.target.value)} id="outlined-basic" label="Confirm Password*" type='password' variant="outlined" size="small" margin="dense" style={{ width: 300 }} />
          </div>
          {/* 
          <div style={{ display: 'flex', justifyItems: 'baseline' }}>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
              <Col>
                <Form.Check label="Remember me" fontSize= '5px' />
              </Col>
            </Form.Group>

          </div> */}


          <div>
            <Button className='login-btn' type="submit" onClick={onSubmit}>Sign Up</Button>
          </div>

          <div style={{ display: 'flex', fontSize: '12px', marginTop: 5 }}>
            <p>Do you already have an account?</p>
            <p style={{ color: 'blue', fontWeight: 'bold' }} onClick={handleLoginClick}> Sign In</p>
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

   


    // <div className='body-signup' style={{
    //     display: "flex",
    //     alignItems: "center",
    //     flexDirection: 'column'
    //   }}>



    //     <Card sx={{ maxWidth: '500vw', borderRadius: 1,marginTop:2 }}>
    //       <CardContent style={{
    //         display: "flex",
    //         alignItems: "center",
    //         height: "540px",
    //         flexDirection: 'column',
    //         marginTop:10
    //       }}>

    //         <Row>

    //           <Col>
    //             <img src={image} alt="" className='image-style' />
    //           </Col>
    //           <Col >

    //             <h4 className='login-title'> Sign Up </h4>
    //             <br></br>
    //             <Form className='text_content' noValidate validated={validated} onSubmit={handleSubmit}>



    //               <Form.Group className="mb-3" controlId="formGroupEmail">
    //                 <Form.Label className='form-text'>Email address</Form.Label>
    //                 <Form.Control type="email" placeholder="Enter email" required  value={email}
    //             onChange={e => setEmail(e.target.value)}/>
    //                 <Form.Control.Feedback type="invalid">
    //                   Please enter valid email.
    //                 </Form.Control.Feedback>
    //               </Form.Group>

    //               <Form.Group className="mb-3" controlId="formGroupPassword">
    //                 <Form.Label className='form-text'>Password</Form.Label>
    //                 <Form.Control type="password" placeholder="Password" required  value={password}
    //             onChange={e => setPassword(e.target.value)}/>
    //                 <Form.Control.Feedback type="invalid">
    //                   Please enter valid password.
    //                 </Form.Control.Feedback>
    //               </Form.Group>

    //               <Form.Group className="mb-3" controlId="formGroupPassword">
    //                 <Form.Label className='form-text'>Confirm Password</Form.Label>
    //                 <Form.Control type="password" placeholder="Password" required />
    //                 <Form.Control.Feedback type="invalid">
    //                   Please entered password.
    //                 </Form.Control.Feedback>
    //               </Form.Group>

    //               {/* <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
    //                 <Col>
    //                   <Form.Check label="Remember me" />
    //                 </Col>
    //               </Form.Group> */}

    //               <Button className='login-btn' type="submit" onClick={onSubmit}>Sign Up</Button>
    //               <br></br>
    //               <br></br>

    //               <Row style={{display:"flex",justifyContent:"center",alignItems: "center"}}>
    //                 <Col className='header-col1'>
    //                   <Form.Text className='header-col1-text'>
    //                     You already have an account?
    //                   </Form.Text>
    //                 </Col>
    //                 <Col className='header-col2'>
    //                   <Form.Text className='header-col2-text' onClick={handleLoginClick}>
    //                     Sign In
    //                   </Form.Text>
    //                 </Col>
    //               </Row>
    //               <Divider>OR</Divider>
    //               <br></br>
    //               <Button className='login-google' type="submit" onClick={signInFromGoogle}> <FcGoogle size={"20px"}/>
    //                 <InputLabel>  Sign with Google</InputLabel>

    //               </Button>

    //             </Form>
    //           </Col >

    //         </Row>
    //   </CardContent>

    // </Card>




    // </div>
  )
}
