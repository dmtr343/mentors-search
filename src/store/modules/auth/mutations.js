export default {
  setUser(state, userData) {
    state.token = userData.token;
    state.userId = userData.userId;
  },
  setLogoutTimerId(state, timerId) {
    state.logoutTimerId = timerId;
  },
};
