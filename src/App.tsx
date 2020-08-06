import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./routes";
import Navbar from "./components/General/Navbar";
import "./App.css";

function App() {
  const pages = routes.map((route) => (
    <Route key={route.path} exact path={route.path}>
      {route.page}
    </Route>
  ));

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
    </div>
  );
}

export default App;
