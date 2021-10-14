export default {
  async contactMentor(context, formData) {
    const response = await fetch(
      `https://http-demo-ef3a0-default-rtdb.europe-west1.firebasedatabase.app/requests/${formData.mentorId}.json`,
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
      `https://http-demo-ef3a0-default-rtdb.europe-west1.firebasedatabase.app/requests/${mentorId}.json?auth=${token}`
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to send request.'
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
