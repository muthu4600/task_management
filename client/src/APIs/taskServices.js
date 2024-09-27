import axios from "axios";
const serverUrl = "http://localhost:5000";

export const getTasks = async () => {
    const response = await axios.get(serverUrl + '/task/all', { withCredentials: true });
    return response.data;
}

export const createTask = async (task) => {
    const response = await axios.post(serverUrl + '/task/add', task, { withCredentials: true });
    return response.data;
}

export const updateTask = async (task) => {
    const response = await axios.post(serverUrl + '/task/update/' + +task.id, task, { withCredentials: true });
    return response.data;
}

export const deleteTask = async (taskId) => {
    const response = await axios.post(serverUrl + '/task/delete/' + taskId, {}, { withCredentials: true });
    return response.data;
}