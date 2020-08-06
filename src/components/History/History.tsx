import React from "react";
import { Dialog, Typography } from "@material-ui/core";
import useStyles from "./History.style";
import HistoryRow from "./HistoryRow";

type HistoryProps = {
  data: History[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

function History({ data, isOpen, setIsOpen }: HistoryProps) {
  const classes = useStyles();

  return (
    <Dialog onClose={() => setIsOpen(false)} open={isOpen} classes={{ paper: classes.root }}>
      <Typography className={classes.title}>היסטוריה</Typography>
      {data.map((history, i) => (
        <HistoryRow
          key={i}
          userId={history.userId}
          date={history.date}
          from={history.from}
          to={history.to}
          showDivider={i !== data.length - 1}
        />
      ))}
    </Dialog>
  );
}

export default History;
