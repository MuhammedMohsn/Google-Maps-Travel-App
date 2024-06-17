import React, { Fragment } from "react";
import useStyles from "./Styles";
import {
  Card,
  Chip,
  CardMedia,
  CardActions,
  Button,
  Box,
  Typography,
  CardContent,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { LocationSearching, Phone, EmailOutlined } from "@material-ui/icons";
function Placedetails({ place,selected,refProp }) {
  let classes = useStyles();
  if(selected){
   refProp?.current?.scrollIntoView({behavior:"smooth",block:"start"})
  }
  return (
    <Fragment>
      <Card elevation={6}>
        <CardMedia
          style={{
            height: `${+place?.photo?.images?.medium?.height}px`,
            width: `${+place.photo?.images?.medium?.width}px`,
          }}
          title={place.name}
          image={
            place.photo
              ? place?.photo?.images?.medium?.url
              : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
          }
        />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {place.name}
          </Typography>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Rating value={+Math.ceil(+place.rating)} readOnly />
            <Typography variant="subtitle1" gutterBottom>
              {place.num_reviews} reviews
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">price</Typography>
            <Typography variant="subtitle1" gutterBottom>
              {place.price ? place.price : `0 $`}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Ranking</Typography>
            <Typography variant="subtitle1" gutterBottom>
              {place.ranking}
            </Typography>
          </Box>

          {place?.awards?.map((award) => {
            return (
              <Box
                display="flex"
                justifyContent="space-between"
                my={2}
                key={Math.random() * 10}
              >
                <img src={award.images.small} alt={award.display_name} />
                <Typography variant="subtitle2" gutterBottom>
                  {award.display_name}
                </Typography>
              </Box>
            );
          })}

          {place.cuisine?.map((item) => {
            let { key, name } = item;
            return (
              <Chip
                label={name}
                size="small"
                className={classes.chip}
                key={key}
              />
            );
          })}

          {place?.address && (
            <Typography variant="body1" color="secondary">
              <LocationSearching /> {place?.address}
            </Typography>
          )}
          {place?.phone ? (
            <>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">
                  <Phone />
                  Phone
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {place.phone}
                </Typography>
              </Box>
            </>
          ) : (
            <></>
          )}
          {place?.email ? (
            <>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">
                  <EmailOutlined />
                  Email
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {place.email}
                </Typography>
              </Box>
            </>
          ) : (
            <></>
          )}
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            size="small"
            variant="contained"
            onClick={() => {
              window.open(place.web_url, "_blank");
            }}
          >
            Travel Advisor
          </Button>
          <Button
            color="primary"
            size="small"
            variant="contained"
            onClick={() => {
              window.open(place.website, "_blank");
            }}
          >
            Website
          </Button>
        </CardActions>
      </Card>
    </Fragment>
  );
}

export default Placedetails;
