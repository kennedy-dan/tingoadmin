import React, {useState} from 'react';
import Head from 'next/head';
import { Drawer, Space } from 'antd';
import FooterCopyright from '~/components/shared/footers/FooterCopyright';
import MenuSidebar from '~/components/shared/menus/MenuSidebar';
import WidgetEarningSidebar from '~/components/shared/widgets/WidgetEarningSidebar';
import WidgetUserWelcome from '~/components/shared/widgets/WidgetUserWelcome';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';
import { MdOutlineCancel } from "react-icons/md";
import { IoIosMenu } from "react-icons/io";
import Link from "next/link";
import { logOutCustomer } from '~/redux/features/authSlice';
import { useDispatch, useSelector } from 'react-redux';


const ContainerDefault = ({ children, title }) => {
    let titleView;
    if (title !== undefined) {
        titleView = process.env.title + ' | ' + title;
    } else {
        titleView = process.env.title + ' | ' + process.env.titleDescription;
    }
    const dispatch = useDispatch()
    const {user} = useSelector(state=> state.auth)

    const logOut = () => {
        dispatch(logOutCustomer());
      };
    const [advplacement, setadvPlacement] = useState("left");
    const [openadv, setOpenAdv] = useState(false);
    const showDrawerAdv = () => {
        setOpenAdv(true);
      };
    
      const onCloseadv = () => {
        setOpenAdv(false);
      };

    return (
        <div className="martfury-admin">
            <Head>
                <title>{titleView}</title>
            </Head>
            <main className="ps-main">
                <div className='xl:hidden' >
                    <button onClick={showDrawerAdv} >
                        <IoIosMenu size={37} />
                    </button>
                </div>
                <div className="ps-main__sidebar">
                    <div className="ps-sidebar">
                        <div className="ps-sidebar__top">
                            <WidgetUserWelcome />
                            {/* <WidgetEarningSidebar /> */}
                        </div>
                        <div className="ps-sidebar__content">
                            <div className="ps-sidebar__center">
                                <MenuSidebar />
                            </div>
                        </div>
                        <div className="ps-sidebar__footer">
                            {/* <FooterCopyright /> */}
                        </div>
                    </div>
                </div>
                <Drawer
        // title="WeOut"
        placement={advplacement}
        closable={false}
        onClose={onCloseadv}
        open={openadv}
        key={advplacement}
        extra={
          <Space>
            <button onClick={onCloseadv}>
              <MdOutlineCancel className="w-8 h-8" />
            </button>
          </Space>
        }
      >
        <section className="font-poppins space-y-9">
          <div className="flex justify-end ">
            <button onClick={onCloseadv}>
              <MdOutlineCancel className="w-8 h-8" />
            </button>
          </div>
          <div>
            <img src="/images/navbarlogo.png" alt="" className=" " />
          </div>
          <div className="space-y-6 font-[500] text-[19px]">
            <div>
              <Link href="/products">
                <div className="text-black">Product</div>
              </Link>
            </div>

            <div>
              <Link href="/orders">
                <div className="text-black">Orders</div>
              </Link>
            </div>

            <div>
              <Link href="/customes">
                <div className="text-black">Customers</div>
              </Link>
            </div>

            {!user &&  <div className="header__right">
                <Link className="header__site-link" href="/account/login">
                    <span>Login</span>
                </Link>
            </div>}

            {user &&  <div className="header__right">
                <button onClick={logOut} className="header__site-link" >
                    <span>Logout</span>
                </button>
            </div>}
          </div>

        
        </section>
      </Drawer>
                <div className="ps-main__wrapper">{children}</div>
            </main>

        </div>
    );
};

export default ContainerDefault;
