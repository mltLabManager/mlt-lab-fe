import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { AppBar, Toolbar } from "@material-ui/core";
import Logo from "../../assets/icons/Logo.png";
import useStyles from "./Navbar.style";
import SearchIcon from "../../assets/icons/search.png";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../actions";
import SearchArea from "../SearchArea/SearchArea";

function Navbar() {
  const classes = useStyles();
  const { pathname } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const search = useSelector((state: RootState) => state.search);

  const logoClick = () => {
    history.push("/computers");
  };

  const searchClick = () => {
    dispatch(allActions.searchActions.toggleSearch());
    history.push("/computers");
  };

  return (
    <AppBar position="sticky" className={classes.navbar} elevation={0} id="navbar">
      {pathname !== "/" ? (
        <Toolbar style={{ justifyContent: "center" }}>
          <img src={Logo} alt="Logo" onClick={logoClick} />
          <img
            style={{ position: "absolute", left: 0, margin: "20px" }}
            src={SearchIcon}
            alt="Search"
            onClick={searchClick}
          />
        </Toolbar>
      ) : null}
      {search.isOpen ? <SearchArea /> : null}
    </AppBar>
  );
}

export default Navbar;
