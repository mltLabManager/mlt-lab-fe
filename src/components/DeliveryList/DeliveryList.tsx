import React from "react";
import DeliveryRow from "./DeliveryRow";
import DeliveryTitle from "./DeliveryTitle";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../actions";
import useStyles from "./DeliveryList.style";
import { Grid, Button, Snackbar, Typography, Fab, Backdrop, CircularProgress } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Alert from "@material-ui/lab/Alert";
import ComputerDataService from "../../services/ComputerData";
import { useHistory } from "react-router-dom";

import DropDownList from "../ComputersList/DropDownList";
interface DeliveryListProps {
  isPhone: boolean;
}

function DeliveryList({ isPhone }: DeliveryListProps) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const deliveries = useSelector((state: RootState) => state.delivery.rows);
  const courierPhoneNumber = useSelector((state: RootState) => state.delivery.phoneNumber);
  const [deliveriesData, setDeliveriesData] = React.useState<DeliveryRowType[]>([]);
  const [listOffset, setListOffset] = React.useState(0);
  const [isMessageShown, setIsMessageShown] = React.useState(false);
  const [errorMessageText, setErrorMessageText] = React.useState("");
  const [successMessageText, setSuccessMessageText] = React.useState("");
  const [statusDelivery, setStatusDelivery] = React.useState(1);
  const [locationDelivery, setLocationDelivery] = React.useState(1);
  const [newItem, setNewItem] = React.useState(false);
  const [isLoad, setIsLoad] = React.useState(false);
  let deliveryId = "";

  React.useEffect(() => {
    if (isPhone || newItem) {
      console.log("deliveries", deliveries);
      setDeliveriesData(deliveries);
    } else setDeliveriesData([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveries, isPhone]);

  const reportDeliveryReception = () => {
    setIsLoad(true);

    if (validateDeliveryRows()) {
      let saveDeliveryToDB: DeliveryRowType[] = [...deliveriesData];

      deliveriesData.forEach((data, index) => {
        saveDeliveryToDB[index].currentLocation = locationDelivery;
        saveDeliveryToDB[index].currentStatus = statusDelivery;
        deliveryId = saveDeliveryToDB[index].deliveryId;
      });

      (isPhone
        ? deliveryId == "truck"
          ? ComputerDataService.createDeliveryReception(saveDeliveryToDB)
          : ComputerDataService.reportDeliveryReception(saveDeliveryToDB, courierPhoneNumber)
        : ComputerDataService.createDeliveryReception(saveDeliveryToDB)
      )
        .then((result) => {
          console.log(result);
          dispatch(allActions.computersActions.addComputers(result.data));
          dispatch(allActions.deliveryActions.setDeliveryRows([]));
          setSuccessMessageText("דיווח הקליטה בוצע בהצלחה");
          setIsMessageShown(true);
          setIsLoad(false);
          setTimeout(() => history.push("/computers"), 2000);
        })
        .catch((error) => {
          setErrorMessageText("דיווח הקליטה נכשל, אנא נסו שנית");
          setIsMessageShown(true);
          setIsLoad(false);
        });
    } else {
      setIsLoad(false);
    }
  };

  const validateDeliveryRows = () => {
    let successfullDeliveryRows = true;
    deliveriesData.forEach((deliveryRow) => {
      if (successfullDeliveryRows) {
        if (deliveryRow.isMissing && deliveryRow.computerId) {
          setErrorMessageText("לא ניתן להזין מספר סידורי לפריט חסר");
          setIsMessageShown(true);
          successfullDeliveryRows = false;
        }
        if (!deliveryRow.isMissing && !deliveryRow.computerId) {
          setErrorMessageText("אנא הזינו מספר סידורי לפריט או סמנו אותו כחסר");
          setIsMessageShown(true);
          successfullDeliveryRows = false;
        }
      }
    });
    return successfullDeliveryRows;
  };
  const addNewRow = () => {
    setNewItem(true);
    setDeliveriesData([
      ...deliveriesData,
      { deliveryId: "", type: 1, provider: 1, isMissing: false, rowIndex: Date.now() } as DeliveryRowType,
    ]);
    dispatch(
      allActions.deliveryActions.setDeliveryRows([
        ...deliveriesData,
        { deliveryId: "", type: 1, provider: 1, isMissing: false, rowIndex: Date.now() } as DeliveryRowType,
      ])
    );
  };
  return (
    <div>
      <Grid container style={{ backgroundColor: "white", textAlign: "center", padding: "12px 0px" }}>
        <Grid item xs={6}>
          <Typography className={classes.inputTitle}>מיקום</Typography>
          <DropDownList
            type={1}
            value={locationDelivery}
            setValue={(newValue: number) => {
              setLocationDelivery(newValue);
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography className={classes.inputTitle}>סטטוס</Typography>
          <DropDownList
            type={2}
            value={statusDelivery}
            setValue={(newValue: number) => {
              setStatusDelivery(newValue);
            }}
          />
        </Grid>
      </Grid>

      {isPhone ? (
        <>
          <DeliveryTitle isPhone={true} />
          <div style={{ height: window.innerHeight - listOffset }} className={classes.list}>
            {deliveriesData.map((item) =>
              item.deliveryId !== "" ? (
                <DeliveryRow
                  key={item.deliveryId + item.rowIndex.toString()}
                  data={item}
                  isPhone={item.deliveryId !== ""}
                />
              ) : (
                <></>
              )
            )}
            {newItem ? (
              <div>
                <DeliveryTitle isPhone={false} />
                {deliveriesData.map((item) =>
                  item.deliveryId === "" ? (
                    <DeliveryRow
                      key={item.deliveryId + item.rowIndex.toString()}
                      data={item}
                      isPhone={item.deliveryId !== ""}
                    />
                  ) : (
                    <></>
                  )
                )}
              </div>
            ) : (
              <></>
            )}
            <Fab
              size="small"
              style={{ color: "#fff", backgroundColor: "#0f7d6a", margin: "24px 8px" }}
              onClick={addNewRow}>
              <AddIcon />
            </Fab>
            <Grid item xs={12} className={classes.reportDelivery}>
              <Button size="large" className={classes.button} variant="contained" onClick={reportDeliveryReception}>
                דיווח קליטה
              </Button>
            </Grid>
          </div>
        </>
      ) : (
        <>
          <DeliveryTitle isPhone={isPhone} />
          <div style={{ height: window.innerHeight - listOffset }} className={classes.list}>
            {deliveriesData.map((item) => (
              <DeliveryRow
                key={item.deliveryId + item.rowIndex.toString()}
                data={item}
                isPhone={item.deliveryId !== ""}
              />
            ))}
            <Fab
              size="small"
              style={{ color: "#fff", backgroundColor: "#0f7d6a", margin: "24px 8px" }}
              onClick={addNewRow}>
              <AddIcon />
            </Fab>
            <Grid item xs={12} className={classes.reportDelivery}>
              <Button size="large" className={classes.button} variant="contained" onClick={reportDeliveryReception}>
                דיווח קליטה
              </Button>
            </Grid>
          </div>
        </>
      )}
      <Snackbar
        open={isMessageShown}
        autoHideDuration={6000}
        onClose={() => {
          setIsMessageShown(false);
          setErrorMessageText("");
          setSuccessMessageText("");
        }}>
        <Alert severity={errorMessageText ? "error" : "success"}>
          <div style={{ paddingRight: "5px" }}>{errorMessageText ? errorMessageText : successMessageText}</div>
        </Alert>
      </Snackbar>
      <Backdrop className={classes.backdrop} open={isLoad}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default DeliveryList;
