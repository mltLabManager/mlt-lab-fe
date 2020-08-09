import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  rounded: {
    "& div": {
      borderRadius: "50px",
    },
  },
  id: {
    color: "#3955F6",
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: "50px",
    "& div": {
      borderRadius: "50px",
    },
  },
  button: {
    backgroundColor: "#3955F6",
    color: "white",
    border: "1px solid transparent",
    borderRadius: "40px",
  },
  person: {
    width: "100%",
    bottom: 0,
  },
});

export default useStyles;
