import axios from "axios";
import { Event } from "react-big-calendar";

const api = axios.create({
    baseURL: "http://localhost:5000/api/v1"
});

async function createTask(task: Event) {
    return await api.post('/createTask', task)
        .then(res=>{
            const task = res.data.json();
            return task.Objectid;
        });
}

async function updateTask(task: Event, index: number) {
    return await api.put(`/Task:${index}`, JSON.stringify(task));
}

async function deleteTask(task:Event, index: number) {
    return await api.delete(`/Tasks:${index}`);
}

async function getTasks() {
    return await api.get('/Tasks')
        .then(res=> res.data.json());
}

export {
    createTask,
    updateTask,
    deleteTask,
    getTasks
}