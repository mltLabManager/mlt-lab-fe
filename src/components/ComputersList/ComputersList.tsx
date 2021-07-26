import React from "react";
import ComputerRow from "./ComputerRow";
import ComputerTitle from "./ComputerTitle";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../actions";
import useStyles from "./ComputersList.style";
import {
  AppBar,
  ThemeProvider,
  Tabs,
  Tab,
  createMuiTheme,
  Grid,
  TextField,
  Typography,
  Box,
  Chip,
  Select,
  Input,
  FormControl,
  InputLabel,
  MenuItem,
  InputBase,
} from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import AccountCircle from "@material-ui/icons/AccountCircle";

const TabTheme = createMuiTheme({
  direction: "rtl", // Both here and <body dir="rtl">
  palette: {
    type: "light",
    primary: {
      light: "#a6d4fa",
      main: "#0F7D6A",
      dark: "#648dae",
    },
    secondary: {
      light: "#f6a5c0",
      main: "#93dcbf",
      dark: "#aa647b",
    },
  },
  typography: {
    fontFamily: "Arimo",
  },
});

const cardTheme = createMuiTheme({
  direction: "rtl", // Both here and <body dir="rtl">
  // palette: {
  //   primary: {
  //     main: "#342ead",
  //   },
  // },
  // typography: {
  //   fontFamily: "Assistant",
  // },
});

function ComputersList() {
  const dispatch = useDispatch();
  const classes = useStyles();
  var theme = cardTheme;
  const search = useSelector((state: RootState) => state.search);
  let computers = useSelector((state: RootState) => state.computers);
  let computersState = useSelector((state: RootState) => state.computers);
  const values = useSelector((state: RootState) => state.parameterData);
  const [value, setValue] = React.useState(0);
  const [orderNum, setOrderNum] = React.useState<string>("");
  const [originalState, setOriginalState] = React.useState<RootState["computers"]>(computers);
  const [location, setLocation] = React.useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = React.useState<string[]>([]);
  const [item, setItem] = React.useState<string[]>([]);
  const [startDate, setStartDate] = React.useState<Date | null>(new Date());
  const [endDate, setendDate] = React.useState<Date | null>(new Date());
  const [selectedDateF, setSelectedDateF] = React.useState<Date | null>();
  const [selectedDateT, setSelectedDateT] = React.useState<Date | null>();
  const computersTypes = Array.from(new Set(computers.map((x) => x.computerType))).map((id) => {
    return {
      id: Number(id),
      computerType: id ? values[2].systemData.find((val) => id.toString() === val.id.toString())?.value : 0,
    };
  });
  const locations = Array.from(new Set(computers.map((x) => x.currentLocation))).map((id) => {
    return {
      id: Number(id),
      location: id ? values[0].systemData.find((val) => id.toString() === val.id.toString())?.value : 0,
    };
  });
  const statuses = Array.from(new Set(computers.map((x) => x.currentStatus))).map((id) => {
    return {
      id: Number(id),
      status: id ? values[1].systemData.find((val) => id.toString() === val.id.toString())?.value : 0,
    };
  });

  interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: any;
    value: any;
  }

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

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`action-tabpanel-${index}`}
        aria-labelledby={`action-tab-${index}`}
        {...other}>
        {value === index && <Box p={2}>{children}</Box>}
      </Typography>
    );
  }

  const handleChange = (event: any, newValue: number) => {
    //Clear filter
    if (newValue === 5) {
      setOrderNum("");
      setSelectedStatus([]);
      setItem([]);
      setLocation([]);
      setSelectedDateF(undefined);
      setSelectedDateT(undefined);
    }
    setValue(newValue);
  };

  const handleChangeItem = (event: React.ChangeEvent<{ value: unknown }>) => {
    console.log(event);
    setItem(event.target.value as string[]);
  };

  const handleChangeLocation = (event: React.ChangeEvent<{ value: unknown }>) => {
    console.log(event);
    setLocation(event.target.value as string[]);
  };

  const handleChangeStatus = (event: React.ChangeEvent<{ value: unknown }>) => {
    console.log(event);
    setSelectedStatus(event.target.value as string[]);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const handleOrderNumChange = (event: any) => {
    setOrderNum(event.target.value);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDateF(date);
  };

  const handleDateChangeT = (date: Date | null) => {
    setSelectedDateT(date);
  };
  const handleComputerChange = (id: number) => {
    console.log(id);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    if (selectedDateF === undefined) {
      setSelectedDateF(
        new Date(
          Math.min.apply(
            null,
            computers.map((data) => {
              return Number(new Date(data.lastUpdateDate));
            })
          )
        )
      );
      setSelectedDateT(
        new Date(
          Math.max.apply(
            null,
            computers.map((data) => {
              return Number(new Date(data.lastUpdateDate));
            })
          )
        )
      );
      setStartDate(
        new Date(
          Math.min.apply(
            null,
            computers.map((data) => {
              return Number(new Date(data.lastUpdateDate));
            })
          )
        )
      );
      setendDate(
        new Date(
          Math.max.apply(
            null,
            computers.map((data) => {
              return Number(new Date(data.lastUpdateDate));
            })
          )
        )
      );
    }
  });

  React.useEffect(() => {
    if (selectedDateF && selectedDateT) {
      setOriginalState(
        computers.filter(
          (computer) =>
            computer.id.toString().includes(orderNum) &&
            (selectedStatus.length > 0
              ? selectedStatus.includes(
                  values[1].systemData
                    .find((val) => Number(computer.currentStatus).toString() === val.id.toString())
                    ?.value.toString()!
                )
              : true) &&
            (item.length > 0
              ? item.includes(
                  values[2].systemData
                    .find((val) => Number(computer.computerType).toString() === val.id.toString())
                    ?.value.toString()!
                )
              : true) &&
            (location.length > 0
              ? location.includes(
                  values[0].systemData
                    .find((val) => Number(computer.currentLocation).toString() === val.id.toString())
                    ?.value.toString()!
                )
              : true) &&
            new Date(computer.lastUpdateDate) >= selectedDateF &&
            new Date(computer.lastUpdateDate) <= selectedDateT
        )
      );
    }
  }, [orderNum, selectedStatus, item, location, selectedDateF, selectedDateT]);

  return (
    <div>
      <div id="filterList">
        <ThemeProvider theme={TabTheme}>
          <AppBar position="static" color="primary">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="scrollable"
              aria-label="action tabs example">
              <Tab label="מ.סידורי" />
              <Tab label="פריט" />
              <Tab label="מיקום" />
              <Tab label="סטטוס" />
              <Tab label="ת.עדכון" />
              <Tab
                label="ניקוי סינונים"
                style={{
                  backgroundColor: "#3e3e3e",
                  color: "white",
                  fontWeight: "bolder",
                }}
              />
            </Tabs>
          </AppBar>
        </ThemeProvider>
        <SwipeableViews
          axis="x-reverse"
          index={value}
          onChangeIndex={handleChangeIndex}
          style={{ backgroundColor: "whitesmoke" }}>
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className={classes.margin}>
              <Grid container spacing={1} alignItems="flex-end">
                {/* <Grid item>
                  <TextField
                    label="סנן לפי מ.סידורי"
                    value={orderNum}
                    // focused
                    type="string"
                    autoFocus={true}
                    style={{ textAlign: "center" }}
                    // inputProps={{ min: 0, style: { textAlign: "center" } }} // the change is here
                    onChange={(event) => handleOrderNumChange(event)}
                  />
                </Grid> */}
                {/* <Grid item>
                  <AccountCircle />
                </Grid> */}
                <Grid item>
                  {/* <input
                    id="input-with-icon-grid"
                    // label="סנן לפי מ.סידורי"
                    autoFocus={true}
                    value={orderNum}
                    onChange={(event) => handleOrderNumChange(event)}
                  /> */}
                  <Input
                    autoFocus={true}
                    value={orderNum}
                    onChange={(event) => handleOrderNumChange(event)}
                    placeholder="מס. סידורי"
                    inputProps={{ "aria-label": "description" }}
                  />
                </Grid>
              </Grid>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <FormControl className={classes.formControl}>
              <InputLabel>בחר פריט</InputLabel>
              <Select
                multiple
                value={item}
                onChange={handleChangeItem}
                input={<Input />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {(selected as string[]).map((value) => (
                      <Chip key={value} label={value} className={classes.chip} />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}>
                {computersTypes.map((item) => (
                  <MenuItem key={item.id} value={item.computerType}>
                    {item.computerType}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <FormControl className={classes.formControl}>
              <InputLabel>בחר מיקום</InputLabel>
              <Select
                multiple
                value={location}
                onChange={handleChangeLocation}
                input={<Input />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {(selected as string[]).map((value) => (
                      <Chip key={value} label={value} className={classes.chip} />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}>
                {locations.map((location) => (
                  <MenuItem key={location.id} value={location.location}>
                    {location.location}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            <FormControl className={classes.formControl}>
              <InputLabel>בחר סטטוס</InputLabel>
              <Select
                multiple
                value={selectedStatus}
                onChange={handleChangeStatus}
                input={<Input />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {(selected as string[]).map((value) => (
                      <Chip key={value} label={value} className={classes.chip} />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}>
                {statuses.map((status) => (
                  <MenuItem key={status.id} value={status.status}>
                    {status.status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </TabPanel>
          <TabPanel value={value} index={4} dir={theme.direction}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  className={classes.dataPicker}
                  margin="normal"
                  label="מתאריך"
                  format="dd/MM/yyyy"
                  value={selectedDateF}
                  maxDate={endDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  okLabel="אישור"
                  cancelLabel="ביטול"
                />

                <KeyboardDatePicker
                  className={classes.dataPicker}
                  margin="normal"
                  label="לתאריך"
                  format="dd/MM/yyyy"
                  value={selectedDateT}
                  minDate={startDate}
                  onChange={handleDateChangeT}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  okLabel="אישור"
                  cancelLabel="ביטול"
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </TabPanel>
        </SwipeableViews>
      </div>
      <ComputerTitle />
      <div className={classes.list}>
        {originalState
          .filter((check) => {
            return check.id.toString().includes(search.text);
          })
          .map((computer) => (
            <ComputerRow key={computer.id} data={computer} />
          ))}
      </div>
    </div>
  );
}

export default ComputersList;
