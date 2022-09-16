import { useState } from "react";
import Calendar from "react-calendar";
import './css/Calendar.css'

export default function Calendars() {
    const [date, setDate] = useState(new Date());
    return (
            <Calendar
                className="sticky top-0 left-0 mt-3"
                onChange={(newDate: Date) => setDate(newDate)}
            ></Calendar>
    );
}