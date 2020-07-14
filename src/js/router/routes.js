import Companies from '~/pages/Companies/main.vue';
import Dashboard from '~/pages/Dashboard/main.vue';
import ForgotPassword from '~/pages/Auth/ForgotPassword.vue';
import Login from '~/pages/Auth/Login.vue';
import News from '~/pages/News/main.vue';
import NotFound from '~/pages/404/main.vue';
import PortsTerminals from '~/pages/PortsTerminals/main.vue';
import Register from '~/pages/Auth/Register.vue';
import ResetPassword from '~/pages/Auth/ResetPassword.vue';
import Services from '~/pages/Services/main.vue';
import Settings from '~/pages/Settings/main.vue';
import VesselForecasts from '~/pages/VesselForecasts/main.vue';
import Vessels from '~/pages/Vessels/main.vue';

export default [
    {
        path: '/',
        component: Dashboard,
        name: 'dashboard',
        meta: {
            title: 'Dashboad',
            requiresAuth: false,
        },
    },
    {
        path: '/news/:id?',
        component: News,
        name: 'news',
        meta: {
            title: 'News',
            requiresAuth: false,
        },
    },
    {
        path: '/vessel-forecasts/:id?',
        component: VesselForecasts,
        name: 'vessel-forecasts',
        meta: {
            title: 'Vessel Forecasts',
            requiresAuth: true,
        },
    },
    {
        path: '/liner-services/:id?',
        component: Services,
        name: 'services',
        meta: {
            title: 'Liner Services',
            requiresAuth: true,
        },
    },
    {
        path: '/ports-terminals/:id?',
        component: PortsTerminals,
        name: 'ports-terminals',
        meta: {
            title: 'Ports & Terminals',
            requiresAuth: true,
        },
    },
    {
        path: '/vessels/:id?',
        component: Vessels,
        name: 'vessels',
        meta: {
            title: 'Vessels',
            requiresAuth: true,
        },
    },
    {
        path: '/companies/:id?',
        component: Companies,
        name: 'companies',
        meta: {
            title: 'Companies',
            requiresAuth: true,
        },
    },
    {
        path: '/settings',
        component: Settings,
        name: 'settings',
        meta: {
            title: 'Settings',
            requiresAuth: true,
        },
    },
    {
        path: '/login',
        component: Login,
        name: 'login',
        meta: {
            title: 'Login',
            requiresAuth: false,
        },
    },
    {
        path: '/register',
        component: Register,
        name: 'register',
        meta: {
            title: 'Register',
            requiresAuth: false,
        },
    },
    {
        path: '/forgot-password',
        component: ForgotPassword,
        name: 'forgot-password',
        meta: {
            title: 'Register',
            requiresAuth: false,
        },
    },
    {
        path: '/reset-password',
        component: ResetPassword,
        name: 'reset-password',
        meta: {
            title: 'Reset password',
            requiresAuth: false,
        },
    },
    // CATCH ALL
    {
        path: '*',
        component: NotFound,
    },
];
