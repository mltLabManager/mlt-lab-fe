import React from "react";
import useStyles from "./ComputerDetailsPage.style";
import { Grid, Typography, Button, TextField, Switch, Snackbar, Backdrop, CircularProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../../actions";
import { useParams, useHistory } from "react-router-dom";
import City from "../../../assets/icons/city.png";
import HistoryPopup from "../../History/History";
import DropDownList from "../../ComputersList/DropDownList";
import { formatDate } from "../../../utils/dates";
import ComputerDataService from "../../../services/ComputerData";

function ComputerTitle() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { computerId } = useParams();
  const history = useHistory();
  const [showHistory, setShowHistory] = React.useState(false);
  const [changedComputer, setChangedComputer] = React.useState({} as TableRow);
  const [showSuccessSave, setShowSuccessSave] = React.useState(false);
  const [showErrorSave, setShowErrorSave] = React.useState(false);
  const [isLoad, setIsLoad] = React.useState(false);

  const currentComputer = useSelector((state: RootState) => state.computers).find(
    (computer) => computer.id.toString() === computerId.toString()
  );

  const userId = useSelector((state: RootState) => state.userId);

  if (currentComputer == null) {
    history.push("/computers");
  }

  const toHistory = () => {
    setShowHistory(true);
  };

  const onSave = async () => {
    setIsLoad(true);
    ComputerDataService.updateComputerData(changedComputer, userId)
      .then((newComputer) => {
        dispatch(allActions.computersActions.changeComputer(newComputer));
        setShowSuccessSave(true);
        setIsLoad(false);
      })
      .catch((error) => {
        setShowErrorSave(true);
        console.log(error);
      });
  };

  React.useEffect(() => {
    setChangedComputer(currentComputer!);
  }, [currentComputer]);

  return (
    <div>
      {currentComputer != null && changedComputer.id ? (
        <div className={classes.root}>
          <Button
            variant="contained"
            disableElevation
            style={{ position: "absolute", margin: "10px" }}
            className={classes.button}
            onClick={toHistory}
          >
            היסטוריה
          </Button>
          <Typography className={classes.title}>מחשב {currentComputer!.id}</Typography>
          <Typography style={{ textAlign: "center" }}>מספר ישן {currentComputer!.oldId}</Typography>
          <Grid container>
            <Grid item xs={6} className={classes.inputHolder}>
              <Typography className={classes.inputTitle}>מיקום</Typography>
              <DropDownList
                type={1}
                value={changedComputer.currentLocation!}
                setValue={(newValue: number) => {
                  setChangedComputer(Object.assign({}, changedComputer, { currentLocation: newValue }));
                }}
              />
            </Grid>
            <Grid item xs={6} className={classes.inputHolder}>
              <Typography className={classes.inputTitle}>תאריך עדכון</Typography>
              <Typography className={classes.textField}>{formatDate(changedComputer.lastUpdateDate!)}</Typography>
            </Grid>
            <Grid item xs={6} className={classes.inputHolder}>
              <Typography className={classes.inputTitle}>סטטוס</Typography>
              <DropDownList
                type={2}
                value={changedComputer.currentStatus!}
                setValue={(newValue: number) => {
                  setChangedComputer(Object.assign({}, changedComputer, { currentStatus: newValue }));
                }}
              />
            </Grid>
            <Grid item xs={6} className={classes.inputHolder}>
              <Typography className={classes.inputTitle}>סוג מחשב</Typography>
              <DropDownList
                type={3}
                value={changedComputer.computerType!}
                setValue={(newValue: number) => {
                  setChangedComputer(Object.assign({}, changedComputer, { computerType: newValue }));
                }}
              />
            </Grid>
            <Grid item xs={6} className={classes.inputHolder}>
              <Typography className={classes.inputTitle}>יצרן</Typography>
              <TextField
                className={classes.textField}
                variant="outlined"
                size="small"
                value={changedComputer.provider}
                onChange={(event) =>
                  setChangedComputer(Object.assign({}, changedComputer, { provider: event.target.value }))
                }
              />
            </Grid>
            <Grid item xs={6} className={classes.inputHolder}>
              <Typography className={classes.inputTitle}>מודל</Typography>
              <TextField
                className={classes.textField}
                variant="outlined"
                size="small"
                value={changedComputer.computerModel}
                onChange={(event) =>
                  setChangedComputer(Object.assign({}, changedComputer, { computerModel: event.target.value }))
                }
              />
            </Grid>
            <Grid item xs={6} className={classes.inputHolder}>
              <Typography className={classes.inputTitle}>נתרם ע"י</Typography>
              <TextField
                className={classes.textField}
                variant="outlined"
                size="small"
                value={changedComputer.donatedBy}
                onChange={(event) =>
                  setChangedComputer(Object.assign({}, changedComputer, { donatedBy: event.target.value }))
                }
              />
            </Grid>
            <Grid item xs={6} className={classes.inputHolder}>
              <Typography className={classes.inputTitle}>תאריך קליטה</Typography>
              <Typography className={classes.textField}>{formatDate(changedComputer.entryDate!)}</Typography>
            </Grid>
            <Grid item xs={6} className={classes.inputHolder}>
              <Typography className={classes.inputTitle}>יעד</Typography>
              <TextField
                className={classes.textField}
                variant="outlined"
                size="small"
                value={changedComputer.destination}
                onChange={(event) =>
                  setChangedComputer(Object.assign({}, changedComputer, { destination: event.target.value }))
                }
              />
            </Grid>
            <Grid item xs={6} className={classes.inputHolder}>
              <Typography className={classes.inputTitle}>תאריך שליחה</Typography>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  className={classes.textField}
                  value={changedComputer.deliveryDate}
                  onChange={(date) => setChangedComputer(Object.assign({}, changedComputer, { deliveryDate: date }))}
                  format="dd.MM.yyyy"
                  minDate={changedComputer.entryDate}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
          <Typography className={classes.secondTitle}>רכיבים במחשב</Typography>
          <Grid container className={classes.root} style={{ width: "auto" }}>
            <Grid item xs={6} className={classes.inputHolder}>
              <Typography className={classes.inputTitle}>CPU</Typography>
            </Grid>
            <Grid item xs={6} className={classes.inputHolder}>
              <DropDownList
                type={4}
                value={changedComputer.cpu!}
                setValue={(newValue: number) => {
                  setChangedComputer(Object.assign({}, changedComputer, { cpu: newValue }));
                }}
              />
            </Grid>
            <Grid item xs={6} className={classes.inputHolder}>
              <Typography className={classes.inputTitle}>זיכרון RAM</Typography>
            </Grid>
            <Grid item xs={6} className={classes.inputHolder}>
              <DropDownList
                type={5}
                value={changedComputer.ram!}
                setValue={(newValue: number) => {
                  setChangedComputer(Object.assign({}, changedComputer, { ram: newValue }));
                }}
              />
            </Grid>
            <Grid item xs={6} className={classes.inputHolder}>
              <Typography className={classes.inputTitle}>SDD</Typography>
            </Grid>
            <Grid item xs={6} className={classes.inputHolder}>
              <DropDownList
                type={6}
                value={changedComputer.sdd!}
                setValue={(newValue: number) => {
                  setChangedComputer(Object.assign({}, changedComputer, { sdd: newValue }));
                }}
              />
            </Grid>
            <Grid item xs={6} className={classes.inputHolder}>
              <Typography className={classes.inputTitle}>התקנת אימג'</Typography>
            </Grid>
            <Grid item xs={6} className={classes.inputHolder}>
              <Switch
                classes={{
                  switchBase: classes.switchBase,
                  thumb: classes.thumb,
                  track: classes.track,
                  checked: classes.checked,
                }}
                checked={changedComputer.isImageInstalled}
                onChange={(event) =>
                  setChangedComputer(Object.assign({}, changedComputer, { isImageInstalled: event.target.checked }))
                }
                name="checkedA"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            </Grid>
          </Grid>
          <div style={{ width: "100%", justifyContent: "center", display: "flex", margin: "10px" }}>
            <Button variant="contained" disableElevation className={classes.button} onClick={onSave}>
              שמירה
            </Button>
          </div>
        </div>
      ) : null}
      <img src={City} alt="City" className={classes.image} />
      {showHistory ? (
        <HistoryPopup data={currentComputer!.compuetrHistorys} isOpen={showHistory} setIsOpen={setShowHistory} />
      ) : null}
      <Snackbar open={showSuccessSave} autoHideDuration={6000} onClose={() => setShowSuccessSave(false)}>
        <Alert severity="success">פרטי המחשב עודכנו בהצלחה</Alert>
      </Snackbar>
      <Snackbar open={showErrorSave} autoHideDuration={6000} onClose={() => setShowErrorSave(false)}>
        <Alert severity="error">אופס! חלה שגיאה בעדכון פרטי המחשב</Alert>
      </Snackbar>
      <Backdrop className={classes.backdrop} open={isLoad}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default ComputerTitle;
