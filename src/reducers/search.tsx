const search = (state = { isOpen: false, text: "" }, action: { type: any; payload: any }) => {
  switch (action.type) {
    case "SET_SEARCH":
      return action.payload;
    case "TOGGLE_SEARCH":
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    default:
      return state;
  }
};

export default search;
