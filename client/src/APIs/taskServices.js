import axios from "axios";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

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