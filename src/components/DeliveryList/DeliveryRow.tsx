import React, { useState, useEffect } from "react";
import { Typography, Grid, Checkbox, TextField, Select, MenuItem, FormControl } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import useStyles from "./ComputerRow.style";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../actions";
import DropDownList from "../ComputersList/DropDownList";

type DeliveryRowProps = {
  data: DeliveryRowType;
  isPhone: boolean;
};

function DeliveryRow({ data, isPhone }: DeliveryRowProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [deliveryData, setDeliveryData] = useState(data);
  const valuesType = useSelector((state: RootState) => state.parameterData)[2].systemData;
  //const valuesManuFacture = useSelector((state: RootState) => state.parameterData)[5].systemData;
  const computerType = useSelector((state: RootState) => state.parameterData)[2]?.systemData.find(
    (sys) => sys.id.toString() === data.type.toString()
  );
  const [editId, setEditId] = React.useState(false);

  useEffect(() => {
    setDeliveryData(data);
    console.log("deliveryData ", deliveryData);
  }, [data]);
  return (
    <Grid container className={classes.root}>
      <Grid
        item
        xs={4}
        onClick={() => {
          setEditId(true);
        }}>
        {!editId ? (
          <Typography className={classes.text} style={{ color: "lightgray" }}>
            מספר סידורי
          </Typography>
        ) : (
          <TextField
            style={{ marginRight: "5px", marginLeft: "5px" }}
            margin="dense"
            autoFocus
            variant="standard"
            value={deliveryData.computerId}
            onChange={(event) => {
              dispatch(allActions.deliveryActions.changeDelivery({ ...deliveryData, computerId: event.target.value }));
              // setDeliveryData({ ...deliveryData, computerId: event.target.value });
            }}
          />
        )}
      </Grid>
      <Grid item xs={3}>
        {isPhone ? (
          <Typography className={classes.text}>{computerType?.value || "לא זמין"}</Typography>
        ) : (
          <FormControl variant="standard" margin="dense" className={classes.dropDown}>
            <Select
              value={deliveryData?.type == null ? "" : deliveryData?.type}
              onChange={(event) =>
                //setDeliveryData({ ...deliveryData, type: event.target.value as number })
                dispatch(
                  allActions.deliveryActions.changeDelivery({ ...deliveryData, type: event.target.value as number })
                )
              }
              label="Type">
              {valuesType.map((val) => (
                <MenuItem key={val.id + val.value} value={val.id}>
                  {val.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Grid>
      <Grid item xs={3}>
        {isPhone ? (
          <Typography className={classes.text}>{data.donator}</Typography>
        ) : (
          <TextField
            style={{ marginRight: "5px", marginLeft: "5px" }}
            margin="dense"
            autoFocus
            placeholder="שם תורם"
            variant="standard"
            value={deliveryData.donator}
            onChange={(event) => {
              dispatch(allActions.deliveryActions.changeDelivery({ ...deliveryData, donator: event.target.value }));
              //setDeliveryData({ ...deliveryData, donator: event.target.value });
            }}
          />
        )}
      </Grid>
    </Grid>
  );
}

export default DeliveryRow;
