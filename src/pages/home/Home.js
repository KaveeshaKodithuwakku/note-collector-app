import React from 'react'
import './Home.css';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import noteImage from '../../assets/calendar (1).png'


export default function Home() {

  const navigate = useNavigate();

  function handleClickCalendar() {
    navigate('/calendar');
  }

  function handleClickView() {
    navigate('/view');
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

    <div className='body'>

      <NavBar />



      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', marginTop: 100 }}>

        <p className='body-content'>The simpleset way to </p>
        <p className='body-content'>keep notes.  </p>
        <p className='body-content2'>One combined workspace all you works.My Notes is simplest tool that helps your works get organized and aligned.</p>

        <Grid sx={{ flexGrow: 10 }} container spacing={5}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={spacing}>
              {[0].map((value) => (
                <Grid key={value} item>
                  {/* <Paper
                sx={{
                  height: 140,
                  width: 200,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                    backgroundImage: 
                }}
                
              
              /> */}

                  <div style={{ width: 300, height: 200, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <Card onClick={handleClickView}>
                      <CardContent style={{ width: 200, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                        <img src={noteImage} alt="Logo" />


                      </CardContent>

                      <CardContent style={{ width: 200, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>


                        <h5>Notes</h5>
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
                        <img src={noteImage} alt="Logo" />


                      </CardContent>

                      <CardContent style={{ width: 200, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>


                        <h5>Calendar</h5>
                      </CardContent>
                    </Card>
                  </div>

                </Grid>
              ))}

              {[0].map((value) => (
                <Grid key={value} item>
                  <div style={{ width: 300, height: 200, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <Card>
                      <CardContent style={{ width: 200, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                        <img src={noteImage} alt="Logo" />


                      </CardContent>

                      <CardContent style={{ width: 200, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>


                        <h5>Profile</h5>
                      </CardContent>
                    </Card>
                  </div>

                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

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
