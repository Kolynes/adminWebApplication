import { RouteConfig } from "vue-router";

export default [
  {
    path: "/dashboard/admins",
    component: () =>
      import("@/modules/admins/views/admins/Admins.vue"),
    props: route => route.query,
  },
  {
    path: "/dashboard/admins/details",
    component: () =>
      import("@/modules/admins/views/admin-details/AdminDetails.vue"),
    props: route => route.query
  },
] as RouteConfig[];