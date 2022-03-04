import Vue from 'vue'
import Router from 'vue-router'
import authRoutes from "@/modules/auth/routes";
import dashboardRoutes from "@/modules/dashboard/routes";
import ServiceProvider from './utils/services/ServiceProvider';
import { IStoreService } from './services/types';
import { EServices } from './types';


Vue.use(Router)

const store = ServiceProvider.getInstance().getService<IStoreService>(EServices.store);

const router = new Router({
  mode: 'history',
  base: "",
  routes: [
    { 
      path: "/", 
      component: () => 
        import("@/views/splash/Splash.vue"), 
      props: route => route.query
    },
    ...authRoutes,
    ...dashboardRoutes
  ],
  scrollBehavior: (to, from, savedPosition) => {
    return { x: 0, y: 0 }
  }
});

router.beforeEach((to, from, next) => {
  var requiresAuth;
  var requiredUserTypes = new Set;
  var excludedUserTypes = new Set;
  var requiredUserSubTypes = new Set;
  var excludedUserSubTypes = new Set;

  to.matched.forEach((record) => {
    requiresAuth = record.meta.requiresAuth;

    record.meta.requiredUserTypes &&
      record.meta.requiredUserTypes.forEach((el: any) => requiredUserTypes.add(el));
    
    record.meta.requiredUserSubTypes &&
      record.meta.requiredUserSubTypes.forEach((el: any) => requiredUserSubTypes.add(el));

    record.meta.excludedUserTypes && 
      record.meta.excludedUserTypes.forEach((el: any) => excludedUserTypes.add(el));

    record.meta.excludedUserSubTypes &&
      record.meta.excludedUserSubTypes.forEach((el: any) => excludedUserSubTypes.add(el));
  });
  
  if(!requiresAuth) next();
  else if(!store.accountModule.account) next("/login");
  else if(
    requiredUserTypes.has(store.accountModule.account.userType) ||
    !excludedUserTypes.has(store.accountModule.account.userType)
  ) {
    if(
      requiredUserSubTypes.has(store.accountModule.account.userSubType) ||
      !excludedUserSubTypes.has(store.accountModule.account.userSubType)
    ) next();
    else next("/404");
  }
  else next("/404");
})

export default router;
