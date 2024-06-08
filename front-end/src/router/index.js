import HelloWorld from '../components/HelloWorld.vue'

import {createRouter, createWebHistory} from 'vue-router'  

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HelloWorld,//should be imported 
   
  },
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
