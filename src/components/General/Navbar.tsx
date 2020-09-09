import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  DialogTitle,
  Dialog,
  Typography,
  Grid,
  TextField,
  Button,
  Snackbar,
} from "@material-ui/core";
import Logo from "../../assets/icons/Logo.png";
import useStyles from "./Navbar.style";
import SearchIcon from "../../assets/icons/search.png";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../actions";
import SearchArea from "../SearchArea/SearchArea";
import { ReactComponent as Item } from "../../assets/icons/reciveItem.svg";
import { ReactComponent as CreateDelivery } from "../../assets/icons/createDelivery.svg";
import ComputerDataService from "../../services/ComputerData";
import Alert from "@material-ui/lab/Alert";
import QrReader from "react-qr-reader";

function Navbar() {
  const classes = useStyles();
  const { pathname } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const search = useSelector((state: RootState) => state.search);
  const [showError, setShowError] = React.useState(false);

  const logoClick = () => {
    history.push("/computers");
  };

  const searchClick = () => {
    dispatch(allActions.searchActions.toggleSearch());
    history.push("/computers");
  };

  const [activeBtn, setActiveBtn] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [showCamera, setShowCamera] = React.useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPhone("");
  };

  const validatePhone = () => {
    if (+phone.toString().length < 7 || !Number(phone)) {
      return false;
    }
    return true;
  };

  const createSender = async () => {
    if (validatePhone()) {
      dispatch(allActions.deliveryActions.setPhoneNumber(phone));
      await loadDeliveryData(phone);
      history.push(`/delivery/${true}`);
      handleClose();
    } else {
      setShowError(true);
    }
  };

  const returnNumberFromUrl = (url: string) => {
    if (url.toString().length === 10) {
      return url;
    } else if (url.toString().length > 10) {
      return url.substring(url.toString().length - 10);
    }
  };

  const createSenderByQRCODE = async (data: any) => {
    let phoneNumber: string | undefined;
    if (data) {
      // Selects the phone number from url of QRCODE
      phoneNumber = returnNumberFromUrl(data);

      if (phoneNumber) {
        dispatch(allActions.deliveryActions.setPhoneNumber(phoneNumber));
        await loadDeliveryData(phoneNumber);
      }
      history.push(`/delivery/${true}`);
      handleClose();
    }
  };

  const loadDeliveryData = async (phoneNumber: string) => {
    Promise.all([
      ComputerDataService.getDeliveryData({ phone: phoneNumber, password: "" }),
    ])
      .then((values) => {
        let deliveryJsonLines: DeliveryJsonLineType[] = values[0].deliveryJson;
        let deliveryLines: DeliveryRowType[] = [];
        console.log("deliveryJsonLines => ", deliveryJsonLines);
        deliveryJsonLines.forEach((deliveryJsonRow) => {
          let quantityOfProduct: number = deliveryJsonRow.quantity;
          let rowIndex: number = 0;
          while (quantityOfProduct > 0) {
            let deliveryLine: DeliveryRowType = {
              deliveryId: deliveryJsonRow.id,
              computerId: "",
              type: 0,
              donator: deliveryJsonRow.name,
              isMissing: false,
              rowIndex: rowIndex,
            };

            switch (deliveryJsonRow.basketType) {
              case "מסך":
                deliveryLine.type = 1;
                break;
              case "מחשב נייד":
                deliveryLine.type = 2;
                break;
              case "לפטופ":
                deliveryLine.type = 2;
                break;
              case "מחשב":
                deliveryLine.type = 3;
                break;
            }

            deliveryLines.push(deliveryLine);
            quantityOfProduct = quantityOfProduct - 1;
            rowIndex = rowIndex + 1;
          }
        });

        dispatch(allActions.deliveryActions.setDeliveryRows(deliveryLines));
      })
      .catch((error) => {
        console.log(error);
        // setShowError(true);
      });
  };

  const onShowCamera = () => {
    setShowCamera(true);
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  const videoConstraints = {
    facingMode: { exact: "environment" },
  };

  return (
    <React.Fragment>
      <AppBar
        position="sticky"
        className={classes.navbar}
        elevation={0}
        id="navbar"
      >
        {pathname !== "/" ? (
          <Toolbar style={{ justifyContent: "center" }}>
            <Grid container>
              <Grid item xs={2} className={classes.center}>
                <Item
                  style={{ height: "85%", width: "85%" }}
                  onClick={() => history.push(`/delivery`)}
                />
              </Grid>
              <Grid item xs={8} className={classes.center}>
                <img src={Logo} alt="Logo" onClick={logoClick} />
              </Grid>
              <Grid item xs={2} className={classes.center}>
                <CreateDelivery
                  style={{ height: "100%", width: "100%", fill: "#3955F6" }}
                  onClick={handleClickOpen}
                />
              </Grid>
            </Grid>
          </Toolbar>
        ) : null}
        {search.isOpen ? <SearchArea /> : null}
      </AppBar>
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes.dialog }}
      >
        <DialogTitle
          style={{
            backgroundColor: "#1757ff",
            color: "white",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          {"קליטת שליח"}
        </DialogTitle>
        <Grid container>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography style={{ color: "#3955F6" }}>הזנת פלאפון</Typography>
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <TextField
              className={classes.root}
              style={{
                backgroundColor: "white",
                border: "1px solid #3955F6",
                marginBottom: "16px",
              }}
              variant="outlined"
              margin="dense"
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
              type="number"
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{ textAlign: "center", marginBottom: "16px" }}
          >
            <Button
              className={classes.button}
              variant="contained"
              onClick={createSender}
            >
              יצירה
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              onClick={onShowCamera}
            >
              סריקה
            </Button>
            {showCamera && (
              <div>
                <QrReader
                  delay={300}
                  onError={handleError}
                  onScan={createSenderByQRCODE}
                  style={{ width: "100%" }}
                />
                {/* <a href={data} target="_blank">
                  {data}
                </a> */}
              </div>
            )}
          </Grid>
        </Grid>
      </Dialog>
      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={() => setShowError(false)}
      >
        <Alert severity="error">אופס! הוכנס מספר טלפון שגוי</Alert>
      </Snackbar>
    </React.Fragment>
  );
}

export default Navbar;
