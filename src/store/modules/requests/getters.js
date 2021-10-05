export default {
  getRequests(state, getters, rootState, rootGetters) {
    const mentorId = rootGetters.getUserId;
    return state.requests.filter((req) => req.mentorId === mentorId);
  },
  hasRequests(state, getters) {
    return getters.getRequests.length > 0;
  },
};
