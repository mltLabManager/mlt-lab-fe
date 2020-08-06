import React from "react";
import { Typography, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import useStyles from "./ComputerRow.style";

type ComputerRowProps = {
  data: TableRow;
};

function ComputerRow({ data }: ComputerRowProps) {
  const classes = useStyles();
  const history = useHistory();

  const toComputerDetials = () => {
    history.push(`/computers/${data.id}`);
  };

  return (
    <Grid container className={classes.root} onClick={toComputerDetials}>
      <Grid item xs={3}>
        <Typography className={classes.text}>{data.id}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography className={classes.text}>{data.vendor}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography className={classes.text}>{data.location}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography className={classes.text}>{data.status}</Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography className={classes.text} style={{ color: "#3955F6" }}>
          {">"}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default ComputerRow;
