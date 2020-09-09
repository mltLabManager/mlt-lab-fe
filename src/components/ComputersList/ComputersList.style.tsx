import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  list: {
    overflowY: "scroll",
  },
  margin: {
    margin: "1px",
  },
  dataPicker: {
    width: "140px",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: "3px",
  },
  formControl: {
    margin: "1px",
    minWidth: 120,
    maxWidth: 300,
  },
});

export default useStyles;
