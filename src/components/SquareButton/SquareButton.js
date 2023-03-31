
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import React from 'react'



export default function SquareButton(props) {

 
  return (
    <div>
          {/* <button style={{color:'white',backgroundColor:props.color,padding:10, borderRadius:100}}>{props.name}</button> */}
 <Button style={{color:'white',backgroundColor:props.color,padding:10, borderRadius:5}}>{props.name}</Button>
    </div>
  )
}
