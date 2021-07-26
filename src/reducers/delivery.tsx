const delivery = (state = { phoneNumber: "", rows: [] }, action: { type: any; payload: any }) => {
  switch (action.type) {
    case "SET_PHONE_NUMBER":
      return {
        ...state,
        phoneNumber: action.payload,
      };
    case "SET_DELIVERY_ROWS":
      return {
        ...state,
        rows: action.payload,
      };
    case "CHANGE_DELIVERY":
      const index = state.rows.findIndex(
        ({ deliveryId, rowIndex }) => deliveryId === action.payload.deliveryId && rowIndex === action.payload.rowIndex
      );
      return { ...state, rows: [...state.rows.slice(0, index), action.payload, ...state.rows.slice(index + 1)] };
    default:
      return state;
  }
};

export default delivery;
