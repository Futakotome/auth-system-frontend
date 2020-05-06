import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Manage from '../views/Manage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/manage',
    component: Manage,
    name: 'manage',
    children: []
  }
]

const router = new VueRouter({
  routes
})

export default router
