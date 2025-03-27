import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { createWebHistory, createRouter } from 'vue-router'
import Home from './pages/Home.vue';
import Artists from './pages/Artists.vue';
import Artist from './pages/Artist.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/artists', component: Artists },
  { path: '/artist/:id', component: Artist },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App)
  .use(router)
  .mount('#app')
