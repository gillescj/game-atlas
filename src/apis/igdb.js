import axios from 'axios';

const KEY = 'efb5f487c944d641ebb3d0394fafc386';

export default axios.create({
    baseURL: 'https://gillescj-cors-anywhere.herokuapp.com/https://api-v3.igdb.com/',
    timeout: 0,
    headers: {
        Accept: 'application/json',
        'user-key': KEY,
        'Content-Type': 'text/plain',
    },
});
