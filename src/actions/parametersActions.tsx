const setParameters = (parametersObj: any) => {
  return {
    type: "SET_PARAMETERS",
    payload: parametersObj,
  };
};

export default {
  setParameters,
};
