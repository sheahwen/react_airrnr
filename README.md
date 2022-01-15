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
- /customer/restaurant-details - show restaurant details and where booking is done
- /customer/orders - show all reservations
