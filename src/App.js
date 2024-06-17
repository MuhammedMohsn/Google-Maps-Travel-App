import "./App.css";
import { Fragment, useState, useEffect } from "react";
import Header from "./Components/Header/Header";
import List from "./Components/List/List";
import Map from "./Components/Map/Map";
import { Grid, CssBaseline } from "@material-ui/core";
import { getPlaceData } from "./api";
function App() {
  let [places, setPlaces] = useState([]);
  let [isLoading,setIsLoading]=useState(true)
  let [childClicked,setChildClicked]=useState(null)
  let [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  let [bounds, setBounds] = useState({
    ne: { lat: 0, lng: 0 },
    sw: { lat: 0, lng: 0 },
  });
  let [type, setType] = useState("restaurants");
  let [rating, setRating] = useState(0);
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
    setIsLoading(true)
    getPlaceData(type, bounds.ne, bounds.sw).then((data)=>{
      setIsLoading(false)
      setPlaces(data?.filter((item)=>{return item?.name && item?.rating && item?.num_reviews>0})?.filter((place) => {
        return Number(place.rating) > rating;
      }));
    })
  }, [rating]);

  useEffect(() => {
    // console.log(
    //   "the coordinates are: ",
    //   coordinates,
    //   " and bounds are : ",
    //   bounds
    // );
    setIsLoading(true)
    getPlaceData(type, bounds.ne, bounds.sw).then((data) => {
      setIsLoading(false)
      setPlaces(data?.filter((item)=>{return item?.name && item?.rating && item?.num_reviews>0}));
    });
  }, [type,bounds,coordinates]);

  return (
    <Fragment>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container style={{ width: "100%" }} spacing={3}>
        <Grid item xs={12} md={4}>
          <List
            setRating={setRating}
            rating={rating}
            places={places}
            type={type}
            setType={setType}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            childClicked={childClicked}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            places={places}
            coordinates={coordinates}
            setBounds={setBounds}
            setCoordinates={setCoordinates}
            setRating={setRating}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default App;
