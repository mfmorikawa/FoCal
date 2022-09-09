import React, { useState, useRef } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import AddEventModal from "./AddEventModal";

export default function Calendar() {
    const [modalOpen, setModalOpen] = useState(false);
    const calendarRef = useRef(null);

    const onEventAdded = event => {
        let calendarApi = calendarRef.current.getApi();
        calendarApi.addEvent(event);
    }

    return (
        <section>
            <button onClick={ () => setModalOpen(true) }>Add Event</button>
            <div style={ { positon: 'relative', zIndex: 0 } }>    
                <FullCalendar
                    ref={ calendarRef }
                    plugins = { [ dayGridPlugin ] }
                    initialView = "dayGridMonth"
                />
            </div>
            <AddEventModal 
                isOpen={ modalOpen } 
                onClose={ () => setModalOpen(false) } 
                onEventAdded={ event => onEventAdded(event) }
            />
        </section>
    );
}