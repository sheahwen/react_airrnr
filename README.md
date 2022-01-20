### Documentation

##### API

| Endpoint                       | Method | Description                                                                                                                                                                                         | Payload           |
| ------------------------------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| /api/restaurant/seed           | GET    | upload mock restaurant data to db                                                                                                                                                                   | restaurantSeed.js |
| /api/restaurant                | GET    | get list of restaurants limit <br> default to 15 restaurants                                                                                                                                        | NA                |
| /api/restaurant?page=3&size=20 | GET    | get list of restaurants for pagination.<br>page=3 show page3 of pagination, <br>size=20 mean limit the list to 20 restaurants<br> can omit page or size as page default to 1 and size default to 15 | NA                |
| /api/restaurant?find=soup      | GET    | get list of restaurant with name or tags contain soup. <br>Can use with page and size query param                                                                                                   | NA                |
| /api/restaurant/:id            | GET    | get particular restaurant by id                                                                                                                                                                     | id of restaurant  |

##### Restaurant routes

- /restaurant/reservations - show reservations and orders
- /restaurant/queue - show the queued dishes
- /restaurant/profile - edit restaurant profile
- /restaurant/menu - edit restaurant menu
- /restaurant/seat - edit restaurant seat
- /restaurant/insights - show business insights
- /restaurant/completed_orders - show completed orders
- /restaurant/reviews - show reviews

##### Customer routes

- /customer/home - homepage
- /customer/filter - filter and show search results
- /customer/orders - show all reservations
- /show-restaurant/{restaurant name} - show restaurant details and allow users to make reservation here

### Helper Function, Custom Hooks

useFetch: Custom Hooks for CRUD operation.

```javascript
//🌟to use it import the custom hook
import useFetch from "../hooks/useFetch";

//🌟delclare the initial state. the url here is the base url. we will specify the endpoint below.
const [{ data, loading, error }, callFetch] = useFetch(
  "http://localhost:5000/api"
);

//🌟to read we call the callFetch. "/restaurant" is the endpoint and the full url is
//http://localhost:5000/api/restaurant
useEffect(() => {
  callFetch("/restaurant");
}, []);

//🌟alternative create a button with onClick point to buttonOnclick
const buttonOnclick = () => {
  callFetch("/restaurant");
};

//🌟to perform other method such as POST
const buttonOnclick = () => {
  const submitData = {
    name: "abcd",
    age: 18,
  };
  //🌟 1st param = endpoint, 2nd param = Method default to GET
  // 3rd param = payload
  callFetch("/restaurant", "POST", submitData);
};
```
