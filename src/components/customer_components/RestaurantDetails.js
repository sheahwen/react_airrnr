import { Grid, Typography, Rating, TextField } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const RestaurantDetails = () => {
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
        <Grid item md={10} className="detailsMenu">
          <h2>Menu</h2>
          <a className="menuCategory">Appetizer</a>
          <a className="menuCategory">Main</a>
          <a className="menuCategory">Beverage</a>
        </Grid>
        <Grid item md={2} className="bookingDetails">
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
          <div className="bookingField" id="bookingTime">
            <TextField
              id="outlined-basic"
              label="TIme"
              variant="outlined"
              type="time"
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
        </Grid>
      </Grid>
    </>
  );
};

export default RestaurantDetails;
