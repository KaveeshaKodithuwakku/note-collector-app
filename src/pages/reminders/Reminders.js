import React, { useEffect, useState } from 'react'
import './Reminders.css';
import List from '../../components/List/List';
import NavBar from '../../components/NavBar/NavBar';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Card, CardContent } from '@mui/material';



export default function Reminders() {

  const [data, setData] = useState([]);


  useEffect(() => {
    loadData();
  }, [])


  //get all data
  const loadData = () => {
    axios.get('http://localhost:8080/reminder/get-all-reminders')
      .then(function (response) {
        setData(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

 
  return (

    <div>
      <NavBar />

      <Row style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <Col style={{ width: "25%" }}>

          <Card sx={{ width:300,height:300,justifyContent:'center' }}>
            <CardContent style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop: 50}}>
              <Fab color="secondary" aria-label="add">
                <AddIcon />
              </Fab>
            </CardContent>

          </Card>


        </Col>

        <Col style={{ width: "50%" }}>
          <div id='site-main'>

            <h3 className="main-title" style={{ marginTop: 0 }}>Task Remainder</h3>

            <div className="board">
              {/* <h2 className='upcoming text-dark'>Today</h2> */}
              <List info={Today(data)} onLoad={loadData}></List>
              <h4 className='upcoming text-dark'>Upcoming</h4>
              <List info={Upcoming(data, 2)} upcoming={true} onLoad={loadData}></List>
            </div>

          </div>

        </Col>

      </Row>


    </div>


  )
}

//today reminders
function Today(task) {
  let currentDay = new Date().getDate();
  let currentMonth = new Date().getMonth();

  let filter = task.filter(data => {
    let day = new Date(data.date).getDate();
    let month = new Date(data.date).getMonth();

    return currentDay == day && currentMonth == month;
  })
  return filter;
}


// upcoming reminders
function Upcoming(task, toMonth) {
  let currentMonth = new Date().getMonth();
  let currentDay = new Date().getDate();

  let filter = task.filter(data => {
    let month = new Date(data.date).getMonth();
    let day = new Date(data.date).getDate();

    if (currentDay == day) return;
    return month >= currentMonth && month <= currentMonth + toMonth;
  })

  return filter;

}
