import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import { Button, Card, CardActions, CardContent, CardMedia, Divider, Typography } from '@mui/material';
import { Col, Form, Row } from 'react-bootstrap';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { blue, green, purple, yellow } from '@mui/material/colors';
import axios from 'axios';
import pin from '../../assets/pin.png'
import { Add, Delete, Edit, PlusOne, Update } from '@mui/icons-material';
import Swal from 'sweetalert2'
import NavBar from '../../components/NavBar/NavBar';
import { BiPlus, BiPlusCircle } from 'react-icons/bi';
import UpdateDialog from '../../components/UpdateDialog/UpdateDialog';




export default function ViewNotes() {

  //set space
  const [spacing, setSpacing] = React.useState(2);
  const [searchTerm, setSearchTerm] = React.useState('');
  

  const jsx = `
    <Grid container spacing={${spacing}}>
    `;

  const [expanded, setExpanded] = React.useState(false);
  

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //get data from url
  const [data, setData] = useState([]);

  //get all data
  const loadData = () => {
    axios.get('http://localhost:8080/note/get-all')
      .then(function (response) {
        setData(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }


  //delete data by id
  const deleteRow = (id, e) => {
    e.preventDefault();
    axios.delete(`http://localhost:8080/note/delete-note/${id}`)
      .then(function (response) {
        Swal.fire(
          'Note Deleted Success!'
        )
        loadData();
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
      })

  }

  useEffect(() => {
    loadData();
  }, [])

 
  return (
    <div>

      <NavBar />

<div style={{display:'flex',
        alignItems:'center',
        flexDirection:'row',
        marginTop:5,}}>

<h3 style={{
        color:'purple',
        fontFamily:'sans-serif',marginLeft:20,width:1100}}>Note List</h3>
   <Button className='add-button' startIcon={<BiPlusCircle  />} style={{marginTop:5,alignItems:'',justifyContent:'flex-end',backgroundColor:'green',color:'white'}}>Add Note </Button>
        </div>

        <Divider style={{height:10}}></Divider>


        <div style={{justifyContent:'center',alignItems:'center',display:'flex',marginTop:20}}> 
        <Form.Control style={{width:'500px',marginLeft:20,borderRadius:25}} size="sm" type="text" placeholder="Search" 
        value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value) }} />

        </div>



    
       
     

          <div >
          {/* <input type="text"
                    placeholder=" Search Courses
                    name="search" />
                      <FaSearch/> */}

                    
          
          </div>



      <div 
      style={{padding:30}}>

      <Row md={4}>
        {data.filter((val) => {
          if(searchTerm == ""){
            return val
          }else if(val.title.toLowerCase().includes(searchTerm)){
            return val
          }
        }).map((props) => {
        {/* {data.map((props) => { */}
          return (
            <Col>

              <Grid sx={{ flexGrow: 1 }} container spacing={5}>
                <Grid item xs={12}>
                  <Grid container justifyContent="center" maxWidth={"500px"} marginTop={5} spacing={spacing}>
                    <Card sx={{ maxWidth: "500px", maxHeight: '500px' }}>
                      <CardHeader
                        avatar={
                          <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                            <img src={pin} alt="Logo" />
                          </Avatar>
                        }
                        // action={
                        //   <IconButton aria-label="settings">
                        //     <MoreVertIcon />
                        //   </IconButton>
                        // }
                        title={props.title}
                        subheader={props.dateTime}
                      />
                      <CardMedia
                        component="img"
                        height={200}
                        width={500}
                        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeuTdF4ia0TGiqrI0j5o_wm3MJA64SUsaPGQ&usqp=CAU"
                        alt="image"
                      />

                      
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          {props.description}
                        </Typography>
                      </CardContent>
                      <CardActions disableSpacing>

                        {/* <IconButton color="primary" aria-label="edit" component="label" onClick={() => setModalShow(true)}>
                          <input hidden accept="image/*" />
                          <Edit />
                        </IconButton> */}


      {/* <UpdateDialog
        show={modalShow}
        onHide={() => setModalShow(false)}
      /> */}
                        <UpdateDialog noteId = {props.noteId} onLoad ={loadData}/>
                        <IconButton onClick={(e) => deleteRow(props.noteId, e)} color="primary" aria-label="upload picture" component="label">
                          <input hidden accept="image/*" />
                          <Delete />
                        </IconButton>

                      </CardActions>

                    </Card>
                  </Grid>
                </Grid>

              </Grid>

            </Col>
          )
        })}
      </Row>
      </div>

      


      {/* <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" marginTop={5} spacing={spacing}>
                  
                        {[0, 1, 2].map((value) => (
                            <Grid key={value} item>
                                {/* <Paper
                                    sx={{
                                        height: 450,
                                        width: 350,
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                    }}
                                    
                                /> */}

      {/* <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card> */}
      {/* 
    <br></br> */}


      {/* </Grid>
                        ))}
                    </Grid>
                </Grid>

            </Grid> */}

    </div>
  )
}
