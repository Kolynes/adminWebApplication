import { RouteConfig } from "vue-router";
import { EUserType } from "../auth/types";

export default [
  {
    path: "/dashboard/admins",
    component: () =>
      import("@/modules/admins/views/admins/Admins.vue"),
    props: route => route.query,
    meta: { requiredUserTypes: [EUserType.admin] }
  },
  {
    path: "/dashboard/admins/details",
    component: () =>
      import("@/modules/admins/views/admin-details/AdminDetails.vue"),
    props: route => route.query,
    meta: { requiredUserType: [EUserType.admin] }
  },
] as RouteConfig[];