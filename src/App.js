import "./App.css";
import { Fragment, useState, useEffect } from "react";
import Header from "./Components/Header/Header";
import List from "./Components/List/List";
import Map from "./Components/Map/Map";
import { Grid, CssBaseline } from "@material-ui/core";
import { getPlaceData } from "./api";
function App() {
  let [places, setPlaces] = useState([]);
  let [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  let [bounds, setBounds] = useState({
    ne: { lat: 0, lng: 0 },
    sw: { lat: 0, lng: 0 },
  });
  let [type, setType] = useState("restaurants");
  let [rating, setRating] = useState(0);
  let [filteredplaces, setfilteredplaces] = useState([]);
// to set coordinates of your location after the compoenent is mounted
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);
  // to filter places when there's a change on rating 
  useEffect(() => {
    let filtered = places.filter((place) => {
      return Number(place.rating) > rating;
    });
    setfilteredplaces(filtered);
  }, [rating, places]);
  useEffect(() => {
    console.log(
      "the coordinates are: ",
      coordinates,
      " and bounds are : ",
      bounds
    );
    getPlaceData(type, bounds.ne, bounds.sw).then((data) => {
      console.log(data);
      setPlaces(data);
    });
  }, [type,coordinates, bounds]);

  return (
    <Fragment>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container style={{ width: "100%" }} spacing={3}>
        <Grid item xs={12} md={4}>
          <List
            setRating={setRating}
            rating={rating}
            places={filteredplaces.length?filteredplaces:places}
            type={type}
            setType={setType}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            places={filteredplaces.length?filteredplaces:places}
            coordinates={coordinates}
            setBounds={setBounds}
            setCoordinates={setCoordinates}
            setRating={setRating}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default App;
