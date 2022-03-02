import { RouteConfig } from "vue-router";

export default [
  {
    path: "/login",
    component: () =>
      import("@/modules/auth/views/login/Login.vue"),
    props: route => route.query
  },
  {
    path: "/signup",
    component: () =>
      import("@/modules/auth/views/practitioner-sign-up/PractitionerSignUp"),
    props: route => route.query
  },
] as RouteConfig[];