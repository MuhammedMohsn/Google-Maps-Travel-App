import React, { Fragment } from 'react'
import useStyles from './Styles'
import PlaceDetails from '../Placedetails/Placedetails'
import { Typography, MenuItem, InputLabel, FormControl, Select, Grid } from '@material-ui/core'
function List({places,type,setType,rating,setRating}) {
  let classes = useStyles()
  return (
    <Fragment>
      <div className={classes.container}>
        <Typography variant="h4">restaurants and hotels</Typography>
        <FormControl className={classes.formControl}>
          <InputLabel>type</InputLabel>
          <Select value={type} onChange={(e) => { setType(e.target.value) }} >
            <MenuItem value="hotels">Hotels</MenuItem>
            <MenuItem value="restaurants">Restaurants</MenuItem>
            <MenuItem value="attractions">Attractions</MenuItem>
          </Select></FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel>Rating</InputLabel>
          <Select value={rating||0} onChange={(e) => { setRating(e.target.value); console.log(e.target.value) }} >
            <MenuItem value={0}>All</MenuItem>
            <MenuItem value={3}>Above 3.0</MenuItem>
            <MenuItem value={4}>Above 4</MenuItem>
            <MenuItem value={5}>Above 5</MenuItem>
          </Select>

        </FormControl>
        <Grid container className={classes.list} spacing={3}>
        {places?.map((place) =>{
          return(
            <Grid item key={Math.random()*10}><PlaceDetails place={place}/></Grid>
          )
        })}
        </Grid>
      </div>
    </Fragment>
  )
}

export default List