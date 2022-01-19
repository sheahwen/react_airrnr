import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Grid,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Slider,
  Box,
} from "@mui/material";
import RestaurantCard from "./RestaurantCard";

const CustomerFilter = (props) => {
  const location = useLocation();
  const { queryProps = {} } = location.state || {};

  // price bar
  const [priceRange, setPriceRange] = useState([5, 30]);

  // event listener
  const handlePriceChange = (e, newPrice) => {
    setPriceRange(newPrice);
  };

  // queryResults
  let initialState = {};
  if (queryProps.queryAll) {
    initialState = queryProps.queryAll;
  }
  const [queryObj, setQueryObj] = useState(initialState);
  const [data, setData] = useState([]);

  const getData = async (url) => {
    const response = await fetch(url);
    const parsedResponse = await response.json();
    setData(parsedResponse.data);
  };

  useEffect(() => {
    let queryStr = "";
    if (queryObj.keyword) {
      queryStr = "?find=" + queryObj.keyword;
    } // to add in other fields
    const url = "https://airrnr-be.herokuapp.com/api/restaurant" + queryStr;
    // const url = "http://localhost:5000/api/restaurant" + queryStr;
    getData(url);
  }, []);

  // specify min date for date picker
  const generateCurrentDate = () => {
    const current = new Date();
    let month = String(current.getMonth() + 1);
    if (month.length < 2) {
      month = "0" + month;
    }
    const dateStr = `${current.getFullYear()}-${month}-${current.getDate()}`;
    return dateStr;
  };

  // print search results
  const printResults = data.map((restaurant) => {
    return (
      <RestaurantCard
        name={restaurant.name}
        type={restaurant["cuisine_type"]}
        openhrs={restaurant.openhrs}
        rating={restaurant.rating}
        id={restaurant["_id"]}
        img={restaurant.img}
        query={queryObj}
      ></RestaurantCard>
    );
  });

  // handle users inputs and action
  const handleChange = (prop) => (event) => {
    setQueryObj({ ...queryObj, [prop]: event.target.value });
  };

  return (
    <Grid container>
      <Grid item md={3}>
        <Box className="filterPanel">
          <h2>Filtered by</h2>
          <div className="filterCriteria" id="filterKeyword">
            <TextField
              value={queryObj.keyword}
              onChange={handleChange("keyword")}
              id="outlined-basic"
              label="Name / Cuisine"
              variant="outlined"
              size="small"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="filterCriteria" id="filterDate">
            <TextField
              value={queryObj.date}
              onChange={handleChange("date")}
              id="outlined-basic"
              label="Date"
              variant="outlined"
              type="date"
              size="small"
              inputProps={{
                min: generateCurrentDate(),
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="filterCriteria" id="filterTime">
            <TextField
              value={queryObj.time}
              onChange={handleChange("time")}
              id="outlined-basic"
              label="TIme"
              variant="outlined"
              type="time"
              size="small"
              minutesStep="15"
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
              value={queryObj.pax}
              onChange={handleChange("pax")}
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
          {/*  not completed, to continue when data is avaiable */}
          <div className="filterCriteria" id="filterPrice">
            <h4>Price</h4>
            <Slider
              getAriaLabel={() => "Temperature range"}
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              // getAriaValueText={valuetext}
            />
          </div>
        </Box>
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
