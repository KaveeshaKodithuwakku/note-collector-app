import React, { useEffect, useState } from 'react'
import './Reminders.css';
import List from '../../components/List/List';
import NavBar from '../../components/NavBar/NavBar';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import { Button } from '@mui/material';
import AddReminderDialog from '../../components/AddReminderDialog/AddReminderDialog';

export default function Reminders() {

  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    loadData();
  }, [])

  const loadData = () => {
    axios.get('http://localhost:8080/reminder/get-all-reminders')
      .then(function (response) {
        setData(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  
  return (

    <div>
      <div>
        <NavBar />
      </div>

      <div style={{ display: "flex", justifyContent: 'right', marginTop: 10, marginRight: 20 }}>
        <Button onClick={handleOpen} className='add-btn-reminder'>Add Reminder </Button>

        <AddReminderDialog open={open} onClose={handleClose} onLoad={loadData} />
      </div>

      <Row style={{ marginTop: 10 }}>
        <h3 className="main-title" style={{ marginTop: 0 }}>Task Remainder</h3>
      </Row>

      <Row style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

        <Col style={{ width: "50%" }}>
          <div id='site-main'>

            <div className="board">
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

    return currentDay === day && currentMonth === month;
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

    if (currentDay === day) return true;
    return month >= currentMonth && month <= currentMonth + toMonth;
  })

  return filter;

}
