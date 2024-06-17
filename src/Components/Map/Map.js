import React, { Fragment } from "react";
import useStyles from "./Styles";
import { Paper, useMediaQuery, Typography, Box } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import GoogleMapReact from "google-map-react";
import { LocationOnOutlined } from "@material-ui/icons";
function Map({ coordinates, setCoordinates, setBounds, places,setChildClicked}) {
  let classes = useStyles();
  let isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Fragment>
      <Box className={classes.mapContainer}>
        <GoogleMapReact
        
          onChange={(e) => {
            setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
            setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          }}
          onChildClick={(child)=>{setChildClicked(child)}}
          // bootstrapURLKeys={{ key: "AIzaSyClkyMnL595qTqxi9DyqB1HuxZJL0KI3Mw" }} defaultCenter={coordinates}
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_KEY ,libraries:['places']}}
          defaultCenter={coordinates}
          center={coordinates}
          defaultZoom={14}
          margin={[50, 50, 50, 50]}
        >
          {places?.map((place, i) => {
            return (
              <div
                key={place?.location_id}
                className={classes.markerContainer}
                lat={Number(place.latitude)}
                lng={Number(place.longitude)}
              >
                {isMobile ? (
                  <LocationOnOutlined color="primary" />
                ) : (
                  <Paper elevation={5} className={classes.paper}>
                    <Typography variant="subtitle2">{place.name} </Typography>
                    <img
                      alt={place.name}
                      className={classes.pointer}
                      src={
                        place.photo
                          ? place.photo.images.large.url
                          : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                      }
                    />
                    <Rating
                      value={place.rating}
                      // onChange={() => {
                      //   setRating(place.rating);
                      // }}
                      color="primary"
                      readOnly
                    />
                  </Paper>
                )}
              </div>
            );
          })}
        </GoogleMapReact>
      </Box>
    </Fragment>
  );
}

export default Map;
