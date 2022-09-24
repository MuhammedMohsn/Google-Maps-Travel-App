import React, { Fragment } from 'react'
import useStyles from './Styles'
import { Card, Chip, CardMedia,CardActions,Button, Box, Typography, CardContent } from '@material-ui/core'
import {Rating} from '@material-ui/lab'
import {LocationSearching} from '@material-ui/icons'
function Placedetails({ place }) {
  let classes = useStyles();
  return (
    <Fragment>
      <Card elevation={6} >
        <CardMedia style={{ height: "60px", width: "100px" }} title={place.name} image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
        } />
        <CardContent>
          <Typography variant="h5" gutterBottom>{place.name}</Typography>
          <Box display="flex" justifyContent="space-between" width="80px">
         <Rating value={place.rating} readOnly/>
          <Typography variant="subtitle1" gutterBottom>out of {place.num_reviews} reviews</Typography>
            </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">price</Typography>
            <Typography variant="subtitle1" gutterBottom>{place.price}</Typography>

          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Ranking</Typography>
            <Typography variant="subtitle1" gutterBottom>{place.ranking}</Typography>
          </Box>
         
          {place?.awards?.map(award=>{return(
            <Box display="flex" justifyContent="space-between" my={2} key={Math.random()*10}>
            <img src={award.images.small} alt={award.display_name}/>
            <Typography variant="subtitle2" gutterBottom>{award.display_name}</Typography>
            </Box>
          )})}
        

          {place.cuisine?.map((item) => {
            let { name } = item;
            return (
              <Chip label={name} size="small" className={classes.chip} key={Math.random()} />
            )})}
          
           {place?.address&&(<Typography variant="body1" color="secondary"><LocationSearching/> {place.address}</Typography>)}
        </CardContent>
        <CardActions>
        <Button color="primary" size="small" variant="contained" onClick={e=>{window.open(place.web_url,"_blank")}}>Travel Advisor</Button>
        <Button color="primary" size="small" variant="contained" onClick={e=>{window.open(place.website,"_blank")}}>Website</Button>
     </CardActions>
      </Card>
    </Fragment>
  )
}

export default Placedetails
