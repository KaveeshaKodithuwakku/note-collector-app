import React from 'react'
import './Login.css';
import { Button, Card, CardContent, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, styled, TextField } from '@mui/material';
import { Google, RememberMe, Style, Visibility, VisibilityOff } from '@mui/icons-material';
import { pink, purple } from '@mui/material/colors';





export default function Login() {

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

     const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
          backgroundColor: purple[700],
        },
      }));
    



  return (
    <div >
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh'}}
      >

        <Grid item xs={3} display="flex" alignItems="center" flexDirection="column" marginTop={10}>


          <Card sx={{ minWidth: 200, borderRadius: 5 }}>
            <CardContent style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              flexDirection: 'column',
              backgroundColor: 'transparent'
            }}>

              <h2>Sign In</h2>
              <TextField sx={{ m: 1, width: '30ch' }} size="small" id="outlined-basic" label="Name" variant="outlined" margin="normal" placeholder="Enter Name" />
              <br></br>

              <FormControl sx={{ m: 1, width: '30ch' }} size="small" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>

              <br></br>

              <ColorButton style={{width:"200px"}} variant="contained">Login</ColorButton>
              <br></br>
              <h7>Or</h7>
              <br></br>
              <h7>Sign in with</h7>
              <br></br>
              <Button sx={{ m: 1, width: '30ch' }} variant="outlined" startIcon={<img src={"google.png"} />}>
                Google
              </Button>
            </CardContent>

          </Card>
        </Grid>


      </Grid>





    </div>
  )
}
