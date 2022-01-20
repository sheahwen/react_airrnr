import { useState } from "react";
import {
  Grid,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  Link,
  Typography,
} from "@mui/material";
import { Route, Switch } from "react-router-dom";
import CustomerHome from "./customer_components/CustomerHome";
import CustomerFilter from "./customer_components/CustomerFilter";
import RestaurantDetails from "./customer_components/RestaurantDetails";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CustomerOrders from "./customer_components/CustomerOrders";
import Logo from "./Shared/Logo";
import theme from "../theme/theme";

const Customer = () => {
  // states
  // ---- drawer
  const [drawerState, setDrawerState] = useState(false);
  const toggleDrawer = () => {
    if (drawerState === true) {
      setDrawerState(false);
    } else setDrawerState(true);
  };

  const [orders, setOrders] = useState([]);
  const updateOrders = (obj, menuArr) => {
    const allOrders = [];
    for (const id in obj) {
      if (obj[id] !== 0) {
        const dish = menuArr.find((item) => item["_id"] === id);
        const itemArr = [dish.name, obj[id]];
        allOrders.push(itemArr);
      }
    }
    setOrders(allOrders);
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

  const navBarStyle = {
    height: "120px",
    backgroundColor: theme.color.layering,
  };

  return (
    <Grid container>
      <Grid item md={12}>
        <Grid container className="customerNavBar" sx={navBarStyle}>
          <Grid item md={6}>
            <Logo height="100px" width="100px" direct="/customer/home" />
            {/* <Link href="/customer/home" underline="none">
              AIRRNR LOGO
              {queryAll.keyword}
            </Link> */}
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
                  style={{ fill: "#894AF8" }}
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
                      <Typography variant="h5">Your orders</Typography>
                      {orders.map((text) => (
                        <ListItem button key={text[0]}>
                          <ListItemText primary={text[0]} />
                          <ListItemText primary={text[1]} />
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
      <Grid item md={12} mt={10} className="space"></Grid>
      <Grid item md={12} className="customerBody">
        <Switch>
          <Route exact path="/customer/reservation">
            <RestaurantDetails updateOrders={updateOrders}></RestaurantDetails>
          </Route>
          <Route exact path="/customer/home">
            <CustomerHome updateQueryFunc={updateQueryAll}></CustomerHome>
          </Route>
          <Route exact path="/customer/filter">
            <CustomerFilter queryObj={queryAll}></CustomerFilter>
          </Route>
          <Route exact path="/customer/all-reservations">
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
