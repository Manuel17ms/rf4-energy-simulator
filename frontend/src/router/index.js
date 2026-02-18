import { createRouter, createWebHistory } from 'vue-router';
import LandingView from '../views/LandingView.vue';
import HomeView from '../views/HomeView.vue';
import ResultView from '../views/ResultView.vue';

const routes = [
  { path: '/', name: 'landing', component: LandingView },   
  { path: '/home', name: 'home', component: HomeView },      
  { path: '/result', name: 'result', component: ResultView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;


