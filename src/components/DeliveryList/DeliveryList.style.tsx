import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  list: {
    overflowY: "scroll",
  },
  button: {
    backgroundColor: "rgb(23, 87, 255) !important",
    color: "white",
    borderRadius: "50px",
  },
  reportDelivery: {
    textAlign: "center",
    marginBottom: "16px",
    marginTop: "16px",
    width: "100%",
    // position: "absolute",
    // bottom: "20px",
    zIndex: 10000,
  },
  inputTitle: {
    textAlign: "center",
    color: "#3955F6",
  },
  backdrop: {
    zIndex: 1,
    color: "#fff",
  },
});

export default useStyles;
