import { Button } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

export default function RoundButton(props) {

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));

  return (
    <div>
       <ColorButton variant="ccontained">{props.name}</ColorButton>
         {/* <Button variant="outlined" color='' style={{color:'white',padding:10,width:"15vw"}}>{props.name}</Button> */}
    </div>
  )
}
