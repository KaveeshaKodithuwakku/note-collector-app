import React from 'react'
import './Home.css';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import noteImage from '../../assets/file.png'
import favImage from '../../assets/favorite.png'
import profileImage from '../../assets/user.png'
import FavoriteNotes from '../favoriteNote/FavoriteNotes';



export default function Home() {

  const navigate = useNavigate();

  function handleClickCalendar() {
    navigate('/favorite-notes');
  }

  function handleClickView() {
    navigate('/view');
  }

  function handleClickSettings() {
    navigate('/settings');
  }


  //set space 
  const [spacing, setSpacing] = React.useState(2);

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  const jsx = `
<Grid container spacing={${spacing}}>
`;


  return (

    <div className='home-body'>

<NavBar />

      <div className='wave'>

<div>

<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', marginTop: 0 }}>

<div style={{marginTop:100}}>
<p className='body-content'>The simpleset way to </p>
  <p className='body-content'>keep notes.  </p>
  <p className='body-content2'>One combined workspace all your works.My Notes is simplest tool that helps your works get organized and aligned.</p>

</div>

  <Grid sx={{ flexGrow: 10 }} container spacing={5}>
    <Grid item xs={12}>
      <Grid container justifyContent="center" spacing={spacing}>
        {[0].map((value) => (
          <Grid key={value} item>
        
            <div style={{ width: 300, height: 200, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
              <Card onClick={handleClickView} className='title-btn'>
                <CardContent style={{ width: 200, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                  <img src={noteImage} alt="Logo" />


                </CardContent>

                <CardContent style={{ width: 200, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>


                  <h5 className='title-btn'>Notes</h5>
                </CardContent>
              </Card>
            </div>


          </Grid>
        ))}

        {[0].map((value) => (
          <Grid key={value} item>
            <div style={{ width: 300, height: 200, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
              <Card onClick={handleClickCalendar}>
                <CardContent style={{ width: 200, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                  <img src={favImage} alt="Logo" />


                </CardContent>

                <CardContent style={{ width: 200, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>


                  <h5 style={{color:'blue'}}> Favorites</h5>
                </CardContent>
              </Card>
            </div>

          </Grid>
        ))}

        {[0].map((value) => (
          <Grid key={value} item>
            <div style={{ width: 300, height: 200, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
              <Card onClick={handleClickSettings}>
                <CardContent style={{ width: 200, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                  <img src={profileImage} alt="Logo" />


                </CardContent>

                <CardContent style={{ width: 200, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>


                  <h5 style={{color:'blue'}}>Profile</h5>
                </CardContent>
              </Card>
            </div>

          </Grid>
        ))}
      </Grid>
    </Grid>
  </Grid>

</div>


      </div>

      
      </div>



      {/* 
 *************************************************** */}

      {/* <div style={{justifyContent:"center",alignItems:"center",display:"flex",flexDirection:"column"}}>
        <Button className='body-button' onClick={handleClick} style={{marginTop:5}}>Start Your Jounrney </Button>

        
      </div>

      <div>
        <p className='body-title'>Welcome to my notes....</p>
        <p className='body-content'>Capure your moments with MyNotes. </p>
        <p className='body-content2'>......... </p>
      </div> */}

      {/*      
     ************************************************************* */}

    </div>
  )
}
