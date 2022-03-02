import Vue from 'vue'
import Router from 'vue-router'
import authRoutes from "@/modules/auth/routes";

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: "",
  routes: [
    { 
      path: "/", 
      component: () => 
        import("@/views/splash/Splash.vue"), 
      props: route => route.query
    },
    ...authRoutes
  ],
  scrollBehavior: (to, from, savedPosition) => {
    return { x: 0, y: 0 }
  }
})
