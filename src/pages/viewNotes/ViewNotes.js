import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Col, Container, Row } from 'react-bootstrap';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { blue, green, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import logo from '../../assets/logo.png'
import pin from '../../assets/pin.png'

import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { Delete, Update, Upload } from '@mui/icons-material';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ViewNotes() {

  const [spacing, setSpacing] = React.useState(2);


  const jsx = `
    <Grid container spacing={${spacing}}>
    `;

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [data, setData] = useState([]);

  const loadData = () => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(function (response) {
        setData(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  useEffect(() => {
    loadData();
  }, [])



  return (
    <div>
     
      <div className='search-btn'>
      <h7 > Search by : </h7>
      </div>
      <Row xs={1} md={3} >
        {data.map((props) => {
          return (
            <Col>

              <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                <Grid item xs={12}>
                  <Grid container justifyContent="center" marginTop={5} spacing={spacing}>
                    <Card sx={{ maxWidth: 345, maxHeight: '500px' }}>
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
                        title="Shrimp and Chorizo Paella"
                        subheader="September 14, 2016"
                      />
                      <CardMedia
                        component="img"
                        height="194"
                        image="https://write.geeksforgeeks.org/static/media/Group%20210.08204759.svg"
                        alt="Paella dish"
                      />
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          {props.body}
                        </Typography>
                      </CardContent>
                      <CardActions disableSpacing>

                        <IconButton color="primary" aria-label="upload picture" component="label">
                          <input hidden accept="image/*" type="file" />
                          <Update />
                        </IconButton>
                        <IconButton color="primary" aria-label="upload picture" component="label">
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
