import React, { useEffect, useState } from 'react'
import { Card, CardActions, CardContent, CardMedia, Divider, Typography } from '@mui/material';
import { Form, Row } from 'react-bootstrap';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { blue, purple } from '@mui/material/colors';
import axios from 'axios';
import pin from '../../assets/pin.png'
import { Delete, Edit } from '@mui/icons-material';
import Swal from 'sweetalert2'
import NavBar from '../../components/NavBar/NavBar';
import UpdateDialog from '../../components/UpdateDialog/UpdateDialog';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import swal from 'sweetalert';


export default function FavoriteNotes() {

  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const getNoteIdToEdit = async (id,e) => {
    console.log("**** id --- "+id);
    e.preventDefault();
  await localStorage.setItem('noteId',id);
  handleOpen();
  };


  const [data, setData] = useState([]);

  const loadData = () => {

    const userId = localStorage.getItem('userId');

    axios.get(`api/v1/note/get-all-favorites/${userId}`)
      .then(function (response) {
        setData(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const deleteRow = (id, e) => {
    e.preventDefault();
    axios.delete(`api/v1/note/delete-note/${id}`)
      .then(function (response) {
        Swal.fire(
          'Note Deleted Success!'
        )
        loadData();
      })
      .catch(function (error) {
        console.log(error);
        Swal.fire({
          icon: 'error',
          text: 'Something went wrong!',
        })
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

    axios.put(`api/v1/note/update-note-favorite/${id}/${status}`)
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

      <div>
        <NavBar />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginTop: 5, }}>

        <h5 style={{ color: 'purple', fontFamily: 'sans-serif', marginLeft: 20, width: 700 }}>
          Favorite Note List
        </h5>

        <Form.Control style={{ width: '500px', marginLeft: 20, borderRadius: 20 }} size="sm" type="text" placeholder="Search......"
          value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value) }} />

      </div>

      <Divider style={{ height: 10 }}></Divider>

      <div style={{ paddingLeft: 50, paddingRight: 30 }}>

        <Row md={3}>
          {data.filter((val) => {
            if (searchTerm === "") {
              return val
            } else if (val.title.toLowerCase().includes(searchTerm)) {
              return val
            }
            return false;
          }).map((props) => {
            return (
              <div key={props.noteId}>
                <Card sx={{ maxWidth: "500px", maxHeight: '500px', margin: 5 }} key={props.noteId}>
                  <CardHeader key={props.noteId}
                    avatar={
                      <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                        <img src={pin} alt="Logo" />
                      </Avatar>
                    }
                    action={
                      <Checkbox value={props.favorite} onChange={(e) => updateIsFavorite(props.noteId, 0, e)} icon={<FavoriteBorder />} checkedIcon={<Favorite />} sx={{
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
                    image={(axios.defaults.baseURL +'api/v1/note/download/'+props.file_path)} 
                    alt="image"
                  />

                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {props.description}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>

                    <IconButton color="primary" aria-label="edit" component="label" onClick={(e) => getNoteIdToEdit(props.noteId, e)}>
                      <input hidden accept="image/*" />
                      <Edit />
                    </IconButton>
                 
                    <UpdateDialog open={open} onClose={handleClose} noteId={localStorage.getItem('noteId')} onLoad={loadData} />

                    <IconButton onClick={(e) => deleteRow(props.noteId, e)} color="primary" aria-label="upload picture" component="label">
                      <input hidden accept="image/*" />
                      <Delete />
                    </IconButton>

                  </CardActions>
                </Card>
              </div>

            )
          })}
        </Row>
      </div>
    </div>
  )
}
