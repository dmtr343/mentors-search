export default {
  getMentors(state) {
    return state.mentors;
  },
  hasMentors(state) {
    return state.mentors && state.mentors.length > 0;
  },
  isMentor(state, getters, rootState, rootGetters) {
    const mentors = getters.getMentors;
    const userId = rootGetters.getUserId;
    return mentors.some((mentor) => mentor.id === userId);
  },
  getLastFetchTime(state){
    return state.lastFetchTime;
  },
  shouldUpdate(state) {
    const lastFetchTime = state.lastFetchTime;
    if(!lastFetchTime){
      return true;
    }
    const currentTime = new Date().getTime();
    return (currentTime - lastFetchTime) / 1000 > 60;
  },
};
