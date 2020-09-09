import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    backgroundColor: "white",
    marginBottom: "2px",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
  },
  dropDown: {
    "& div": {
      borderRadius: "50px",
      width: "80px",
    },
  },
});

export default useStyles;
