import React from "react";
import { Grid, Typography, Divider } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import IndustryImage from "../../assets/icons/industry.png";
import Logo from "../../assets/icons/Logo.png";
import Truck from "../../assets/icons/truck-dark.png";
import useStyles from "./Cover.style";

function LoginPage() {
  const classes = useStyles();
  const { pathname } = useLocation();
  let information, logo;

  switch (pathname) {
    case "/computers":
      logo = <img className={classes.images} src={IndustryImage} alt="Industry" />;
      information = <Typography className={classes.description}>דו"ח מחשבים</Typography>;
      break;
    case "/delivery":
      logo = <img className={classes.images} src={Truck} alt="Truck" />;
      information = <Typography className={classes.description}>קליטת פריטים</Typography>;
      break;
    case "/delivery/true":
      logo = <img className={classes.images} src={Truck} alt="Truck" />;
      information = <Typography className={classes.description}>קליטת משלוח</Typography>;
      break;
    default:
      logo = <img className={classes.images} src={IndustryImage} alt="Industry" />;
      information = <img className={classes.images} src={Logo} alt="Logo" />;
      break;
  }

  return (
    <Grid id="cover" container className={classes.root}>
      <Grid item xs={5}>
        {logo}
      </Grid>
      <Grid item xs={7} style={{ display: "flex", alignItems: "center" }}>
        {information}
      </Grid>
      <Divider light />
    </Grid>
  );
}

export default LoginPage;
