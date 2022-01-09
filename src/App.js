import { Grid, Divider } from "@mui/material";
// import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Grid container>
        <Grid item md={2} className="navBar">
          <img src="https://www.logolynx.com/images/logolynx/5c/5c09eb06a72b3bdfe6a899e67b5e7b01.png"></img>
          <h3 className="navBaritem">Reservation</h3>
          <h3 className="navBaritem">Queue</h3>
          <h3 className="navBaritem">Restaurant profile</h3>
          <h3 className="navBaritem">Menu</h3>
          <h3 className="navBaritem">Seat Manager</h3>
          <h3 className="navBaritem">Business Insights</h3>
          <h3 className="navBaritem">Completed Orders</h3>
          <h3 className="navBaritem">Review</h3>
        </Grid>
        <Grid item md={10}>
          <Grid container>
            <Grid item md={12} className="header">
              <h1>Shop name</h1>
              <p>+65 1234 5678</p>
              <p>44 Anson Road, Singapore 688044</p>
              <p>Shop ratings: 4.5 starts</p>
            </Grid>
            <Divider />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
