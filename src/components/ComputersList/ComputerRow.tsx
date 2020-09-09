import React from "react";
import { Typography, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import useStyles from "./ComputerRow.style";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../actions";

type ComputerRowProps = {
  data: TableRow;
};

function ComputerRow({ data }: ComputerRowProps) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const search = useSelector((state: RootState) => state.search);

  const values = useSelector((state: RootState) => state.parameterData);

  const toComputerDetials = () => {
    dispatch(allActions.searchActions.setSearch(Object.assign({}, search, { isOpen: false })));
    history.push(`/computers/${data.id}`);
  };

  return (
    <Grid container className={classes.root} onClick={toComputerDetials}>
      <Grid item xs={3}>
        <Typography className={classes.text}>{data.id}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography className={classes.text}>
          {values[2].systemData.find((val) => data.computerType?.toString() === val.id.toString())?.value}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography className={classes.text}>
          {values[0].systemData.find((val) => data.currentLocation!.toString() === val.id.toString())?.value}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography className={classes.text}>
          {values[1].systemData.find((val) => data.currentStatus!.toString() === val.id.toString())?.value}
        </Typography>
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
