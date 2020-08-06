import React from "react";
import useStyles from "./ComputersPage.style";
import Cover from "../../General/Cover";
import ComputersList from "../../ComputersList/ComputersList";
import Computer from "../../../assets/icons/computer.png";
import SearchArea from "../../SearchArea/SearchArea";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../../actions";

function ComputerPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const search = useSelector((state: RootState) => state.search);

  React.useEffect(() => {
    dispatch(
      allActions.parametersActions.setParameters([
        { type: 1, id: 1, value: "מעבדה 1" },
        { type: 1, id: 2, value: "מעבדה 2" },
      ])
    );
  }, []);

  return (
    <div>
      {search.isOpen ? <SearchArea /> : null}
      <Cover />
      <ComputersList />
      <img src={Computer} alt="Computer" className={classes.image} />
    </div>
  );
}

export default ComputerPage;
