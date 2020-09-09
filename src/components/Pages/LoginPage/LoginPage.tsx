import React from "react";
import { useHistory } from "react-router-dom";
import { Typography, TextField, Button, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Person from "../../../assets/icons/person.png";
import Cover from "../../General/Cover";
import useStyles from "./LoginPage.style";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../../actions";
import UserService from "../../../services/UserService";

function LoginPage() {
  const classes = useStyles();
  const history = useHistory();
  const currentUserId = useSelector((state: RootState) => state.userId);
  const dispatch = useDispatch();

  // const [userId, setUserId] = React.useState(currentUserId);
  const [phone, setPhone] = React.useState(currentUserId);
  const [password, setPassword] = React.useState("");
  const [showIdError, setShowIdError] = React.useState(false);

  const validatePhoneAndPass = () => {
    if (phone.length < 7 || phone.length > 10 || !Number(phone) || password === "") {
      setShowIdError(true);
      return false;
    }
    return true;
  };

  const toComputers = async () => {
    if (validatePhoneAndPass()) {
      const token = await UserService.getToken({
        phone: phone,
        password: password,
      });
      console.log(token);
      if (token.tokenJson?.length > 0) {
        dispatch(allActions.userActions.setUser(phone));
        history.push("/computers");
      } else {
        setShowIdError(true);
      }
    }
  };

  const toBarcode = () => {
    history.push("/barcode");
  };

  return (
    <div>
      <Cover />
      <div style={{ margin: "40px" }}>
        <Typography className={classes.id}>מספר טלפון</Typography>
        <TextField
          className={classes.input}
          variant="outlined"
          margin="dense"
          value={phone}
          onChange={(event) => {
            setPhone(event.target.value);
          }}
          inputProps={{ inputMode: "numeric" }}
        />
        <Typography className={classes.id}>סיסמא</Typography>
        <TextField
          className={classes.input}
          variant="outlined"
          margin="dense"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          inputProps={{ inputMode: "text" }}
        />
        <div style={{ width: "100%", justifyContent: "center", display: "flex", marginTop: "10px" }}>
          <Button variant="contained" disableElevation className={classes.button} onClick={toComputers}>
            כניסה
          </Button>
          {/* <Button variant="contained" className={classes.button} onClick={toBarcode}>
            סריקת QR
          </Button> */}
        </div>
      </div>
      <img src={Person} alt="Person" className={classes.person} />
      <Snackbar open={showIdError} autoHideDuration={6000} onClose={() => setShowIdError(false)}>
        <Alert severity="error">אופס! הנתונים שהכנסת אינם תקינים</Alert>
      </Snackbar>
    </div>
  );
}

export default LoginPage;
