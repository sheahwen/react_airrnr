import { useState } from "react";
import { Grid, Typography, Rating, TextField, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const RestaurantDetails = () => {
  // data grid
  const renderActionButtons = () => {
    return (
      <>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={() => {
            console.log("clicked");
          }}
        >
          +
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 10 }}
          onClick={() => {
            console.log("clicked");
          }}
        >
          -
        </Button>
      </>
    );
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "item", headerName: "Item", width: 130 },
    { field: "price", headerName: "Price", width: 130 },
    { field: "quantity", headerName: "Order Quantity", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: renderActionButtons,
    },
  ];

  const rows = [
    { id: 1, price: "Snow", item: "Jon", quantity: 0 },
    { id: 2, price: "Lannister", item: "Cersei", quantity: 0 },
    { id: 3, price: "Lannister", item: "Jaime", quantity: 0 },
    { id: 4, price: "Stark", item: "Arya", quantity: 0 },
    { id: 5, price: "Targaryen", item: "Daenerys", quantity: 0 },
    { id: 6, price: "Melisandre", item: null, quantity: 0 },
    { id: 7, price: "Clifford", item: "Ferrara", quantity: 0 },
    { id: 8, price: "Frances", item: "Rossini", quantity: 0 },
    { id: 9, price: "Roxie", item: "Harvey", quantity: 0 },
  ];

  return (
    <>
      <div className="restaurantInfo">
        <h1>Shake shack</h1>
        <PhoneIphoneIcon></PhoneIphoneIcon>
        <p className="restaurantInfo" id="phone">
          +65 1234 5678
        </p>
        <LocationOnIcon></LocationOnIcon>
        <a
          href="http://maps.google.com/?q=49 Anson Road, Singapore"
          target="_blank"
          className="restaurantInfo"
          id="address"
        >
          123 ABC Street, Singapore 123123
        </a>
        <div className="detailsRating">
          <Typography component="legend">3</Typography>
          <Rating name="read-only" value={3} readOnly />
          <div id="numberOfReviews">23 Reviews</div>
          <RestaurantIcon />
          <p>Fast food, burger</p>
        </div>
      </div>
      <Grid container>
        <Grid item md={9} className="detailsMenu">
          <h2>Menu</h2>
          <h4 className="menuCategory">Appetizer</h4>
          <h4 className="menuCategory">Main</h4>
          <h4 className="menuCategory">Beverage</h4>
          <div className="menuSection" id="sectionOne"></div>
          <h3>Appetizer</h3>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[3]}
            />
          </div>
        </Grid>
        <Grid item md={3} className="bookingDetails">
          <h2>Booking details</h2>
          <div className="bookingField" id="bookingDate">
            <TextField
              id="outlined-basic"
              label="Date"
              variant="outlined"
              type="date"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="bookingField" id="bookingGuests">
            <TextField
              id="outlined-basic"
              label="Guest(s)"
              variant="outlined"
              type="number"
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="bookingField" id="bookingTime">
            <Button variant="outlined">0900</Button>
            <Button variant="outlined">0930</Button>
            <Button variant="outlined">1000</Button>
            <Button variant="outlined">1030</Button>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default RestaurantDetails;
