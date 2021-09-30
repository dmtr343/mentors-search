import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
  namespaced: true,
  state() {
    return {
      mentors: [
        {
          id: 'm1',
          firstName: 'John',
          lastName: 'Smith',
          areas: ['frontend', 'backend'],
          description:
            "I'm John, I have been working as a freelancer for several years and have enough experience to help you refactor your code and give advice on how to avoid possible errors in your code.",
          hourlyRate: 35,
        },
        {
          id: 'm2',
          firstName: 'Sarah',
          lastName: 'Jones',
          areas: ['frontend', 'career', 'soft skills'],
          description:
            'I am a developer in a large company, and I can guide you in the right direction in your development in the front-end area, as well as give you help with employment.',
          hourlyRate: 30,
        },
      ],
    };
  },
  mutations,
  actions,
  getters,
};
