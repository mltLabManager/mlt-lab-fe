import React from "react";
import ComputerRow from "./ComputerRow";
import ComputerTitle from "./ComputerTitle";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../actions";
import useStyles from "./ComputersList.style";

function ComputersList() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const search = useSelector((state: RootState) => state.search);
  const [listOffset, setListOffset] = React.useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    setListOffset(
      document.getElementById("TitleList")
        ? document.getElementById("navbar")!.offsetHeight +
            document.getElementById("cover")!.offsetHeight +
            document.getElementById("TitleList")!.offsetHeight
        : 0
    );
  });

  return (
    <div>
      <ComputerTitle />
      <div style={{ height: window.innerHeight - listOffset }} className={classes.list}>
        {useSelector((state: RootState) => state.computers)
          .filter((check) => {
            return check.id.toString().includes(search.text) || check.oldId.toString().includes(search.text);
          })
          .map((computer) => (
            <ComputerRow key={computer.id} data={computer} />
          ))}
      </div>
    </div>
  );
}

export default ComputersList;
