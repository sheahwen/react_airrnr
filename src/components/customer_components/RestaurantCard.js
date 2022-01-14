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

const RestaurantCard = () => {
  return (
    <Grid item md={4}>
      <Card className="restaurantCard" sx={{ maxWidth: 340 }}>
        <CardMedia
          component="img"
          alt="pancake"
          height="140"
          image="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=480&q=80"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            McDonalds
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fast food, Fried food, Western
          </Typography>
          <Typography variant="body3" color="text.secondary">
            <AccessTimeOutlinedIcon />
            9am - 9pm
          </Typography>
          <Typography component="legend">Read only</Typography>
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
