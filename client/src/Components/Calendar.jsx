import React, { useState, useRef } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import EventModal from "./EventModal";

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
                    initialView = "dayGridWeek"
                />
            </div>
            <EventModal 
                isOpen={ modalOpen } 
                onClose={ () => setModalOpen(false) } 
                onEventAdded={ event => onEventAdded(event) }
            />
        </section>
    );
}
