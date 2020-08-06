const setUser = (userObj: any) => {
  return {
    type: "SET_USER",
    payload: userObj,
  };
};

export default {
  setUser,
};
