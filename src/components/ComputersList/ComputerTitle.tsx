import React from "react";
import { Typography, Grid } from "@material-ui/core";
import useStyles from "./ComputerTitle.style";

function ComputerTitle() {
  const classes = useStyles();

  return (
    <Grid id="TitleList" container className={classes.root}>
      <Grid item xs={3}>
        <Typography className={classes.text}>מספר סידורי</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography className={classes.text}>יצרן</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography className={classes.text}>מיקום</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography className={classes.text}>סטטוס</Typography>
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
}

export default ComputerTitle;
