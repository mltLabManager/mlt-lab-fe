const systemData = (state = [], action: { type: any; payload: any }) => {
  switch (action.type) {
    case "SET_SYSTEM_DATA":
      return action.payload;
    default:
      return state;
  }
};

export default systemData;
