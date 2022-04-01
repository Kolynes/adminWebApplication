import { RouteConfig } from "vue-router";
import { EUserType } from "../auth/types";

export default [
  {
    path: "/dashboard/rides",
    component: () =>
      import("@/modules/rides/views/rides/Rides.vue"),
    props: route => route.query,
    meta: { requiredUserType: [EUserType.admin] }
  },
  {
    path: "/dashboard/rides/details",
    component: () =>
      import("@/modules/rides/views/ride-details/RideDetails.vue"),
    props: route => route.query,
    meta: { requiredUserType: [EUserType.admin] }
  },
] as RouteConfig[];