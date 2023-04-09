import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import { Card, CardActions, CardContent, CardMedia, Divider, Typography } from '@mui/material';
import { Col, Row } from 'react-bootstrap';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { blue, green, purple, yellow} from '@mui/material/colors';
import axios from 'axios';
import pin from '../../assets/pin.png'
import { Delete, Edit, Update } from '@mui/icons-material';
import Swal from 'sweetalert2'
import NavBar from '../../components/NavBar/NavBar';


export default function ViewNotes() {

  //set space
  const [spacing, setSpacing] = React.useState(2);

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
  const deleteRow = (id,e) => { 
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

<NavBar/>

      <Row>
        <p>Note List</p>

        {/* <p>Note List</p> */}
      </Row>

      <Divider></Divider>
     
     
      <Row  md={4} style={{paddingLeft:20}}>
        {data.map((props) => {
          return (
            <Col>

              <Grid sx={{ flexGrow: 1 }} container spacing={3}>
                <Grid item xs={12}>
                  <Grid container justifyContent="center" maxWidth={"500px"} marginTop={5} spacing={spacing}>
                    <Card sx={{ maxWidth: "500px", maxHeight: '500px' }}>
                      <CardHeader
                        avatar={
                          <Avatar sx={{ bgcolor: green[300] }} aria-label="recipe">
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
                        height="194"
                        width={500}
                        image="https://write.geeksforgeeks.org/static/media/Group%20210.08204759.svg"
                        alt="Paella dish"
                      />
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          {props.description}
                        </Typography>
                      </CardContent>
                      <CardActions disableSpacing>

                        <IconButton color="primary" aria-label="upload picture" component="label">
                          <input hidden accept="image/*" type="file" />
                          <Edit />
                        </IconButton>
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
