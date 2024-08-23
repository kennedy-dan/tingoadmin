import React from 'react';
import { useSelector } from 'react-redux';

const WidgetUserWelcome = () => {
    const {user} = useSelector(state => state.auth)
    return (
        <div className="ps-block--user-wellcome">
            <div className="ps-block__left">
                <img src="/img/user/admin.jpg" alt="" />
            </div>
            <div className="ps-block__right">
                <p>
                    Hello,<a href="#">{user?.first_name}</a>
                </p>
            </div>
            {/* <div className="ps-block__action">
                <a href="#">
                    <i className="icon-exit"></i>
                </a>
            </div> */}
        </div>
    );
};

export default WidgetUserWelcome;
