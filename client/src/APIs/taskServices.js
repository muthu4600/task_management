import axios from "axios";
import Cookies from "js-cookie";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const options = {
    withCredentials: true,
    headers: { 'Authorization': Cookies.get('token') }
};

const catchError = (err) => {
    console.error(err);
    return { error: err?.message || "Oops! Something went wrong" };
}

export const getTasks = async () => {
    try {
        const response = await axios.get(serverUrl + '/task/all', options);
        return response.data;
    } catch (error) {
        catchError(error);
    }

}

export const createTask = async (task) => {
    try {
        const response = await axios.post(serverUrl + '/task/add', task, options);
        return response.data;
    } catch (error) {
        catchError(error);
    }

}

export const updateTask = async (task) => {
    try {
        const response = await axios.post(serverUrl + '/task/update/' + +task.id, task, options);
        return response.data;
    } catch (error) {
        catchError(error);
    }
}

export const deleteTask = async (taskId) => {
    try {
        const response = await axios.post(serverUrl + '/task/delete/' + taskId, {}, options);
        return response.data;
    } catch (error) {
        catchError(error);
    }
}