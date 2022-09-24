import React, { Fragment } from 'react';
import { AppBar, Toolbar, Typography, TextField, Box } from '@material-ui/core';
import { Search } from '@material-ui/icons'
import useStyles from './Styles'
function Header() {
    let classes = useStyles();
    return (<Fragment>
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6" className={classes.title}>
                    Travel Advisor
                </Typography>
                <Box display="flex">
                    <Typography variant="h6" className={classes.title}>
                        Explore new places
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <Search />
                        </div>
                        <TextField placeholder="Search...." className={`${classes.inputInput} ${classes.inputRoot}`} />
                    </div> 
                </Box>
            </Toolbar>
        </AppBar>
    </Fragment>
    )
}

export default Header
