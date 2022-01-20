import { Route, Switch } from "react-router-dom";
import Restaurant from "./components/Restaurant";
import Customer from "./components/Customer";
import RestaurantSignup from "./pages/RestaurantSignup";
import UserSigup from "./pages/UserSigup";
import ProfileSetting from "./pages/ProfileSetting";
import Profile from "./pages/Profile";
import PrivateRoutes from "./pages/PrivateRoutes";
import Main from "./pages/Main";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#894AF8",
    },
    secondary: {
      main: "#EAB9FC",
    },
    warning: {
      main: "#6C60FF",
    },
    error: { main: "#FB9875" },
    info: { main: "#C9ECFF" },
    success: { main: "#808080" },
  },
});


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
          <ThemeProvider theme={theme}>
            <Customer></Customer>
          </ThemeProvider>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
