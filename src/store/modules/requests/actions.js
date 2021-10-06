export default {
  async contactMentor(context, formData) {
    const newRequest = {
      userEmail: formData.userEmail,
      userMessage: formData.userMessage,
    };

    const response = await fetch(
      `https://http-demo-ef3a0-default-rtdb.europe-west1.firebasedatabase.app/requests/${newRequest.mentorId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest),
      }
    );

    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to send request.'
      );
      throw error;
    }

    newRequest.id = responseData.name;
    newRequest.mentorId = formData.mentorId;

    context.commit('addRequest', newRequest);
  },
  async loadRequests(context) {
    const mentorId = context.rootGetters.getUserId;
    const response = await fetch(
      `https://http-demo-ef3a0-default-rtdb.europe-west1.firebasedatabase.app/requests/${mentorId}.json`
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
