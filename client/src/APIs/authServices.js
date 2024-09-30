import axios from "axios";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const signUp = async (userDetails) => {
    const response = await axios.post(serverUrl + '/auth/register', userDetails);
    return response.data;
}

export const login = async (userDetails) => {
    const response = await axios.post(serverUrl + '/auth/login', userDetails);
    return response.data;
}