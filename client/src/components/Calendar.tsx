import { useCallback, useState } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer, Event } from "react-big-calendar";
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop';
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import DatePicker from "react-datepicker";
import enUS from "date-fns/locale/en-US";
import addHours from "date-fns/addHours";
import startOfHour from 'date-fns/startOfHour';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import "react-big-calendar/lib/css/react-big-calendar.css";
//TODO, in order to move events we muist have a way to reference them, since they cannot be referenced using this. 
// In order to do so we will create an index property, so that we can filter the particular event out when it is moved and then
// use spread the others and update the entire event array. 
// interface EventIndexed

const locales = {
	"en-US": enUS
};
const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales
});
const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1);
const now = new Date();
const start = endOfHour(now);
const end = addHours(start, 1);
const FullCalendar = withDragAndDrop(BigCalendar);

const testEvents = [
	{
		id: 0,
		title: "Operating Systems",
		start: new Date(2022, 8, 19, 11, 30),
		end: new Date(2022, 8, 19, 12, 50)
	},
	{
		id: 1,
		title: "Python Programming",
		start: new Date(2022, 8, 19, 18),
		end: new Date(2022, 8, 19, 19, 50)
	},
	{
		id: 2,
		title: "Software Engineering",
		start: new Date(2022, 8, 20, 15),
		end: new Date(2022, 8, 20, 16, 50)
	}
];

export default function Calendar() {
	const [events, setEvents] = useState<Event[]>(testEvents);
// need to implement index property on event interface for this to work
	// const moveEvent = useCallback(({event, start, end, isAllDay: droppedOnAllDaySlot = false}) => {
	// 	const { allDay } = event;
	// 	if(!allDay && droppedOnAllDaySlot){
	// 		event.allDay = true;
	// 	}
	// 	setEvents((prev) => {
	// 		const existing  = prev.find((ev) => ev.id === event.id) ?? {}

	// 	})
	// }, [setEvents]);

	const onEventResize: withDragAndDropProps['onEventResize'] = data => {
		const { start, end } = data;
		setEvents(currentEvents => {
			const firstEvent = {
				start: new Date(start),
				end: new Date(end)
			};
			return [...currentEvents, firstEvent];
		});
	}
	//TODO: fill in after moveEvent is implemented
	const onEventDrop: withDragAndDropProps['onEventDrop'] = data =>{
		const { event, start, end } = data;
		console.table(data);
	}
	return (
		<>
			<FullCalendar
				localizer={localizer}
				events={events}
				onEventDrop={onEventDrop}
				onEventResize={onEventResize}
				resizable
				style={{ height: 600, margin: 50 }}
			/>
		</>
	);
}


