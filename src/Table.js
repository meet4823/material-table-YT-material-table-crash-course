import React, { useState } from "react";
import "./App.css";
import MaterialTable from "material-table";
import GetAppIcon from "@material-ui/icons/GetApp";
import AddIcon from "@material-ui/icons/Add";

function Table({ setReceivedUrl }) {
  const alertMyRow = (selectedRow) => setReceivedUrl(selectedRow.url)
    // here i can request something on my api with selectedRow.id to get additional
    // datas which weren't displayed in the table
    // alert(JSON.stringify(selectedRow.url))
    

  const [tableData, setTableData] = useState([
    {
      name: "Raj",
      email: "Raj@gmail.com",
      phone: 7894561230,
      age: null,
      gender: "M",
      city: "Chennai",
      fee: 78456,
      url: "/files/sample_pdf.pdf",
    },
    {
      name: "Mohan",
      email: "mohan@gmail.com",
      phone: 7845621590,
      age: 35,
      gender: "M",
      city: "Delhi",
      fee: 456125,
      url: "/files/ef1710en.pdf",
    },
    {
      name: "Sweety",
      email: "sweety@gmail.com",
      phone: 741852912,
      age: 17,
      gender: "F",
      city: "Noida",
      fee: 458796,
      url: "/files/sample.pdf",
    },
    {
      name: "Vikas",
      email: "vikas@gmail.com",
      phone: 9876543210,
      age: 20,
      gender: "M",
      city: "Mumbai",
      fee: 874569,
      url: "/files/pdf-sample.pdf",
    },
    {
      name: "Neha",
      email: "neha@gmail.com",
      phone: 7845621301,
      age: 25,
      gender: "F",
      city: "Patna",
      fee: 748521,
      url: "/files/PDFTRON_about.pdf",
    },
    {
      name: "Mohan",
      email: "mohan@gmail.com",
      phone: 7845621590,
      age: 35,
      gender: "M",
      city: "Delhi",
      fee: 456125,
      url: "/files/sample_pdf.pdf",
    },
    {
      name: "Sweety",
      email: "sweety@gmail.com",
      phone: 741852912,
      age: 17,
      gender: "F",
      city: "Noida",
      fee: 458796,
      url: "/files/pdf-sample.pdf",
    },
     { name: "Vikas", email: "vikas@gmail.com", phone: 9876543210, age: 20, gender: "M", city: "Mumbai", fee: 874569 },
    { name: "Raj", email: "Raj@gmail.com", phone: 7894561230, age: null, gender: "M", city: "Chennai", fee: 78456 },
     { name: "Mohan", email: "mohan@gmail.com", phone: 7845621590, age: 35, gender: "M", city: "Delhi", fee: 456125 },
   { name: "Sweety", email: "sweety@gmail.com", phone: 741852912, age: 17, gender: "F", city: "Noida", fee: 458796 },
     { name: "Vikas", email: "vikas@gmail.com", phone: 9876543210, age: 20, gender: "M", city: "Mumbai", fee: 874569 },
  ]);



  function showNameCount(data) {
    let unique = data.map(item => item.name).filter((value, index, self) => self.indexOf(value) === index);

    let divs = [];
    unique.map(u => {
        divs.push(<div>{u}: {data.filter(d => d.name === u).length}</div>);
    });
    return divs;
}


  const columns = [
    {
      title: "Name",
      field: "name",
      sorting: true,
      filtering: true,
      filterPlaceholder: "filter",
      cellStyle: { background: "none" },
      headerStyle: { color: "#fff" },
    },
    { title: "Email", field: "email", filterPlaceholder: "filter" },
    {
      title: "Phone Number",
      field: "phone",
      align: "center",
      grouping: false,
      filterPlaceholder: "filter",
    },
    {
      title: "Age",
      field: "age",
      emptyValue: () => <em>null</em>,
      render: (rowData) => (
        <div
          style={{
            background: rowData.age >= 18 ? "#008000aa" : "#f90000aa",
            borderRadius: "4px",
            paddingLeft: 5,
          }}
        >
          {rowData.age >= 18 ? "18+" : "18-"}
        </div>
      ),
      searchable: false,
      export: false,
      filterPlaceholder: "filter",
    },
    { title: "Gender", field: "gender", lookup: { M: "Male", F: "Female" } },
    {
      title: "City",
      field: "city",
      align: "center",
      filterPlaceholder: "filter",
    },
    {
      title: "School Fee",
      field: "fee",
      type: "currency",
      align: "center",
      filterPlaceholder: "filter",
      currencySetting: { currencyCode: "INR", minimumFractionDigits: 1 },
      cellStyle: { background: "none" },
      headerStyle: { color: "#fff" },
    },
  ];

  return (
    <div className="App">

      <MaterialTable
        columns={columns}
        data={tableData}
        editable={{
          onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
              setTableData([...tableData, newRow]);

              setTimeout(() => resolve(), 500);
            }),
          onRowUpdate: (newRow, oldRow) =>
            new Promise((resolve, reject) => {
              const updatedData = [...tableData];
              updatedData[oldRow.tableData.id] = newRow;
              setTableData(updatedData);
              setTimeout(() => resolve(), 500);
            }),
          onRowDelete: (selectedRow) =>
            new Promise((resolve, reject) => {
              const updatedData = [...tableData];
              updatedData.splice(selectedRow.tableData.id, 1);
              setTableData(updatedData);
              setTimeout(() => resolve(), 1000);
            }),
        }}
        onRowClick={(event, selectedRow) => alertMyRow(selectedRow)}
        actions={[
          {
            icon: () => <GetAppIcon />,
            tooltip: "Click me",
            onClick: (e, data) => console.log(data),
            // isFreeAction:true
          },
        ]}
        onSelectionChange={(selectedRows) => console.log(selectedRows)}
        options={{
          sorting: true,
          search: true,
          searchFieldAlignment: "right",
          searchAutoFocus: true,
          searchFieldVariant: "standard",
          filtering: true,
          paging: true,
          pageSizeOptions: [2, 5, 10, 20, 25, 50, 100],
          pageSize: 5,
          paginationType: "stepped",
          showFirstLastPageButtons: false,
          exportButton: true,
          exportAllData: true,
          exportFileName: "TableData",
          addRowPosition: "first",
          actionsColumnIndex: -1,
          selection: true,
          showSelectAllCheckbox: false,
          showTextRowsSelected: true,
          selectionProps: (rowData) => ({
            disabled: rowData.age == null,
            // color:"primary"
          }),
          grouping: false,
          columnsButton: true,
          
          rowStyle: (data, index) =>
            index % 2 === 0 ? { background: "#f5f5f5" } : null,
          headerStyle: {
            background:
           "#555",
           fontSize:"14px",
            color: "#fff",
          },
        }}
        title="Student Information"
        icons={{ Add: () => <AddIcon /> }}
        
      />


      
    </div>
  );
}

export default Table;
