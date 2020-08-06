const setComputers = (computersObj: any) => {
  return {
    type: "SET_COMPUTERS",
    payload: computersObj,
  };
};

export default {
  setComputers,
};
