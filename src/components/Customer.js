import { useState } from "react";
import {
  Grid,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  Link,
} from "@mui/material";
import { Route, Switch } from "react-router-dom";
import CustomerHome from "./customer_components/CustomerHome";
import CustomerFilter from "./customer_components/CustomerFilter";
import RestaurantDetails from "./customer_components/RestaurantDetails";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CustomerOrders from "./customer_components/CustomerOrders";

const Customer = () => {
  // states
  // ---- drawer
  const [drawerState, setDrawerState] = useState(false);
  const toggleDrawer = () => {
    if (drawerState === true) {
      setDrawerState(false);
    } else setDrawerState(true);
  };

  // query
  const initialState = {
    keyword: null,
    date: null,
    time: null,
    pax: null,
  };
  const [queryAll, setQueryAll] = useState(initialState);

  const updateQueryAll = (obj) => {
    setQueryAll(obj);
  };

  return (
    <Grid container>
      <Grid item md={12}>
        <Grid container className="customerNavBar">
          <Grid item md={6}>
            <Link href="/customer/home" underline="none">
              AIRRNR LOGO
              {queryAll.keyword}
            </Link>
          </Grid>
          <Grid item md={6}>
            <div className="customerNavBarRight">
              <Link
                className="customerNavItem"
                href="/customer/filter"
                underline="none"
              >
                Explore
              </Link>
              <Link
                className="customerNavItem"
                href="/customer/guides"
                underline="none"
              >
                Guides
              </Link>
              <Link
                className="customerNavItem"
                href="/customer/reservations"
                underline="none"
              >
                My reservations
              </Link>
              <div className="customerNavItem" id="navItemCart">
                <ShoppingCartIcon
                  style={{ fill: "#1976d2" }}
                  onClick={toggleDrawer}
                />
              </div>
              <div>
                <Drawer
                  anchor="right"
                  open={drawerState}
                  onClose={toggleDrawer}
                >
                  <Box>
                    <List>
                      {["All mail", "Trash", "Spam"].map((text, index) => (
                        <ListItem button key={text}>
                          <ListItemText primary={text} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Drawer>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={12} className="customerBody">
        <Switch>
          <Route exact path="/customer/home">
            <CustomerHome updateQueryFunc={updateQueryAll}></CustomerHome>
          </Route>
          <Route exact path="/customer/filter">
            {console.log(queryAll)}
            <CustomerFilter queryObj={queryAll}></CustomerFilter>
          </Route>
          <Route exact path="/customer/restaurant-details">
            <RestaurantDetails></RestaurantDetails>
          </Route>
          <Route exact path="/customer/reservations">
            <CustomerOrders></CustomerOrders>
          </Route>
          <Route exact path="/customer/guides">
            <h2>Empty</h2>
          </Route>
        </Switch>
      </Grid>
    </Grid>
  );
};

export default Customer;
