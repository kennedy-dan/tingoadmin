// authUtils.js
import { logOutCustomer } from '~/redux/features/authSlice';
import { store } from '~/redux/store';
export const handleUnauthorized = () => {
    console.log('Unauthorized, logging out');
    store.dispatch(logOutCustomer());
    
    // Use a small timeout to ensure the dispatch has time to complete
    setTimeout(() => {
        window.location.href = '/account/login';
    }, 100);
};