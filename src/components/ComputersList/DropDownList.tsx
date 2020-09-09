import React from "react";
import { useSelector } from "react-redux";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import useStyles from "./DropDownList.style";

type DropDownListProps = {
  type: number;
  disableSelect?: boolean;
  value: number;
  setValue: (newValue: number) => void;
};

function DropDownList({
  type,
  disableSelect,
  value,
  setValue,
}: DropDownListProps) {
  const values = useSelector((state: RootState) => state.parameterData)[
    type - 1
  ]?.systemData;
  const classes = useStyles();

  return (
    <FormControl variant="outlined" margin="dense" className={classes.root}>
      <Select
        disabled={disableSelect}
        value={value == null ? "" : value}
        onChange={(event) => setValue(event.target.value as number)}
      >
        {values.map((val) => (
          <MenuItem key={val.id + val.value} value={val.id}>
            {val.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default DropDownList;
