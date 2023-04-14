import React, { Component } from 'react'
import FullCalendar from "@fullcalendar/react";  
import dayGridPlugin from "@fullcalendar/daygrid";  
import timeGridPlugin from "@fullcalendar/timegrid";  
import interactionPlugin from "@fullcalendar/interaction";  
import NavBar from '../../components/NavBar/NavBar';
const events = [{ title: "Today", date: new Date() }]; 

export class Calendar extends Component {  

    render() {  

        return (  

<div>
<NavBar/>

<div className="container">  
                <div className="row title" style={{ marginTop: "20px" }} >  
                    <div class="col-sm-12 btn btn-info">  
                        FullCalendar In MyNotes 
               </div>  
                </div>  
                <FullCalendar  
                    defaultView="dayGridMonth"  
                    plugins={[dayGridPlugin]}  
                    // plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}  
                    // initialView='dayGridMonth'
                    // headerToolbar={{left:'prev,next',center:'title',right:'dayGridMonth,timeGridWeek,timeGridDay'}}
                    events={events} 
                    // events={this.state.practiceTimes} 
                    editable={true}
                    selectable={true}
                    dayMaxEvents={true}
                 
                />  
            </div>  
</div>

           
        )  
    }  
}  
  
export default Calendar 
