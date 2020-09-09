  const setPhoneNumber = (phoneObj: any) => {
    return {
      type: "SET_PHONE_NUMBER",
      payload: phoneObj,
    };
  };

  const setDeliveryRows = (deliveryObj: any) => {
    return {
      type: "SET_DELIVERY_ROWS",
      payload: deliveryObj,
    };
  };
  
const changeDelivery = (deliveryObj: any) => {
  return { 
    type: "CHANGE_DELIVERY",
    payload: deliveryObj,
  };
};

  export default {
    setPhoneNumber,
    setDeliveryRows,
    changeDelivery,
  };
  