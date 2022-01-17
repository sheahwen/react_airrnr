import { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Slider,
} from "@mui/material";
import RestaurantCard from "./RestaurantCard";

const CustomerFilter = (props) => {
  // price bar
  const [priceRange, setPriceRange] = useState([5, 30]);

  // event listener
  const handleChange = (e, newPrice) => {
    setPriceRange(newPrice);
  };

  // queryResults
  const queryObj = props.queryObj;
  const [data, setData] = useState([]);

  const getData = async (url) => {
    const response = await fetch(url);
    console.log("function started");
    const parsedResponse = await response.json();
    setData(parsedResponse.data);
  };

  useEffect(() => {
    let queryStr = "";
    if (queryObj.name !== undefined) {
      queryStr = "?find=" + queryObj.name;
    } // to add in other fields
    const url = "https://airrnr-be.herokuapp.com/api/restaurant" + queryStr;
    getData(url);
  }, []);

  // print search results
  const printResults = data.map((restaurant, index) => {
    return (
      <RestaurantCard
        name={restaurant.name}
        type={restaurant["cuisine_type"]}
        openhrs={restaurant.openhrs}
        rating={restaurant.rating}
        id={index}
        img={restaurant.img}
      ></RestaurantCard>
    );
  });

  return (
    <Grid container>
      <Grid item md={3}>
        <h2>Filtered by</h2>
        <div className="filterCriteria" id="filterDate">
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
        <div className="filterCriteria" id="filterTime">
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
        <div className="filterCriteria" id="filterCuisine">
          <FormControl className="filterCuisineForm">
            <InputLabel id="demo-simple-select-label">Cuisine</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Age"
              // onChange={handleChange}
            >
              <MenuItem value={1}>Chinese</MenuItem>
              <MenuItem value={2}>Indian</MenuItem>
              <MenuItem value={3}>Western</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="filterCriteria" id="filterGuest">
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
        <div className="filterCriteria" id="filterPrice">
          <h4>Price</h4>
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={priceRange}
            onChange={handleChange}
            valueLabelDisplay="auto"
            // getAriaValueText={valuetext}
          />
        </div>
      </Grid>
      <Grid item md={9}>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <h2>Showing {data.length} Restaurants</h2>
          </Grid>
          {printResults}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CustomerFilter;
