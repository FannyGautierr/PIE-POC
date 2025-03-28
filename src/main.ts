import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { createWebHistory, createRouter } from 'vue-router'

import Artists from './pages/Artists.vue';
import Artist from './pages/Artist.vue';
import LabelRegistration from './pages/LabelRegistration.vue';
import LabelDashboard from './pages/LabelDashboard.vue';

const routes = [
  { path: '/', component: Artists },
  { path: '/artist/:id', component: Artist },
  { path: '/label-registration', component: LabelRegistration },
  { path: '/label-dashboard', component: LabelDashboard },
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App)
  .use(router)
  .mount('#app')
