const setSearch = (userObj: any) => {
  return {
    type: "SET_SEARCH",
    payload: userObj,
  };
};

const toggleSearch = () => {
  return {
    type: "TOGGLE_SEARCH",
  };
};

export default {
  setSearch,
  toggleSearch,
};
