import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Backdrop, CircularProgress, Snackbar } from "@material-ui/core";
import routes from "./routes";
import Navbar from "./components/General/Navbar";
import "./App.css";
import SystemDataService from "./services/SystemData";
import ComputerDataService from "./services/ComputerData";
import { useDispatch } from "react-redux";
import allActions from "./actions";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles({
  backdrop: {
    zIndex: 1,
    color: "#fff",
  },
});

function App() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isLoad, setIsLoad] = React.useState(false);
  const [showError, setShowError] = React.useState(false);

  const pages = routes.map((route) => (
    <Route key={route.path} exact path={route.path}>
      {route.page}
    </Route>
  ));

  const loadData = async () => {
    const systemData = SystemDataService.getSystemData();
    const computersData = ComputerDataService.getComputersData();
    Promise.all([systemData, computersData])
      .then((values) => {
        dispatch(allActions.systemDataActions.setSystemData(values[0]));
        dispatch(allActions.computersActions.setComputers(values[1]));
        setIsLoad(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoad(false);
        setShowError(true);
      });
  };

  // Initial loading of parameters
  React.useEffect(() => {
    setIsLoad(true);
    loadData();
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          {pages}
          {/* Default route if there is no match */}
          {/* <Route path="*" component={HomePage} /> */}
        </Switch>
      </Router>
      <Backdrop className={classes.backdrop} open={isLoad}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={showError} autoHideDuration={6000} onClose={() => setShowError(false)}>
        <Alert severity="error">אופס! חלה שגיאה בטעינת הנתונים</Alert>
      </Snackbar>
    </div>
  );
}

export default App;
