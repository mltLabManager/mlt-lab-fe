import React from "react";
import { useHistory } from "react-router-dom";
import { Typography, TextField, Button, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Person from "../../../assets/icons/person.png";
import Cover from "../../General/Cover";
import useStyles from "./LoginPage.style";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../../actions";

function LoginPage() {
  const classes = useStyles();
  const history = useHistory();
  const currentUserId = useSelector((state: RootState) => state.userId);
  const dispatch = useDispatch();

  const [userId, setUserId] = React.useState(currentUserId);
  const [showIdError, setShowIdError] = React.useState(false);

  const validateUserId = () => {
    if (userId.length !== 9 || !Number(userId)) {
      setShowIdError(true);
      return false;
    }
    return true;
  };

  const toComputers = () => {
    if (validateUserId()) {
      dispatch(allActions.userActions.setUser(userId));
      history.push("/computers");
    }
  };

  return (
    <div>
      <Cover />
      <div style={{ margin: "40px" }}>
        <Typography className={classes.id}>תעודת זהות</Typography>
        <TextField
          className={classes.input}
          variant="outlined"
          margin="dense"
          value={userId}
          onChange={(event) => {
            setUserId(event.target.value);
          }}
          inputProps={{ inputMode: "numeric" }}
        />
        <div style={{ width: "100%", justifyContent: "center", display: "flex", marginTop: "10px" }}>
          <Button variant="contained" disableElevation className={classes.button} onClick={toComputers}>
            כניסה
          </Button>
        </div>
      </div>
      <img src={Person} alt="Person" className={classes.person} />
      <Snackbar open={showIdError} autoHideDuration={6000} onClose={() => setShowIdError(false)}>
        <Alert severity="error">אופס! תעודת הזהות שהוכנסה אינה תקינה</Alert>
      </Snackbar>
    </div>
  );
}

export default LoginPage;
