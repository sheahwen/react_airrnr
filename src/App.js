import { Route, Switch } from "react-router-dom";
import Restaurant from "./components/Restaurant";
import Customer from "./components/Customer";

const App = () => {
  return (
    <div className="App">
      <div> abc</div>
      <Switch>
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
