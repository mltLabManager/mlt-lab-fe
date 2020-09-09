import React from "react";
import { Typography, Grid } from "@material-ui/core";
import useStyles from "./DeliveryTitle.style";
interface DeliveryTitleProps {
  isPhone: boolean;
}

function DeliveryTitle({ isPhone }: DeliveryTitleProps) {
  const classes = useStyles();

  return (
    <Grid id="TitleList" container className={classes.root}>
      <Grid item xs={4}>
        <Typography className={classes.text}>מספר סידורי</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography className={classes.text}>סוג פריט</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography className={classes.text}>נתרם ע"י</Typography>
      </Grid>
      <Grid item xs={2}>
        {isPhone ? (
          <Typography className={classes.text}>חסר</Typography>
        ) : (
          <Typography className={classes.text}>יצרן</Typography>
        )}
      </Grid>
    </Grid>
  );
}

export default DeliveryTitle;
