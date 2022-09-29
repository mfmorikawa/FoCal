import axios from "axios";

const api = axios.create({
    url: "http://localhost:4000"
});

async function createTask(task: Event) {
    return await api.post('/createTask', task)
        .then(res=>{
            const task = res.data.json();
            return task.Objectid;
        });
}

async function updateTask(id: string, newProps: string) {
    return await api.put(`/Task:${id}`, newProps);
}

async function deleteTask(id: string) {
    return await api.delete(`/Tasks:${id}`);
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