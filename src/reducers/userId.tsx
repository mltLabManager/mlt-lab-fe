const currentUser = (state = "", action: { type: any; payload: any }) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    default:
      return state;
  }
};

export default currentUser;
