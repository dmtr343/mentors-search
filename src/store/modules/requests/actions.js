export default {
  async contactMentor(context, formData) {
    const response = await fetch(
      `${process.env.VUE_APP_FIREBASE_URL}/requests/${formData.mentorId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(formData),
      }
    );

    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to send request.'
      );
      throw error;
    }

    const newRequest = {
      ...formData,
      id: responseData.name,
    };

    context.commit('addRequest', newRequest);
  },
  async loadRequests(context) {
    const mentorId = context.rootGetters.getUserId;
    const token = context.rootGetters.getToken;
    const response = await fetch(
      `${process.env.VUE_APP_FIREBASE_URL}/requests/${mentorId}.json?auth=${token}`
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to load requests.'
      );
      throw error;
    }

    const requests = [];

    for (const key in responseData) {
      const request = {
        id: key,
        mentorId: mentorId,
        userEmail: responseData[key].userEmail,
        userMessage: responseData[key].userMessage,
      };
      requests.push(request);
    }

    context.commit('setRequests', requests);
  },
};
