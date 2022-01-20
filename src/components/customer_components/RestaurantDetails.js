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
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

const RestaurantDetails = (props) => {
  // retrieve data
  // const hi = "abc";
  const location = useLocation();
  const { queryProps = {} } = location.state || {};
  const queryId = queryProps.clickedId;

  const [data, setData] = useState({});
  const [query, setQuery] = useState(queryProps.query);
  const [mapUrl, setMapUrl] = useState("");
  const [quantity, setQuantity] = useState({});
  const [slot, setSlot] = useState([]);
  const [slotSelected, setSlotSelected] = useState();
  const [drawer, setDrawer] = useState([]);

  const getData = async (url) => {
    const response = await fetch(url);
    const parsedResponse = await response.json();
    setData(parsedResponse.data[0]);
    const quantityObj = {};
    for (const item of parsedResponse.data[0].menuItems) {
      quantityObj[item["_id"]] = 0;
    }
    setQuantity(quantityObj);
    const mapUrl =
      "https://open.mapquestapi.com/staticmap/v4/getmap?key=6NMIduw7Eygc0ebi3jlKvXK4QjH2kFxg&size=600,400&zoom=13&center=";
    const coordinate = `${parsedResponse.data[0].geolocation.lat},${parsedResponse.data[0].geolocation.lng}`;
    setMapUrl(mapUrl + coordinate);
  };
  const getSlot = async (url) => {
    const response = await fetch(url);
    const parsedResponse = await response.json();
    setSlot(parsedResponse.data);
  };

  useEffect(() => {
    // const url = "https://airrnr-be.herokuapp.com/api/restaurant/" + queryId;
    const url = "http://localhost:5000/api/restaurant/" + queryId;

    let dateStr = "";
    let paxStr = "";
    if (query.date) {
      const year = query.date.slice(0, 4);
      const month = query.date.slice(5, 7);
      const day = query.date.slice(8, 10);
      const date = "date=" + year + month + day;
      paxStr = "pax=" + query.pax;
      dateStr = "date=" + year + month + day;
    }
    const sloturl =
      "http://localhost:5000/api/restaurant/slots/" +
      queryId +
      "?" +
      dateStr +
      "&" +
      paxStr;
    getData(url);
    getSlot(sloturl);
    return () => {
      setData({});
      setMapUrl();
    };
  }, []);

  const handleIncrement = (params) => {
    const clickedId = params.id;
    const newQuantity = Number(quantity[clickedId]) + 1;
    setQuantity({ ...quantity, [clickedId]: newQuantity });
    // update table
    const position = rows.findIndex((row) => row.id === params.id);
    const newRows = [...rows];
    newRows[position].quantity++;
    setRows(newRows);
  };

  const handleDecrement = (params) => {
    const clickedId = params.id;
    let newQuantity = Number(quantity[clickedId]) - 1;
    if (newQuantity < 0) {
      newQuantity = 0;
    }
    setQuantity({ ...quantity, [clickedId]: newQuantity });
    // update table
    const position = rows.findIndex((row) => row.id === params.id);
    const newRows = [...rows];
    if (Number(quantity[clickedId] - 1) >= 0) {
      newRows[position].quantity--;
      setRows(newRows);
    }
  };

  // data grid
  const renderActionButtons = (params) => {
    return (
      <>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={(e) => {
            e.preventDefault();
            if ((e.target.innerText = "+")) {
              handleIncrement(params);
            }
          }}
        >
          +
        </Button>
        <Button
          variant="contained"
          color="error"
          size="small"
          style={{ marginLeft: 10 }}
          onClick={(e) => {
            e.preventDefault();
            if ((e.target.innerText = "-")) {
              handleDecrement(params);
            }
          }}
        >
          -
        </Button>
      </>
    );
  };

  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 120,
      sortable: false,
      renderCell: (params) => <img src={params.value} />,
    },
    { field: "item", headerName: "Item", width: 300 },
    { field: "price", headerName: "Price", width: 100 },
    { field: "quantity", headerName: "Order Quantity", width: 130 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      sortable: false,
      renderCell: renderActionButtons,
    },
  ];

  const [rows, setRows] = useState([]);

  const handleCategory = (e) => {
    const itemArr = [];
    for (const item of data.menuItems) {
      let i = 0;
      if (item.category === e.target.innerText) {
        i++;
        const itemId = item["_id"];
        itemArr.push({
          id: itemId,
          image: item.img,
          price: item.price,
          item: item.name,
          quantity: quantity[itemId],
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

  const handleTab = (event, newValue) => {
    setValue(newValue);
  };

  // print opening hours
  let startHrs, closeHrs;
  const convertHour = (str) => {
    if (Number(str.slice(0, 2)) < 12) {
      return `${str.slice(0, 2)}:${str.slice(3, 5)}am`;
    } else {
      return `${Number(str.slice(0, 2)) - 12}:${str.slice(3, 5)}pm`;
    }
  };
  if (data.openhrs) {
    startHrs = convertHour(data.openhrs[0].start);
    closeHrs = convertHour(data.openhrs[0].end);
  }

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
    // groupByCategory = {category1: [item1, item2], category2: [item3]}
    const groupedByCategory = groupBy(data["menuItems"], (c) => c.category);
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

  // ----------------------- FOR RIGHT PANEL
  const handleChange = (prop) => (event) => {
    let value = event.target.value;
    if (prop === "pax" && event.target.value < 0) {
      value = 0;
    }
    setQuery({ ...query, [prop]: value });
  };
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

  // for slot selection

  const handleSlot = (e) => {
    e.preventDefault();
    let timeStr = e.target.innerText;
    timeStr = timeStr.slice(0, 2) + ":" + timeStr.slice(2, 4);
    setSlotSelected(timeStr);
  };

  let slotArr = [];
  if (data["openhrs"]) {
    for (const number of slot) {
      const time = new Date(number);
      let hour = time.getHours();
      let minutes = time.getMinutes();
      if (hour < 10) hour = `0${hour}`;
      if (minutes < 10) minutes = `0${minutes}`;
      const str = `${hour}${minutes}`;
      slotArr.push(str);
    }
  }

  const printTimeSlots = slotArr.map((slot) => {
    return (
      <Button color="success" onClick={handleSlot}>
        {slot}
      </Button>
    );
  });

  const handleReset = (e) => {
    e.preventDefault();
    setQuery({});
    setSlotSelected(0);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    let pass = false;
    if (
      query.date &&
      query.date !== "" &&
      query.pax &&
      query.pax > 0 &&
      slotSelected === undefined
    ) {
      pass = true;
    }
    const year = query.date.slice(0, 4);
    const month = query.date.slice(5, 7);
    const day = query.date.slice(8, 10);
    const date = "date=" + year + month + day;
    const pax = "pax=" + query.pax;
    if (pass) {
      const sloturl =
        "http://localhost:5000/api/restaurant/slots/" +
        queryId +
        "?" +
        date +
        "&" +
        pax;
      getSlot(sloturl);
    }
  };

  const handleReserve = async (e) => {
    e.preventDefault();
    let pass = false;
    if (
      query.date &&
      query.date !== "" &&
      query.pax &&
      query.pax > 0 &&
      slotSelected !== 0
    ) {
      pass = true;
    }
    if (pass === true) {
      const year = query.date.slice(0, 4);
      const month = Number(query.date.slice(5, 7)) - 1;
      const day = Number(query.date.slice(8, 10));
      const hour = Number(slotSelected.slice(0, 2));
      const minute = Number(slotSelected.slice(3, 5));
      const time = new Date(year, month, day, hour, minute);
      const timeNum = time.getTime();
      const payload = { id: queryId, time: timeNum, pax: query.pax };
      const url = "http://localhost:5000/api/restaurant/makeReservation";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const responseParse = await response.json();
    }
  };

  return (
    <>
      <Grid container>
        <Grid item md={9}>
          <div className="restaurantPage">
            <Typography variant="h2">{data.name}</Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              className="restaurantInfo"
              id="neighborhood"
            >
              {data.neighborhood}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              className="restaurantInfo"
              id="cuisine"
            >
              {cuisineStr}
            </Typography>
            <div className="detailsRating">
              <Typography variant="h6" color="error.dark" component="legend">
                {data.rating}
              </Typography>
              <Rating
                name="read-only"
                sx={{ color: "error.main" }}
                value={Number(data.rating)}
                readOnly
                precision={0.5}
              />
              <Typography variant="h6" color="error.dark" id="numberOfReviews">
                23 Reviews
              </Typography>
            </div>
          </div>
          <img className="restaurantImgLeft" src={data.img}></img>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleTab}
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
            <br></br>
            <AccessTimeOutlinedIcon />
            <p className="restaurantInfo" id="hours">
              {startHrs} - {closeHrs}
            </p>
            <br></br>
            <img src={mapUrl}></img>
          </TabPanel>
          <TabPanel value={value} index={1}>
            {printCategory}
            <div className="menuSection" id="sectionOne"></div>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rowHeight={100}
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[10]}
              />
              <Button
                className="addtocart"
                variant="contained"
                color="info"
                href="#contained-buttons"
                onClick={(e) => {
                  e.preventDefault();
                  props.updateOrders(quantity, data.menuItems);
                }}
              >
                Add to cart
              </Button>
            </div>
          </TabPanel>
          <TabPanel value={value} index={2}>
            Reviews
          </TabPanel>
        </Grid>
        <Grid item md={3}>
          <Box className="bookingPanel">
            <h2>Booking details</h2>
            <div className="bookingField" id="bookingDate">
              <TextField
                id="outlined-basic"
                margin="dense"
                label="Date"
                variant="outlined"
                type="date"
                onChange={handleChange("date")}
                value={query.date || ""}
                size="small"
                inputProps={{
                  min: generateCurrentDate(),
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="bookingField" id="bookingGuests">
              <TextField
                id="outlined-basic"
                margin="dense"
                label="Guest(s)"
                variant="outlined"
                type="number"
                size="small"
                onChange={handleChange("pax")}
                value={query.pax > 0 ? query.pax : 0}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="bookingField" id="bookingTimeSelected">
              <TextField
                id="outlined-basic"
                margin="dense"
                label="Time slot selected"
                variant="outlined"
                type="time"
                size="small"
                value={slotSelected}
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <Button
              variant="contained"
              color="info"
              href="#contained-buttons"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              color="info"
              href="#contained-buttons"
              onClick={handleSearch}
            >
              Search
            </Button>
            <Typography
              variant="body1"
              color="text.primary"
              className="bookingField"
              id="bookingTime"
            >
              {printTimeSlots}
            </Typography>
            <Button
              variant="contained"
              href="#contained-buttons"
              onClick={handleReserve}
            >
              Reserve
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default RestaurantDetails;
