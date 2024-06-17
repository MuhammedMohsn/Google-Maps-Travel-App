import React, { Fragment, useEffect, useState, createRef } from "react";
import useStyles from "./Styles";
import PlaceDetails from "../Placedetails/Placedetails";
import {
  Typography,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  Grid,
  CircularProgress,
} from "@material-ui/core";
function List({
  places,
  type,
  setType,
  rating,
  setRating,
  isLoading,
  childClicked,
}) {
  let classes = useStyles();
  let [refs, setRefs] = useState([]);
  useEffect(() => {
    setRefs(
      Array(places?.length)
        ?.fill()
        .map((_, i) => {
          return refs[i] || createRef();
        })
    );
  }, [places]);
  return (
    <Fragment>
      <div className={classes.container} style={{ width: "100%" }}>
        <Typography variant="h4">restaurants and hotels</Typography>
        <FormControl className={classes.formControl}>
          <InputLabel>type</InputLabel>
          <Select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <MenuItem value="hotels">Hotels</MenuItem>
            <MenuItem value="restaurants">Restaurants</MenuItem>
            <MenuItem value="attractions">Attractions</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel>Rating</InputLabel>
          <Select
            value={rating || 0}
            onChange={(e) => {
              setRating(e.target.value);
            }}
          >
            <MenuItem value={0}>All</MenuItem>
            <MenuItem value={3}>Above 3.0</MenuItem>
            <MenuItem value={4}>Above 4</MenuItem>
            <MenuItem value={5}>Above 5</MenuItem>
          </Select>
        </FormControl>
        <Grid container className={classes.list} spacing={3}>
          {isLoading ? (
            <>
              <CircularProgress size={35} />
            </>
          ) : (
            <>
              {places?.length > 0 ? (
                places
                  ?.map((place, i) => {
                    return (
                      <Grid item key={place?.location_id}>
                        <PlaceDetails
                          place={place}
                          selected={place?.location_id === childClicked}
                          refProp={refs[i]}
                        />
                      </Grid>
                    );
                  })
              ) : (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "32px",
                    }}
                  >
                    Not found data
                  </div>
                </>
              )}
            </>
          )}
        </Grid>
      </div>
    </Fragment>
  );
}

export default List;
