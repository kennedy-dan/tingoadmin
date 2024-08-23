import React, {useState} from 'react';
import DropdownAction from '~/components/elements/basic/DropdownAction';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";

import { InputText } from 'primereact/inputtext';
import { tableSearchFunction, tableSearchUI } from './TableSearchFunction';
const TableCustomerItems = ({data}) => {

    const customData = data
    const [rows, setRows] = useState(10);
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [filters, setFilters] = useState({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
  
    let searchBar = tableSearchUI(globalFilterValue, (e) =>
      tableSearchFunction(e, filters, setFilters, setGlobalFilterValue)
    );
      let columns = [
          {
            field: "id",
            header: "id",
            isSort: true,
            body: (rowData, options) => {
              return options.rowIndex + 1;
            },
          },
      
          {
            field: "name",
            header: "name",
            isSort: true,
            body: (rowData) => {
              return <p>{rowData.first_name}</p>;
            },
          },
      
          {
            field: "email",
            header: "Email",
            body: (rowData, index) => {
              return <p>{rowData?.email}</p>;
            },
          },
  
        //   {
        //       field: "price",
        //       header: "Price",
        //       body: (rowData, index) => {
        //         return <p>{rowData?.unit_price}</p>;
        //       },
        //     }
        ];
    const customers = [
        {
            name: 'Jenny Simmonds',
            phone: '(+921) 211-32-1145',
            balance: '$211.00',
            orders: '10',
            status: 'true',
        },
        {
            name: 'Ammara Molloy',
            phone: '(+921) 916-971-217',
            balance: '$211.00',
            orders: '10',
            status: 'true',
        },
        {
            name: 'Anisa Forster',
            phone: '(+921) 319-176-113',
            balance: '$211.00',
            orders: '10',
            status: 'true',
        },
        {
            name: 'Hashir Wilson',
            phone: '(+921) 393-112-298',
            balance: '$211.00',
            orders: '10',
            status: 'false',
        },
        {
            name: 'Grover Sampson',
            phone: '(+921) 393-872-137',
            balance: '$211.00',
            orders: '10',
            status: 'true',
        },
        {
            name: 'Nelson Mckeown',
            phone: '(+921) 393-872-998',
            balance: '$211.00',
            orders: '10',
            status: 'false',
        },
        {
            name: 'Zunaira Akhtar',
            phone: '(+921) 393-872-145',
            balance: '$211.00',
            orders: '10',
            status: 'true',
        },
        {
            name: 'Natan Kramer',
            phone: '(+921) 293-872-145',
            balance: '$211.00',
            orders: '10',
            status: 'false',
        },
        {
            name: 'Jesse Pollard',
            phone: '(+921) 291-32-145',
            balance: '$211.00',
            orders: '10',
            status: 'true',
        },
    ];
    const tableItemsView = customers.map((item, index) => {
        let badgeView;

        if (item.status) {
            badgeView = <span className="ps-badge success">active</span>;
        } else {
            badgeView = <span className="ps-badge gray">deactive</span>;
        }

        return (
            <tr key={index}>
                <td>{index}</td>
                <td>
                    <strong>{item.name}</strong>
                </td>
                <td>{item.phone}</td>
                <td>{item.balance}</td>
                <td>{item.orders}</td>
                <td>{badgeView}</td>
                <td>
                    <DropdownAction />
                </td>
            </tr>
        );
    });
    return (
        <div className="table-responsive">
            <div className="table-responsive">
           
           <DataTable
            value={customData}
            // loading={reservationHistory?.isLoading}
            // paginatorF
            paginator
            rows={rows}
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: "30rem" }}
            style={{ position: "inherit", fontSize:'16px' }}
            // header={searchBar}
            globalFilterFields={[
                "name",
                "price",
                // "reserved_start_time",
                // "comment",
              ]}
          >
            {columns.map((col, i) => {
              return (
                <Column
                  key={i}
                  field={col?.field}
                  header={col?.header}
                  body={col?.body}
                //   headerStyle={{ backgroundColor: '#f0f0f0' }}
                />
              );
            })}
          </DataTable>
          
        </div>
        </div>
    );
};

export default TableCustomerItems;
