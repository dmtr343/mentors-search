export default {
  addMentor(context, formData) {
    const mentorData = {
      id: context.rootGetters.getUserId,
      ...formData,
    };
    context.commit('addMentor', mentorData);
  },
};
