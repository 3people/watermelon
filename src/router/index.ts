import { createRouter, createWebHistory } from 'vue-router'
import PlayPage from '../pages/play/PlayPage.vue'
import RankPage from '../pages/rank/RankPage.vue'
import DevHomePage from '../event-pages/home/DevHomePage.vue'

const routes = [
  {
    path: '/',
    component: DevHomePage,
  },
  {
    path: '/play',
    component: PlayPage,
  },
  {
    path: '/rank',
    component: RankPage,
  },
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
})

export default router
