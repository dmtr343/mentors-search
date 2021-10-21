export default {
  getUserId(state) {
    return state.userId;
  },
  getToken(state) {
    return state.token;
  },
  isAuthenticated(state) {
    return !!state.token;
  },
  getLogoutTimerId(state) {
    return state.logoutTimerId;
  },
};
