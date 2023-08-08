import { createRouter, createWebHistory } from 'vue-router'
// @ts-ignore
import type { AppRouteConfig } from '@/shared/types/routeTypes';
// @ts-ignore
import middleware from './middleware'

const routes: AppRouteConfig[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: {
      title: `Sign-In | ${import.meta.env.VITE_APP_TITLE}`,
    },
    beforeEnter: middleware.guest,
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
    meta: {
      title: `Register | ${import.meta.env.VITE_APP_TITLE}`,
    },
    beforeEnter: middleware.guest,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
