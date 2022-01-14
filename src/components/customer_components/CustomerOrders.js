import { DataGrid } from "@mui/x-data-grid";

const CustomerOrders = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Restaurant Name", width: 200 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "time", headerName: "Time", width: 70 },
    { field: "bill", headerName: "Total bill", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
  ];

  const rows = [
    {
      id: 1,
      name: "Shake Shack",
      date: "1 Jan 2022",
      time: "1245",
      bill: "$123.45",
      status: "completed",
    },
    {
      id: 2,
      name: "Shake Shack",
      date: "1 Jan 2022",
      time: "1245",
      bill: "$123.45",
      status: "completed",
    },
  ];

  return (
    <div>
      <h1>All reservations</h1>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[3]}
        />
      </div>
    </div>
  );
};

export default CustomerOrders;
