import { Route, Switch } from "react-router-dom";
import Restaurant from "./components/Restaurant";
import Customer from "./components/Customer";
import Main from "./pages/Main";
import RestaurantSignup from "./pages/RestaurantSignup";
import UserSigup from "./pages/UserSigup";
import ProfileSetting from "./pages/ProfileSetting";
import Profile from "./pages/Profile";
import PrivateRoutes from "./pages/PrivateRoutes";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/user/new" component={UserSigup} />
        <PrivateRoutes path="/user/profile/edit" component={ProfileSetting} />
        <PrivateRoutes path="/user/profile" component={Profile} />
        <Route path="/restaurant/new" component={RestaurantSignup} />
        <Route path="/restaurant">
          <Restaurant></Restaurant>
        </Route>
        <Route path="/customer">
          <Customer></Customer>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
