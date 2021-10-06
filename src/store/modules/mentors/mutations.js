export default {
  addMentor(state, mentorData) {
    state.mentors.push(mentorData);
  },
  setMentors(state, mentors) {
    state.mentors = mentors;
  },
};
