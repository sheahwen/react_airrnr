import { useState, useEffect } from "react";
import { TextField, Button, Link } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const CustomerHome = (props) => {
  // query
  const initialState = {
    keyword: null,
    date: null,
    time: null,
    pax: null,
  };
  const [queryAll, setQueryAll] = useState(initialState);

  const handleChange = (prop) => (event) => {
    setQueryAll({ ...queryAll, [prop]: event.target.value });
  };

  const handleSearch = (event) => {
    // event.preventDefault();
    console.log("searched");
    console.log(queryAll);
    props.updateQueryFunc(queryAll);
  };

  const handleSuibian = () => {
    setQueryAll(initialState);
    props.updateQueryFunc(initialState);
  };

  // useEffect(() => {
  //   return () => {
  //     setQueryAll(initialState);
  //   };
  // }, []);

  return (
    <>
      <div className="searchSection">
        <div className="homeSearchBar">
          <div className="searchBarItem" id="searchName">
            <TextField
              value={queryAll.keyword}
              onChange={handleChange("keyword")}
              id="outlined-basic"
              label="Name"
              variant="outlined"
              size="small"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="searchBarItem" id="searchDate">
            <TextField
              value={queryAll.date}
              onChange={handleChange("date")}
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
          <div className="searchBarItem" id="searchTime">
            <TextField
              value={queryAll.time}
              onChange={handleChange("time")}
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
          <div className="searchBarItem" id="searchGuest">
            <TextField
              value={queryAll.pax}
              onChange={handleChange("pax")}
              id="outlined-basic"
              label="Guest(s)"
              variant="outlined"
              type="number"
              size="small"
              style={{ width: 100 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <Button
            className="searchBarItem"
            onClick={handleSearch}
            href="/customer/filter"
          >
            <SearchOutlinedIcon />
          </Button>
        </div>
      </div>
      <div className="imageSection">
        <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"></img>
        <div className="imageText">
          <h1>What do you want to eat?</h1>
          <Button
            onClick={handleSuibian}
            variant="contained"
            size="large"
            sx={{ color: "#894AF8", backgroundColor: "white" }}
            href="/customer/filter"
          >
            Suibian
          </Button>
        </div>
      </div>
    </>
  );
};

export default CustomerHome;
