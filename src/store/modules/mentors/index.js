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
          firstName: 'Michael',
          lastName: 'Brown',
          areas: ['frontend'],
          description:
            'I am Michael, I can teach you the technologies used in the front-end and help you if you have any problems while designing the front-end.',
          hourlyRate: 35,
        },
        {
          id: 'm2',
          firstName: 'Robert',
          lastName: 'Anderson',
          areas: ['frontend', 'backend', 'career'],
          description:
            "I'm Robert, I am an experienced full stack developer, I will give you advice on choosing the best technologies for your project and help with the architecture ",
          hourlyRate: 45,
        },
        {
          id: 'm3',
          firstName: 'John',
          lastName: 'Smith',
          areas: ['backend'],
          description:
            "I'm John, I have been working as a freelancer for several years and have enough experience to help you refactor your code and give advice on how to make your code more stable.",
          hourlyRate: 30,
        },
        {
          id: 'm4',
          firstName: 'Sarah',
          lastName: 'Williams',
          areas: ['frontend', 'career'],
          description:
            'I am a Sarah and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
          hourlyRate: 35,
        },
      ],
    };
  },
  mutations,
  actions,
  getters,
};
