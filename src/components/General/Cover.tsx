import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import IndustryImage from "../../assets/icons/industry.png";
import Logo from "../../assets/icons/Logo.png";
import useStyles from "./Cover.style";

function LoginPage() {
  const classes = useStyles();
  const { pathname } = useLocation();

  let information;

  switch (pathname) {
    case "/computers":
      information = <Typography className={classes.description}>דו"ח מחשבים</Typography>;
      break;

    default:
      information = <img className={classes.images} src={Logo} alt="Logo" />;
      break;
  }

  return (
    <Grid id="cover" container className={classes.root}>
      <Grid item xs={5}>
        <img className={classes.images} src={IndustryImage} alt="Industry" />
      </Grid>
      <Grid item xs={7} style={{ display: "flex", alignItems: "center" }}>
        {information}
      </Grid>
    </Grid>
  );
}

export default LoginPage;
