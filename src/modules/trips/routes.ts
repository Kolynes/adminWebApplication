import { RouteConfig } from "vue-router";
import { EUserType } from "../auth/types";

export default [
  {
    path: "/dashboard/trips",
    component: () =>
      import("@/modules/trips/views/trips/Trips.vue"),
    props: route => route.query,
    meta: { requiredUserType: [EUserType.admin] }
  },
  {
    path: "/dashboard/trips/details",
    component: () =>
      import("@/modules/trips/views/trip-details/TripDetails.vue"),
    props: route => route.query,
    meta: { requiredUserType: [EUserType.admin] }
  }
] as RouteConfig[];