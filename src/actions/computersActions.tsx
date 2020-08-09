const setComputers = (computersObj: any) => {
  return {
    type: "SET_COMPUTERS",
    payload: computersObj,
  };
};

const changeComputer = (computersObj: any) => {
  return {
    type: "CHANGE_COMPUTER",
    payload: computersObj,
  };
};

export default {
  setComputers,
  changeComputer,
};
