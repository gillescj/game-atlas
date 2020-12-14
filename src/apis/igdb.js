import axios from 'axios';

export default axios.create({
    method: 'POST',
    baseURL: `${process.env.REACT_APP_CORS_PROXY}https://api.igdb.com/v4/`,
    timeout: 0,
    headers: {
        Accept: 'application/json',
        'Client-ID': process.env.REACT_APP_CLIENT_ID,
    },
});
