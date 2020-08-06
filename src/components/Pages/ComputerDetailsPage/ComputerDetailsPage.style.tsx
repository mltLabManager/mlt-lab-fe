import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    backgroundColor: "white",
    margin: "10px",
    border: "1px solid #3955F6",
    borderRadius: "20px",
  },
  title: {
    textAlign: "center",
    color: "#3955F6",
    fontSize: "24px",
    fontWeight: "bold",
  },
  image: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    zIndex: -1,
  },
  inputHolder: {
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
  },
  inputTitle: {
    textAlign: "center",
    color: "#3955F6",
  },
  secondTitle: {
    textAlign: "center",
    color: "#3955F6",
    fontSize: "18px",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#3955F6",
    color: "white",
    border: "1px solid transparent",
    borderRadius: "10px",
  },
  textField: {
    margin: "15px",
    marginTop: "0px",
    "& input": {
      textAlign: "center",
    },
  },
  switchBase: {
    "&$checked": {
      color: "#0F7D6A",
      "& + $track": {
        backgroundColor: "white",
        opacity: 1,
        border: "1px solid #0F7D6A",
      },
    },
  },
  thumb: {},
  track: {},
  checked: {},
  focusVisible: {},
});

export default useStyles;
