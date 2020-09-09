import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  navbar: {
    backgroundColor: "white",
  },
  root: {
    borderRadius: "50px",
    "& div": {
      borderRadius: "50px",
    },
  },
  button: {
    backgroundColor: "rgb(23, 87, 255) !important",
    color: "white",
    borderRadius: "50px",
    margin: "4px 6px ",
  },
  dialog: {
    borderRadius: "50px",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default useStyles;
