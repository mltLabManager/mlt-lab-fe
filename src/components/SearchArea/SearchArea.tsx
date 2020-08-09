import React from "react";
import { Grid, Typography, TextField } from "@material-ui/core";
import useStyles from "./SearchArea.style";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../actions";

function SearchArea() {
  const classes = useStyles();
  const search = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();

  return (
    <Grid container style={{ backgroundColor: "#f9d452" }}>
      <Grid item xs={6} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography style={{ color: "#3955F6" }}>חיפוש לפי מספר סידורי</Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          className={classes.root}
          style={{ margin: "15px", backgroundColor: "white", border: "1px solid #3955F6" }}
          variant="outlined"
          margin="dense"
          value={search.text}
          onChange={(event) =>
            dispatch(allActions.searchActions.setSearch(Object.assign({}, search, { text: event.target.value })))
          }
        />
      </Grid>
    </Grid>
  );
}

export default SearchArea;
