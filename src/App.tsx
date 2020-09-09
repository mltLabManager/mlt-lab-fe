import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Backdrop, CircularProgress, Snackbar } from "@material-ui/core";
import routes from "./routes";
import Navbar from "./components/General/Navbar";
import "./App.css";
import * as ParameterService from "./services/ParameterData";
// import SystemDataService from "./services/SystemData";
import ComputerDataService from "./services/ComputerData";
import { useDispatch } from "react-redux";
import allActions from "./actions";
import Alert from "@material-ui/lab/Alert";
import SystemDataService from "./services/SystemData";
import UserService from "./services/UserService";
import AppFooter from "./components/General/Footer/Footer";

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
  const [isLogin, setIsLogin] = React.useState(false);

  // const getJwt = async () => {
  //   const token = await UserService.getToken({
  //     phone: "0544553785",
  //     password: "Sapir123",
  //   });
  //   setIsLogin(token.length > 0);
  // };

  const pages = routes.map((route) => (
    <Route key={route.path} exact path={route.path}>
      {route.page}
    </Route>
  ));

  const loadData = async () => {
    Promise.all([
      SystemDataService.getSystemData(),
      ParameterService.GetAllParameters(),
      ComputerDataService.getComputersData(),
    ])
      .then((values) => {
        setIsLoad(false);
        dispatch(allActions.systemDataActions.setSystemData(values[0]));
        dispatch(allActions.parametersActions.setParametersData(values[1]));
        dispatch(allActions.computersActions.setComputers(values[2]));
      })
      .catch((error) => {
        console.log(error);
        setIsLoad(false);
        setShowError(true);
      });
  };

  // Initial loading of parameters
  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoad(true);
      // await getJwt();
      await loadData();
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={() => setShowError(false)}
      >
        <Alert severity="error">אופס! חלה שגיאה בטעינת הנתונים</Alert>
      </Snackbar>
      <div className="AppFooter" style={{ color: "black" }}>
        <AppFooter />
      </div>
    </div>
  );
}

export default App;
