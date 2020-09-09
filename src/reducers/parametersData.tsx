const parameterData = (state = [], action: { type: any; payload: any }) => {
  switch (action.type) {
    case "SET_PARAMETERS_DATA":
      return action.payload;
    default:
      return state;
  }
};

export default parameterData;
