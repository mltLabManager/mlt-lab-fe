import React, { useEffect } from "react";
import { Grid, Typography, Divider } from "@material-ui/core";
import useStyles from "./HistoryRow.style";
import { formatDate } from "../../utils/dates";
import { useSelector } from "react-redux";

type HistoryProps = {
  userId: string;
  date: string;
  from: number;
  to: number;
  keyValue: number;
  showDivider: boolean;
};

function History({ userId, date, from, to, keyValue, showDivider }: HistoryProps) {
  const classes = useStyles();

  const values = useSelector((state: RootState) => state.parameterData);

  return (
    <Grid container>
      <Grid className={classes.inputHolder} item xs={6}>
        <Typography className={classes.inputTitle}>מס' טלפון</Typography>
      </Grid>
      <Grid className={classes.inputHolder} item xs={6}>
        <Typography className={classes.inputTitle}>תאריך ביצוע</Typography>
      </Grid>
      <Grid className={classes.inputHolder} item xs={6}>
        <Typography>{userId}</Typography>
      </Grid>
      <Grid className={classes.inputHolder} item xs={6}>
        <Typography>{formatDate(date)}</Typography>
      </Grid>
      <Grid container style={{ margin: "10px" }}>
        <Grid className={classes.inputHolder} item xs={6}>
          <Typography>{values[keyValue - 1].systemData.find((val) => from === +val.id)?.value}</Typography>
        </Grid>
        <Grid className={classes.inputHolder} item xs={1}>
          <Typography>{"->"}</Typography>
        </Grid>
        <Grid className={classes.inputHolder} item xs={5}>
          <Typography>{values[keyValue - 1].systemData.find((val) => to === +val.id)?.value}</Typography>
        </Grid>
      </Grid>
      {showDivider ? (
        <Grid item xs={12}>
          <Divider style={{ margin: "10px", backgroundColor: "#3955F6" }} />
        </Grid>
      ) : null}
    </Grid>
  );
}

export default History;
