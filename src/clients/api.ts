import axios from 'axios';

export const apiClient = axios.create({
    baseURL: 'http://localhost:4000/',
    headers: {
        Authorization:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY5Mzc3NGI1MTkxNTYyNDFjMGRlNjhkYyIsInVzZXJuYW1lIjoiYk9iMiIsImVtYWlsIjoiYm9iMkBlbWFpbC5jb20iLCJyb2xlIjoidXNlciJ9LCJpYXQiOjE3NjUyNDIzNjAsImV4cCI6MTc2NTMyODc2MH0.-cyg0R-wCUBMQLdCTAMQAMDc3rKxe6ZNhHWgeZAz6Ig"
    }
});