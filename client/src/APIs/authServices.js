import axios from "axios";
const serverUrl = "http://localhost:5000";

export const signUp = async (userDetails) => {
    const response = await axios.post(serverUrl + '/auth/register', userDetails);
    return response.data;
}

export const login = async (userDetails) => {
    const response = await axios.post(serverUrl + '/auth/login', userDetails);
    return response.data;
}