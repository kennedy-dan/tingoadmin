// authUtils.js
import { logOutCustomer } from '~/redux/features/authSlice';
// Create a separate utility function to handle 401 errors
export const handleUnauthorized = () => {
    const store = require('~/redux/store').store;
    store.dispatch(logOutCustomer());
    window.location.href = '/account/login';
};
