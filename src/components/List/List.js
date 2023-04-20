import React from 'react'
import image from '../../assets/ringing.png';
import { FaWindowClose } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';



export default function List(props) {

  return (
    <div>
         <ul>
          {iterate(props)}
      </ul>
    </div>
  )
}


// function iterate(data, flag,props){
    function iterate(propsI){
    if (!propsI.info) return;
    const bgColor = propsI.upcoming ? { backgroundColor : "#F1EDEC"} : {};


  //delete data by id
  const deleteRow = (id, e) => {
    e.preventDefault();
    axios.delete(`http://localhost:8080/reminder/delete-reminder/${id}`)
      .then(function (response) {
        Swal.fire(
          'Reminder Deleted Success!'
        )
        propsI.onLoad();
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

    return (
        <>
            {
                propsI.info.map( (task, index) => {
                   
                    return (
                        <li key={index}>
                            <div className="flex" style={bgColor}>
                                <div style={{margin: '5px',marginLeft:30,alignItems:'center',justifyItems:'center'}}>
                                <img src={image} alt="img" style={{width:20,height:20,alignItems:'center',justifyItems:'center'}}/>
                                </div>
                              
                                <div style={{width:300,alignItems:'center',justifyItems:'center',display:'flex'}}>
                                    
                                    <h5  style={{color:'darkblue',gap:'1em'}}>{task.title}</h5>
                                  
                                    <h6 style={{marginLeft: 20,marginRight:20}}>{task.date + " " +task.time}</h6>

                                    <FaWindowClose color='red' onClick={(e) => deleteRow(task.reminderId, e)} />
                                </div>

                               
                            </div>
                        </li>
                    )
                })
            }
        </>
    )
}
