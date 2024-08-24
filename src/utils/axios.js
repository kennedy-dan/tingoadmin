// import { store } from '~/redux/store';

import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { logOutCustomer } from '~/redux/features/authSlice';
import { useRouter } from 'next/navigation';
import { handleUnauthorized } from './authutils';

let token;




const getToken1 = async () => {
    try {
        let data = await localStorage.getItem('persist:tingoadmin');
        let token = await JSON.parse(data).token.replace(/"/g, '');

        return token;
    } catch (err) {}
};

const instance = axios.create({
    baseURL: 'https://staging.tingoexpress.com/api/',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'Store-Uuid': 'NVx8POSp',

        // Authorization: `Bearer ${token}`,
    },
    crossDomain: true,
    withCredentials: true,
});

instance.interceptors.request.use(async (config) => {
    try {
        token = await getToken1();
        if (config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    } catch (err) {
        //toast.error(err);
    }
});

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (err) => {
        if (err.response.data.message) {
            toast.error(err.response.data.message, {
                autoClose: 7000,
            });
        } else {
            toast.error(err.message);
        }
        if (typeof err.response === 'undefined') {
            // toast.error(err.message);
            return;
        }

        if (err.response && err.response.status == 403) {
            // redirect to login page
            // return (window.location.href = "/");
        }

        if (
            err.response.status == 401 &&
            window.location.pathname !== '/account/login'
        ) {
                const store = require('~/redux/store').store;
                
                // Dispatch logout action
                // store.dispatch(logOutCustomer());
                
                // Redirect to login page
                // window.location.href = '/account/login';
            // console.log('yh');
            // Use the custom function to handle unauthorized access
            handleUnauthorized();
        }
        return Promise.reject(err);
    }
);

export default instance;
