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
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

const RestaurantCard = (props) => {
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
            variant="body2"
            color="text.secondary"
          >
            {printCuisine}
          </Typography>
          <Typography variant="body3" color="text.secondary">
            <AccessTimeOutlinedIcon />
            {startHrs} - {closeHrs}
          </Typography>
          <Typography component="legend"></Typography>
          <Rating name="read-only" value={3} readOnly />
        </CardContent>
        <CardActions>
          <Button size="small">Visit Restaurant</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default RestaurantCard;
