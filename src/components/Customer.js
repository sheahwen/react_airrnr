import { Grid } from "@mui/material";
import { Route, Switch } from "react-router-dom";
import CustomerHome from "./customer_components/CustomerHome";
import CustomerFilter from "./customer_components/CustomerFilter";
import RestaurantDetails from "./customer_components/RestaurantDetails";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Customer = () => {
  return (
    <Grid container>
      <Grid item md={12}>
        <Grid container className="customerNavBar">
          <Grid item md={6}>
            Airrnr Logo
          </Grid>
          <Grid item md={6}>
            <div className="customerNavBarRight">
              <div className="customerNavItem">Search</div>
              <div className="customerNavItem">Explore</div>
              <div className="customerNavItem">Guide</div>
              <div className="customerNavItem">Promotion</div>
              <div className="customerNavItem">My orders</div>
              <div className="customerNavItem">
                <ShoppingCartIcon />
              </div>
              <div className="customerNavItem">Help</div>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={12} className="customerBody">
        <Switch>
          <Route exact path="/customer/home">
            <CustomerHome></CustomerHome>
          </Route>
          <Route exact path="/customer/filter">
            <CustomerFilter></CustomerFilter>
          </Route>
          <Route exact path="/customer/restaurant-details">
            <RestaurantDetails></RestaurantDetails>
          </Route>
          {/* <Route exact path="/customer/orders">
            <CustomerOrders></CustomerOrders>
          </Route> */}
        </Switch>
      </Grid>
    </Grid>
  );
};

export default Customer;
