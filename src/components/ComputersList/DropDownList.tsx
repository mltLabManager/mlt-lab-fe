import React from "react";
import { useSelector } from "react-redux";
import { FormControl, Select, MenuItem } from "@material-ui/core";

type DropDownListProps = {
  type: number;
  value: number;
  setValue: (newValue: number) => void;
};

function DropDownList({ type, value, setValue }: DropDownListProps) {
  const values = useSelector((state: RootState) => state.parameters).filter((parameter) => parameter.type === type);
  return (
    <FormControl variant="outlined" margin="dense">
      <Select
        value={value == null ? "" : value}
        onChange={(event) => setValue(event.target.value as number)}
        label="Age"
      >
        {values.map((val) => (
          <MenuItem key={val.id} value={val.id}>
            {val.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default DropDownList;
