import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { UserType } from '../data/types/userTypes';

import {
    BlackTextTypography,
    SecondaryMainTextTypography,
    Link,
    Button,
  } from "../components/index";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2% 6% 0.5% 6%",
    background: "white",
    position: "fixed",
    marginTop: "-8px",
    zIndex: 999, 
    fontSize: "0.9em",
    boxShadow: "none"
  },
  tab: {
    margin:"0 8%", 
    display:"inline-block"
  },
}));

export default function Navbar(props: any) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  let name = "";
  if (props.user) {
    name = props.user.firstName + " " + props.user.lastName;
  }

  const logout = () => {
    localStorage.clear();
    window.location.reload();
    setAnchorEl(null);
  }

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const content = () => {
    let userType = localStorage.getItem("userType");
    if (!userType) {
      return null;
    }
    // admin
    if (parseInt(userType) === UserType.Admin){
      return <Grid style={{margin:"0 5%"}}>
        <Link href="/opportunities" className={classes.tab} style={{margin: "0 6%"}}><SecondaryMainTextTypography>Browse Opportunities</SecondaryMainTextTypography></Link>
        <Link href="/volunteers" className={classes.tab} style={{margin: "0 6%"}}><SecondaryMainTextTypography >Browse Volunteers</SecondaryMainTextTypography></Link>
        <Link className={classes.tab} style={{margin: "0 6%"}}><SecondaryMainTextTypography>Admin</SecondaryMainTextTypography></Link>
      </Grid>;
    } else if (parseInt(userType) === UserType.Educator) {
      // educator
      return <Grid style={{margin:"0 15%"}}>
        <Link href="/events" className={classes.tab}><SecondaryMainTextTypography>Dashboard</SecondaryMainTextTypography></Link>
        <Link href="/volunteers" className={classes.tab}><SecondaryMainTextTypography >Browse Volunteers</SecondaryMainTextTypography></Link>
      </Grid>;
    } else if (parseInt(userType) === UserType.Volunteer) {
      // volunteer
      return <Grid style={{margin:"0 15%"}}>
        <Link href="/dashboard" className={classes.tab}><SecondaryMainTextTypography>Dashboard</SecondaryMainTextTypography></Link>
        <Link href="/opportunities" className={classes.tab}><SecondaryMainTextTypography >Browse Opportunities</SecondaryMainTextTypography></Link>
      </Grid>;
    }
    return null;
  }

  return (
    <AppBar className={classes.root}>
      <Grid container>
        <Grid xs={3}>
          <Link href="\"><BlackTextTypography>Business & Education Partnership</BlackTextTypography></Link>
        </Grid>
        <Grid xs={7}>{ props.user ? content() : null}</Grid>
        { props.user ? 
          <Grid xs={2}>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{cursor:"pointer", marginTop: "-3%"}}>
              <BlackTextTypography>{name}</BlackTextTypography>
            </Button>
            <Menu 
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleClose}><Link><BlackTextTypography>Profile</BlackTextTypography></Link></MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </Grid>
        : null }
      </Grid>
    </AppBar>
  );
}
