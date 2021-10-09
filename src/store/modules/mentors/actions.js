export default {
  async addMentor(context, formData) {
    const userId = context.rootGetters.getUserId;
    const mentorData = {
      ld: userId,
      ...formData,
    };

    const token = context.rootGetters.getToken;

    const response = await fetch(
      `https://http-demo-ef3a0-default-rtdb.europe-west1.firebasedatabase.app/mentors/${userId}.json?auth=${token}`,
      {
        method: 'PUT',
        body: JSON.stringify(mentorData),
      }
    );

    //const responseData = await response.json();

    if (!response.ok) {
      // error...
    }

    context.commit('addMentor', mentorData);
  },
  async loadMentors(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await fetch(
      `https://http-demo-ef3a0-default-rtdb.europe-west1.firebasedatabase.app/mentors.json`
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to load data.');
      throw error;
    }

    const mentors = [];

    for (const key in responseData) {
      const mentor = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
      };
      mentors.push(mentor);
    }
    context.commit('setMentors', mentors);
    context.commit('setFetchTimestamp');
  },
};
