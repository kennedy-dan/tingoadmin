'use client';
import React from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import TableOrdersItems from '~/components/shared/tables/TableOrdersItems';
import Pagination from '~/components/elements/basic/Pagination';
import { Select } from 'antd';
import Link from 'next/link';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';
import { orderHistory } from '~/redux/features/productSlice';
import { useDispatch, useSelector } from 'react-redux';

const { Option } = Select;
const OrdersPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(orderHistory());
    }, [dispatch]);
        
    return (
        <ContainerDefault>
            <HeaderDashboard
                title="Orders"
                description="Tingo Orders Listing"
            />
            <section className="ps-items-listing">
                {/* <div className="ps-section__header simple">
                    <div className="ps-section__filter">
                        <form
                            className="ps-form--filter"
                            action="index.html"
                            method="get">
                            <div className="ps-form__left">
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Search..."
                                    />
                                </div>
                                <div className="form-group">
                                    <Select
                                        placeholder="Status"
                                        className="ps-ant-dropdown"
                                        listItemHeight={20}>
                                        <Option value="active">Active</Option>
                                        <Option value="in-active">
                                            InActive
                                        </Option>
                                    </Select>
                                </div>
                            </div>
                            <div className="ps-form__right">
                                <button className="ps-btn ps-btn--gray">
                                    <i className="icon icon-funnel mr-2"></i>
                                    Filter
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="ps-section__actions">
                        <Link href="/products/create-product" className="ps-btn success">

                            <i className="icon icon-plus mr-2"></i>New Order
                        </Link>
                        <a
                            className="ps-btn ps-btn--gray"
                            href="new-order.html">
                            <i className="icon icon-download2 mr-2"></i>Export
                        </a>
                    </div>
                </div> */}
                <div className="ps-section__content">
                    <TableOrdersItems />
                </div>
               
            </section>
        </ContainerDefault>
    );
};
export default OrdersPage
