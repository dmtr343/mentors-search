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
};
