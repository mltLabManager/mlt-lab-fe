import React from "react";
import { Grid, Typography, Divider } from "@material-ui/core";
import useStyles from "./HistoryRow.style";
import { formatDate } from "../../utils/dates";
import { useSelector } from "react-redux";

type HistoryProps = {
  userId: string;
  date: string;
  from: number;
  to: number;
  showDivider: boolean;
};

function History({ userId, date, from, to, showDivider }: HistoryProps) {
  const classes = useStyles();

  const values = useSelector((state: RootState) => state.systemData);

  return (
    <Grid container>
      <Grid className={classes.inputHolder} item xs={6}>
        <Typography className={classes.inputTitle}>ת.ז.</Typography>
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
      <div style={{ margin: "10px", display: "flex", width: "100%" }}>
        <Grid className={classes.inputHolder} item xs={4}>
          <Typography>{values.find((val) => from === val.id)?.value}</Typography>
        </Grid>
        <Grid className={classes.inputHolder} item xs={4}>
          <Typography>{"->"}</Typography>
        </Grid>
        <Grid className={classes.inputHolder} item xs={4}>
          <Typography>{values.find((val) => to === val.id)?.value}</Typography>
        </Grid>
      </div>
      {showDivider ? (
        <Grid item xs={12}>
          <Divider style={{ margin: "10px", backgroundColor: "#3955F6" }} />
        </Grid>
      ) : null}
    </Grid>
  );
}

export default History;
