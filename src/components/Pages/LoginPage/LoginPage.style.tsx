import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  id: {
    color: "#3955F6",
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "white",
    width: "100%",
  },
  button: {
    backgroundColor: "#3955F6",
    color: "white",
    border: "1px solid transparent",
    borderRadius: "10px",
  },
  person: {
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
});

export default useStyles;
