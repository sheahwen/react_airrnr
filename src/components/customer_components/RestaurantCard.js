import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
  Rating,
  Grid,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

const RestaurantCard = (props) => {
  const clickedId = props.id;
  const query = props.query;

  // print cuisine type
  const printCuisine = props.type
    .map((cuisine) => {
      return cuisine;
    })
    .join(", ");

  // print opening hours
  const convertHour = (str) => {
    if (Number(str.slice(0, 2)) < 12) {
      return `${str.slice(0, 2)}:${str.slice(3, 5)}am`;
    } else {
      return `${Number(str.slice(0, 2)) - 12}:${str.slice(3, 5)}pm`;
    }
  };
  const startHrs = convertHour(props.openhrs[0].start);
  const closeHrs = convertHour(props.openhrs[0].end);

  // user click visit restaurant
  const handleClick = () => {};

  return (
    <Grid item md={4}>
      <Card className="restaurantCard">
        <CardMedia
          component="img"
          alt="pancake"
          height="260vh"
          image={props.img}
        />
        <CardContent>
          <Typography
            className="restaurantCard"
            id="cardName"
            gutterBottom
            variant="h5"
            component="div"
          >
            {props.name}
          </Typography>
          <Typography
            className="restaurantCard"
            id="cardCuisine"
            variant="body3"
            color="text.secondary"
          >
            {printCuisine}
          </Typography>
          <br></br>
          <Typography variant="body3" color="text.secondary">
            <AccessTimeOutlinedIcon />
            {startHrs} - {closeHrs}
          </Typography>
          <Typography component="legend"></Typography>
          <Rating
            name="read-only"
            sx={{ color: "error.main" }}
            value={props.rating}
            precision={0.5}
            readOnly
          />
        </CardContent>
        <CardActions>
          <Button
            color="warning"
            onClick={handleClick}
            size="small"
            component={RouterLink}
            to={{
              pathname: "/customer/reservation",
              state: {
                queryProps: { clickedId, query },
              },
            }}
          >
            Book a table
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default RestaurantCard;
