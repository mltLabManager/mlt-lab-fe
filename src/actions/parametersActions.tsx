const setParametersData = (systemDataObj: any) => {
  return {
    type: "SET_PARAMETERS_DATA",
    payload: systemDataObj,
  };
};

export default {
  setParametersData,
};
