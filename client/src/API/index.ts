import axios from "axios";
import { Event } from "react-big-calendar";

function stringDateFormat (date: Date | undefined): string {
    if (typeof(date) === "undefined")
        return "";
    const numbers = [
        (date.getMonth()+1).toString(),
        (date.getDate()+1).toString(),
        date.getHours().toString(),
        date.getMinutes().toString(),
        date.getSeconds().toString()
    ];
    const [
        month,
        day,
        hours,
        minutes,
        seconds
    ] = numbers.map((num)=>{
            if(num.length === 2)
                return num;
            return `0${num}`;
        });
    return `${date.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const api = axios.create({
    baseURL: "http://localhost:5000/api/v1"
});

async function createTask(task: Event) {
    const { title, start, end, allDay } = task;
    const Task = JSON.stringify({
        title: title,
        start: stringDateFormat(start),
        end: stringDateFormat(end),
        isAllDay: false,
        isCompleted: false
    });
    console.log(Task)
    await api.post('/tasks', Task)
        .then(res=>{
            console.log(res);
        });
}

async function updateTask(task: Event, ObjectId: string) {
    // return await api.put(`/tasks/${ObjectId}`, JSON.stringify(task));
}

async function deleteTask(ObjectId: string) {
    // return await api.delete(`/tasks/${ObjectId}`);
}

async function getTasks() {
    return await api.get('/tasks')
        .then(res => JSON.stringify(res))
        .catch(err => console.error(err));
}

export {
    createTask,
    updateTask,
    deleteTask,
    getTasks
}