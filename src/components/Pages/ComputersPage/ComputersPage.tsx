import React from "react";
import useStyles from "./ComputersPage.style";
import Cover from "../../General/Cover";
import ComputersList from "../../ComputersList/ComputersList";
import Computer from "../../../assets/icons/computer.png";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../../actions";
import { useHistory } from "react-router-dom";

function ComputerPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector((state: RootState) => state.userId);

  if (userId === "") {
    history.push("/");
  }

  return (
    <div>
      <Cover />
      <ComputersList />
      <img src={Computer} alt="Computer" className={classes.image} />
    </div>
  );
}

export default ComputerPage;
