import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Grid,
  Typography,
  Rating,
  TextField,
  Button,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const RestaurantDetails = () => {
  // retrieve data
  const location = useLocation();
  const { queryProps = {} } = location.state;
  const queryId = queryProps;

  const [data, setData] = useState({});
  const [map, setMap] = useState();

  const getData = async (url) => {
    const response = await fetch(url);
    const parsedResponse = await response.json();
    setData(parsedResponse.data[0]);
  };

  const getMap = async (url) => {
    const response = await fetch(url);
    setMap(response);
  };

  useEffect(() => {
    const url = "https://airrnr-be.herokuapp.com/api/restaurant/" + queryId;
    getData(url);
    const mapUrl =
      "https://open.mapquestapi.com/staticmap/v4/getmap?key=6NMIduw7Eygc0ebi3jlKvXK4QjH2kFxg&size=600,400&zoom=13&center=47.6062,-122.3321";
    getMap(mapUrl);
    return () => {
      setData({});
      setMap();
    };
  }, []);

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
  const renderImage = () => {
    return (
      <>
        <img src=""></img>
      </>
    );
  };

  const columns = [
    // { field: "id", headerName: "ID", width: 70 },
    {
      field: "image",
      headerName: "Image",
      width: 200,
      renderCell: renderImage,
    },
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

  // const rows = [
  //   { id: 1, price: "Snow", item: "Jon", quantity: 0 },
  //   { id: 2, price: "Lannister", item: "Cersei", quantity: 0 },
  //   { id: 3, price: "Lannister", item: "Jaime", quantity: 0 },
  //   { id: 4, price: "Stark", item: "Arya", quantity: 0 },
  //   { id: 5, price: "Targaryen", item: "Daenerys", quantity: 0 },
  //   { id: 6, price: "Melisandre", item: null, quantity: 0 },
  //   { id: 7, price: "Clifford", item: "Ferrara", quantity: 0 },
  //   { id: 8, price: "Frances", item: "Rossini", quantity: 0 },
  //   { id: 9, price: "Roxie", item: "Harvey", quantity: 0 },
  // ];

  const [rows, setRows] = useState([]);
  const [rowsDisplay, setRowsDisplay] = useState([]);

  const handleCategory = (e) => {
    setRowsDisplay([]);
    const itemArr = [];
    for (const item of data.menuItems) {
      let i = 0;
      if (item.category === e.target.innerText) {
        i++;
        itemArr.push({
          id: item["_id"],
          price: item.price,
          item: item.name,
          quantity: 0,
        });
      }
    }
    setRows([...itemArr]);
  };

  // For tabs
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // print opening hours
  // const convertHour = (str) => {
  //   if (Number(str.slice(0, 2)) < 12) {
  //     return `${str.slice(0, 2)}:${str.slice(3, 5)}am`;
  //   } else {
  //     return `${Number(str.slice(0, 2)) - 12}:${str.slice(3, 5)}pm`;
  //   }
  // };
  // const startHrs = convertHour(data.openhrs[0].start);
  // const closeHrs = convertHour(data.openhrs[0].end);

  let cuisineStr = "";
  if (data["cuisine_type"]) {
    for (const cuisine of data["cuisine_type"]) {
      cuisineStr += cuisine + ", ";
    }
    cuisineStr = cuisineStr.slice(0, -2);
  }

  // re-group menu array by category
  let menuCategoryArr = [];
  if (data["menuItems"]) {
    function groupBy(xs, f) {
      return xs.reduce(
        (r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r),
        {}
      );
    }
    const groupedByCategory = groupBy(data["menuItems"], (c) => c.category);
    // groupByCategory = {category1: [item1, item2], category2: [item3]}
    menuCategoryArr = Object.keys(groupedByCategory);
  }

  // print list of category above data grid
  const printCategory = menuCategoryArr.map((category) => {
    return (
      <h4 className="menuCategory" onClick={handleCategory}>
        {category}
      </h4>
    );
  });

  return (
    <>
      <Grid container>
        <Grid item md={9}>
          <div className="restaurantPage">
            <Typography variant="h4">{data.name}</Typography>
            <p className="restaurantInfo" id="neighborhood">
              {data.neighborhood}
            </p>
            <p className="restaurantInfo" id="cuisine">
              {cuisineStr}
            </p>
            <div className="detailsRating">
              <Typography component="legend">{data.rating}</Typography>
              <Rating name="read-only" value={3} readOnly />
              <div id="numberOfReviews">23 Reviews</div>
            </div>
            {/* <div className="restaurantInfo">{startHrs}</div> */}
          </div>
          <img className="restaurantImgLeft" src={data.img}></img>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="About" {...a11yProps(0)} />
              <Tab label="Menu" {...a11yProps(1)} />
              <Tab label="Reviews" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <PhoneIphoneIcon></PhoneIphoneIcon>
            <p className="restaurantInfo" id="phone">
              +65 {data.phoneno}
            </p>
            <br></br>
            <LocationOnIcon></LocationOnIcon>
            <a
              href={`http://maps.google.com/?q=${data.address}`}
              target="_blank"
              className="restaurantInfo"
              id="address"
            >
              {data.address}
            </a>

            {/* TO RENDER OPEN STATIC MAP FROM {MAP} */}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {printCategory}
            <div className="menuSection" id="sectionOne"></div>
            <h3>Appetizer</h3>
            <div style={{ height: 400, width: "100%" }}>
              {console.log(rows)}
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[10]}
              />
            </div>
          </TabPanel>
          <TabPanel value={value} index={2}>
            Reviews
          </TabPanel>
        </Grid>
        <Grid item md={3}>
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
