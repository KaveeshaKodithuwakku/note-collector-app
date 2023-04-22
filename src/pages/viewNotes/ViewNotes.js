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
import { Add, Delete, Edit } from '@mui/icons-material';
import Swal from 'sweetalert2'
import NavBar from '../../components/NavBar/NavBar';
import { BiPlus, BiPlusCircle } from 'react-icons/bi';
import UpdateDialog from '../../components/UpdateDialog/UpdateDialog';
import AddNoteDialog from '../../components/AddNoteDialog/AddNoteDialog';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import './ViewNotes.css';
import swal from 'sweetalert';





export default function ViewNotes() {

  //set space
  const [spacing, setSpacing] = React.useState(2);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [open, setOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const [favorite, setFavorite] = useState(false);


  const jsx = `
    <Grid container spacing={${spacing}}>
    `;

  const [expanded, setExpanded] = React.useState(false);


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseUp = () => {
    setOpenUp(false);
  };

  const handleOpenUp = () => {
    setOpenUp(true);
  };



  //get data from url
  const [data, setData] = useState([]);

  //get all data
  const loadData = () => {

    const userId = localStorage.getItem('userId');

    axios.get(`http://localhost:8080/note/get-notes-by-user-id/${userId}`)
      // axios.get('http://localhost:8080/note/get-all')
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

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8080/note/delete-note/${id}`)
          .then(function (response) {
            Swal.fire(
              'Deleted!',
              'Your note has been deleted.',
              'success'
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
            })
          })
      }
    })
  }


  const updateIsFavorite = (id, status, e) => {

    if (e.target.checked) {
      status = 1;
      console.log('true')
    } else {
      status = 0
      console.log('false')
    }

    e.preventDefault();
    // console.log(`http://localhost:8080/note/update-note-favorite/${id}/${status}`);

    axios.put(`http://localhost:8080/note/update-note-favorite/${id}/${status}`)
      .then(function (response) {
        if (status === 1) {
          swal("Note added to favorite list", "", "success", {
            button: "Ok",

          });
        } else if (status === 0) {
          swal("Note remove from favorite list", "", "success", {
            button: "Ok",

          });
        }
        loadData();
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',

        })
      })

  }

  useEffect(() => {
    loadData();
  }, [])


  return (
    <div>

      <NavBar />

      <div style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 5,
      }}>

        <h5 style={{
          color: 'purple',
          fontFamily: 'sans-serif', marginLeft: 20, width: 1100
        }}>Note List</h5>
        <Button onClick={handleOpen} className='add-note-button-new' startIcon={<BiPlusCircle />} >Add Note </Button>

        <AddNoteDialog open={open} onClose={handleClose} onLoad={loadData} />
      </div>

      <Divider style={{ height: 10 }}></Divider>


      <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop: 20 }}>
        <Form.Control style={{ width: '500px', marginLeft: 20, borderRadius: 25 }} size="sm" type="text" placeholder="Search....."
          value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value) }} />

      </div>


      <div
        style={{ paddingLeft: 50, paddingRight: 30 }}>

        <Row md={4}>
          {data.filter((val) => {
            if (searchTerm === "") {
              return val
            } else if (val.title.toLowerCase().includes(searchTerm)) {
              return val
            }
          }).map((props) => {
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
                          action={
                            <Checkbox defaultChecked={props.favorite} onChange={(e) => updateIsFavorite(props.noteId, 0, e)} icon={<FavoriteBorder />} checkedIcon={<Favorite />} sx={{
                              color: purple[800],
                              '&.Mui-checked': {
                                color: purple[600],
                              },
                            }} />
                          }
                          title={props.title}
                          subheader={props.dateTime}
                        />
                        <CardMedia
                          component="img"
                          height={170}
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

                          <IconButton color="primary" aria-label="edit" component="label" onClick={handleOpenUp}>
                            <input hidden accept="image/*" />
                            <Edit />
                          </IconButton>
                          <UpdateDialog open={openUp} onClose={handleCloseUp} noteId={props.noteId} onLoad={loadData} />
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


    </div>
  )
}
