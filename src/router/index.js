import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import Covid from '../views/Covid'
import CovidSearch from '../views/CovidSearch'
import Country from '../views/CountryInfo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Covid',
    component: Covid
  },
  {
    path: '/covid/search',
    name: 'CovidSearch',
    component: CovidSearch
  },
  {
    path: '/covid/:code',
    name: 'Country',
    component: Country
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
