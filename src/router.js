import { createRouter, createWebHistory } from 'vue-router';

import MentorsList from './pages/mentors/MentorsList.vue';
import NotFound from './pages/NotFound.vue';
import store from './store/index';

const MentorDetails = () => import('./pages/mentors/MentorDetails.vue');
const MentorRegistration = () =>
  import('./pages/mentors/MentorRegistration.vue');
const MentorContact = () => import('./pages/mentors/MentorContact.vue');
const UserAuth = () => import('./pages/auth/UserAuth.vue');
const RequestsRecieved = () => import('./pages/requests/RequestsRecieved.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/mentors' },
    { path: '/mentors', component: MentorsList },
    {
      path: '/mentors/:id',
      component: MentorDetails,
      props: true,
      children: [{ path: 'contact', component: MentorContact }],
    },
    {
      path: '/register',
      component: MentorRegistration,
      meta: { requiresAuth: true },
    },
    {
      path: '/requests',
      component: RequestsRecieved,
      meta: { requiresAuth: true },
    },
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/mentors');
  } else {
    next();
  }
});

export default router;
