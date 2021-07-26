import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  Toolbar,
  DialogTitle,
  Dialog,
  Typography,
  Grid,
  TextField,
  Button,
  Snackbar,
  Input,
  Select,
  MenuItem,
  Chip,
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
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { type } from "os";

function Navbar() {
  const classes = useStyles();
  const { pathname } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const search = useSelector((state: RootState) => state.search);
  const [showError, setShowError] = React.useState(false);
  const [value, setValue] = React.useState(1);
  const [activeBtn, setActiveBtn] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [serialFrom, setSerialFrom] = React.useState("");
  const [donatedBy, setDonatedBy] = React.useState("");
  const [amountOfComputers, setAmountOfComputers] = React.useState("");
  const [showCamera, setShowCamera] = React.useState<boolean>(false);
  const [item, setItem] = React.useState<number>(0);
  let computers = useSelector((state: RootState) => state.computers);
  const values = useSelector((state: RootState) => state.parameterData);
  const computersTypes = Array.from(new Set(computers.map((x) => x.computerType))).map((id) => {
    return {
      id: Number(id),
      computerType: id ? values[2].systemData.find((val) => id.toString() === val.id.toString())?.value : 0,
    };
  });

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const recieveTruck = () => {
    let truckDeliveryData: DeliveryRowType[] = [];

    let serialNum = serialFrom.substr(1);

    for (var i = 0; i < Number(amountOfComputers); i++) {
      let truckDeliveryRow: DeliveryRowType = {
        computerId: "W".concat(String(Number(serialNum) + i)),
        donator: donatedBy,
        // provider: 0,
        deliveryId: "truck",
        type: item,
        isMissing: false,
        rowIndex: 0,
      };
      truckDeliveryData.push(truckDeliveryRow);
    }

    console.log("truckDeliveryData ==> ", truckDeliveryData);
    dispatch(allActions.deliveryActions.setDeliveryRows(truckDeliveryData));
    history.push(`/delivery/${true}`);
    handleClose();

    // ComputerDataService.createDeliveryReception(truckDeliveryData)
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((err) => console.log(err));
  };

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}>
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: any) {
    return {
      id: `nav-tab-${index}`,
      "aria-controls": `nav-tabpanel-${index}`,
    };
  }

  const logoClick = () => {
    history.push("/computers");
  };

  const searchClick = () => {
    dispatch(allActions.searchActions.toggleSearch());
    history.push("/computers");
  };

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
    Promise.all([ComputerDataService.getDeliveryData({ phone: phoneNumber, password: "" })])
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

  useEffect(() => {
    document.getElementById("phoneNumberInput")?.focus();
  }, [phone]);

  useEffect(() => {
    document.getElementById("serialFromInput")?.focus();
  }, [serialFrom]);

  useEffect(() => {
    document.getElementById("amountOfComputersInput")?.focus();
  }, [amountOfComputers]);

  useEffect(() => {
    document.getElementById("donatedByInput")?.focus();
  }, [donatedBy]);

  return (
    <React.Fragment>
      <AppBar position="sticky" className={classes.navbar} elevation={0} id="navbar">
        {pathname !== "/" ? (
          <Toolbar style={{ justifyContent: "center" }}>
            <Grid container>
              <Grid item xs={2} className={classes.center}>
                <Item style={{ height: "85%", width: "85%" }} onClick={() => history.push(`/delivery`)} />
              </Grid>
              <Grid item xs={8} className={classes.center}>
                <img src={Logo} alt="Logo" onClick={logoClick} />
              </Grid>
              <Grid item xs={2} className={classes.center}>
                <CreateDelivery style={{ height: "100%", width: "100%", fill: "#3955F6" }} onClick={handleClickOpen} />
              </Grid>
            </Grid>
          </Toolbar>
        ) : null}
        {search.isOpen ? <SearchArea /> : null}
      </AppBar>
      <Dialog open={open} onClose={handleClose} classes={{ paper: classes.dialog }}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
            <Tab label="קליטת משאית" {...a11yProps(0)} />
            <Tab label="קליטת מתנדב" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Grid container>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Typography style={{ color: "#3955F6", direction: "rtl" }}>תחילת ספרור מ-</Typography>
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <TextField
                id="serialFromInput"
                className={classes.root}
                style={{
                  backgroundColor: "white",
                  border: "1px solid #3955F6",
                  marginBottom: "16px",
                }}
                variant="outlined"
                margin="dense"
                value={serialFrom}
                onChange={(event) => {
                  setSerialFrom(event.target.value);
                }}
                type="text"
                inputProps={{ className: "digitsOnly" }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Typography style={{ color: "#3955F6", direction: "rtl" }}>כמות לקליטה-</Typography>
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <TextField
                id="amountOfComputersInput"
                className={classes.root}
                style={{
                  backgroundColor: "white",
                  border: "1px solid #3955F6",
                  marginBottom: "16px",
                }}
                variant="outlined"
                margin="dense"
                value={amountOfComputers}
                onChange={(event) => {
                  setAmountOfComputers(event.target.value);
                }}
                type="number"
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Typography style={{ color: "#3955F6", direction: "rtl" }}>בחר פריט-</Typography>
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center", marginBottom: 20 }}>
              <Select
                style={{ width: 210 }}
                value={item}
                onChange={(event) => {
                  setItem(event.target.value as number);
                }}
                input={<Input />}
                // renderValue={(selected) => (
                //   <div className={classes.chips}>
                //     {(selected as string[]).map((value) => (
                //       <Chip key={value} label={value} className={classes.chip} />
                //     ))}
                //   </div>
                // )}
                MenuProps={MenuProps}>
                {computersTypes.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.computerType}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Typography style={{ color: "#3955F6", direction: "rtl" }}>נתרם על ידי-</Typography>
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <TextField
                id="donatedByInput"
                className={classes.root}
                style={{
                  backgroundColor: "white",
                  border: "1px solid #3955F6",
                  marginBottom: "16px",
                }}
                variant="outlined"
                margin="dense"
                value={donatedBy}
                onChange={(event) => {
                  setDonatedBy(event.target.value);
                }}
                type="text"
              />
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center", marginBottom: "16px" }}>
              <Button className={classes.button} variant="contained" onClick={recieveTruck}>
                קליטה
              </Button>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid container>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Typography style={{ color: "#3955F6" }}>הזנת פלאפון</Typography>
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <TextField
                id="phoneNumberInput"
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
            <Grid item xs={12} style={{ textAlign: "center", marginBottom: "16px" }}>
              <Button className={classes.button} variant="contained" onClick={createSender}>
                יצירה
              </Button>
              <Button className={classes.button} variant="contained" onClick={onShowCamera}>
                סריקה
              </Button>
              {showCamera && (
                <div>
                  <QrReader delay={300} onError={handleError} onScan={createSenderByQRCODE} style={{ width: "100%" }} />
                </div>
              )}
            </Grid>
          </Grid>
        </TabPanel>
      </Dialog>
      <Snackbar open={showError} autoHideDuration={6000} onClose={() => setShowError(false)}>
        <Alert severity="error">אופס! הוכנס מספר טלפון שגוי</Alert>
      </Snackbar>
    </React.Fragment>
  );
}

export default Navbar;
