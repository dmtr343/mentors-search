export default {
  contactMentor(context, formData) {
    const newRequest = {
      requestId: new Date().toISOString(),
      ...formData,
    };
    context.commit('addRequest', newRequest);
  },
};
