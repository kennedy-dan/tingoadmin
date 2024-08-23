import Link from 'next/link';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FormHeaderSearch from '~/components/shared/forms/FormHeaderSearch';
import { logOutCustomer } from '~/redux/features/authSlice';

const HeaderDashboard = ({
    title = 'Dashboard',
    description = 'Everything here',
}) => {
    const dispatch = useDispatch()
    const {user} = useSelector(state=> state.auth)

    const logOut = () => {
        dispatch(logOutCustomer());
      };

    
    return (
        <header className="header--dashboard">
            <div className="header__left">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
            <div className="header__center">
                <FormHeaderSearch />
            </div>
            {!user &&  <div className="header__right">
                <Link className="header__site-link" href="/account/login">
                    <span>Login</span>
                    <i className="icon-exit-right"></i>
                </Link>
            </div>}

            {user &&  <div className="header__right">
                <button onClick={logOut} className="header__site-link" >
                    <span>Logout</span>
                    <i className="icon-exit-right"></i>
                </button>
            </div>}
           
        </header>
    );
};

export default HeaderDashboard;
