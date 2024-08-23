'use client';
import React, {useEffect} from 'react';
import ContainerDefault from '~/components/layouts/ContainerDefault';
import Pagination from '~/components/elements/basic/Pagination';
import TableCustomerItems from '~/components/shared/tables/TableCustomerItems';
import FormSearchSimple from '~/components/shared/forms/FormSearchSimple';
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminCustomers, AddCoupons } from '~/redux/features/productSlice';
const CustomersPage = () => {
    const dispatch = useDispatch()
    const { allcust } = useSelector((state) => state.product);
    const data = allcust?.results?.data?.data?.data;

    useEffect(() => {
        dispatch(getAdminCustomers());
    }, []);
    return (
        <ContainerDefault title="Customers">
            <HeaderDashboard
                title="Customers"
                description="Tingo Customer Listing"
            />
            <section className="ps-items-listing">
                {/* <div className="ps-section__header simple">
                    <div className="ps-section__filter">
                        <FormSearchSimple />
                    </div>
                    <div className="ps-section__actions">
                        <a className="ps-btn success" href="#">
                            <i className="icon icon-plus mr-2"></i>Add Customer
                        </a>
                    </div>
                </div> */}
                <div className="ps-section__content">
                    <TableCustomerItems data={data} />
                </div>
                <div className="ps-section__footer">
                    <p>Show 10 in 30 items.</p>
                    <Pagination />
                </div>
            </section>
        </ContainerDefault>
    );
};
export default CustomersPage
