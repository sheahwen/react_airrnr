import { TextField, Button } from "@mui/material";

const CustomerHome = () => {
  return (
    <>
      <div className="searchSection">
        <div className="homeSearchBar">
          <div className="searchBarItem" id="searchName">
            <TextField
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
          <div className="searchBarItem" id="searchButton">
            +
          </div>
        </div>
      </div>
      <div className="imageSection">
        <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"></img>
        <div className="imageText">
          <h1>What do you want to eat?</h1>
          <Button
            variant="contained"
            size="large"
            sx={{ color: "#894AF8", backgroundColor: "white" }}
          >
            Suibian
          </Button>
        </div>
      </div>
    </>
  );
};

export default CustomerHome;
