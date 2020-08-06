const computers = (state = [], action: { type: any; payload: any }) => {
  switch (action.type) {
    case "SET_COMPUTERS":
      return action.payload;
    default:
      return state;
  }
};

export default computers;
