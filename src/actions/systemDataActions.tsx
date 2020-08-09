const setSystemData = (systemDataObj: any) => {
  return {
    type: "SET_SYSTEM_DATA",
    payload: systemDataObj,
  };
};

export default {
  setSystemData,
};
