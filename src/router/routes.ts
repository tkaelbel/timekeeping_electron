import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Timekeeping.vue') },
      {
        path: 'configuration',
        component: () => import('pages/Configuration.vue'),
      },
      {
        path: 'timecalculator',
        component: () => import('pages/TimeCalculator.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
