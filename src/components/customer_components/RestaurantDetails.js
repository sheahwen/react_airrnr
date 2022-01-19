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

const RestaurantDetails = () => {
  // retrieve data
  const location = useLocation();
  const { queryProps = {} } = location.state || {};
  const queryId = queryProps.clickedId;

  const [data, setData] = useState({});
  const [query, setQuery] = useState(queryProps.query);
  const [mapUrl, setMapUrl] = useState("");
  const [quantity, setQuantity] = useState({});

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
    const coordinate = `${data.geolocation.lat},${data.geolocation.lng}`;
    setMapUrl(mapUrl + coordinate);
  };

  useEffect(() => {
    const url = "https://airrnr-be.herokuapp.com/api/restaurant/" + queryId;
    // const url = "http://localhost:5000/api/restaurant/" + queryId;
    console.log(url);
    getData(url);
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
          color="primary"
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
          color="primary"
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
    // { field: "id", headerName: "ID", width: 70 },
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
  let quantityObj = {}; // {123:1, 456:7}
  if (data["menuItems"]) {
    function groupBy(xs, f) {
      return xs.reduce(
        (r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r),
        {}
      );
    }
    // groupByCategory = {category1: [item1, item2], category2: [item3]}
    const groupedByCategory = groupBy(data["menuItems"], (c) => c.category);
    for (const category in groupedByCategory) {
      for (const item of groupedByCategory[category]) {
        quantityObj[item["_id"]] = 0;
      }
    }
    console.log("rendered once");
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
    setQuery({ ...query, [prop]: event.target.value });
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
  const [slot, setSlot] = useState();

  const handleSlot = (e) => {
    e.preventDefault();
    let timeStr = e.target.innerText;
    timeStr = timeStr.slice(0, 2) + ":" + timeStr.slice(2, 4);
    setSlot(timeStr);
  };

  let slotArr = [];
  if (data["openhrs"]) {
    let startTime = data.openhrs[0].start;
    let endTime = data.openhrs[0].end;
    startTime = startTime.slice(0, 2) + startTime.slice(3, 5);
    endTime = endTime.slice(0, 2) + endTime.slice(3, 5);
    for (
      let i = Number(startTime.slice(0, 2));
      i <= Number(endTime.slice(0, 2));
      i++
    ) {
      let startMin = Math.ceil(Number(startTime.slice(2, 4)) / 15) * 15;
      let endMin = Math.floor(Number(endTime.slice(2, 4)) / 15) * 15;
      let iStr = String(i);
      if (i < 10) iStr = `0${i}`;
      for (let j = 0; j <= 45; j += 15) {
        let jStr = String(j);
        if (j < 10) jStr = "00";
        if (
          (i === Number(startTime.slice(0, 2)) && j < startMin) ||
          (i === Number(endTime.slice(0, 2)) && j > endMin)
        ) {
          console.log("skipped");
        } else slotArr.push(`${iStr}${jStr}`);
      }
    }
  }

  const printTimeSlots = slotArr.map((slot) => {
    return <Button onClick={handleSlot}>{slot}</Button>;
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

            {/* TO RENDER OPEN STATIC MAP FROM {MAP} */}
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
                label="Date"
                variant="outlined"
                type="date"
                onChange={handleChange("time")}
                value={query.date}
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
                label="Guest(s)"
                variant="outlined"
                type="number"
                size="small"
                onChange={handleChange("pax")}
                value={query.pax}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="bookingField" id="bookingTimeSelected">
              <TextField
                id="outlined-basic"
                label="Time slot selected"
                variant="outlined"
                type="time"
                size="small"
                value={slot}
                InputProps={{
                  readOnly: true,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="bookingField" id="bookingTime">
              {printTimeSlots}
            </div>
            <Button variant="contained" href="#contained-buttons">
              Reserve
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default RestaurantDetails;
