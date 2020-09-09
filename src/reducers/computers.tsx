const computers = (state = [], action: { type: any; payload: any; index: any }) => {
  switch (action.type) {
    case "SET_COMPUTERS":
      return action.payload;
    case "CHANGE_COMPUTER":
      const index = state.findIndex(({ id }) => id === action.payload.id);
      return [...state.slice(0, index), action.payload, ...state.slice(index + 1)];
    case "ADD_COMPUTERS":
      return state.concat(action.payload);
    default:
      return state;
  }
};

export default computers;
