import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#0F7D6A",
  },
  text: {
    textAlign: "center",
    color: "white",
  },
  image: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    zIndex: -1,
  },
});

export default useStyles;
