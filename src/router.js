import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', redirect: '/mentors' },
        { path: '/mentors', component: null },
        {
            path: '/mentors/:id',
            component: null,
            children: [
                { path: '/contact', component: null },
            ]
        },
        { path: '/register', component: null },
        { path: '/requests', component: null },
        { path: '/:notFound(.*)', component: null },
    ],
});

export default router;