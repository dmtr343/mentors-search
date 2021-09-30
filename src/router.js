import { createRouter, createWebHistory } from 'vue-router';

import MentorsList from './pages/mentors/MentorsList.vue';
import MentorDetails from './pages/mentors/MentorDetails.vue';
import MentorRegistration from './pages/mentors/MentorRegistration.vue';
import MentorContact from './pages/mentors/MentorContact.vue';
import RequestsRecieved from './pages/requests/RequestsRecieved.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/mentors' },
        { path: '/mentors', component: MentorsList },
        {
            path: '/mentors/:id',
            component: MentorDetails,
            children: [
                { path: 'contact', component: MentorContact },
            ]
        },
        { path: '/register', component: MentorRegistration },
        { path: '/requests', component: RequestsRecieved },
        { path: '/:notFound(.*)', component: NotFound },
    ],
});

export default router;