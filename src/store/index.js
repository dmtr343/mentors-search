import { createStore } from 'vuex';
import mentorsModule from './modules/mentors/index';
import requestsModule from './modules/requests/index';

const store = createStore({
  modules: {
    mentors: mentorsModule,
    requests: requestsModule,
  },
  state() {
    return {
      userId: '1',
    };
  },
  getters: {
    getUserId(state) {
      return state.userId;
    },
  },
});

export default store;
