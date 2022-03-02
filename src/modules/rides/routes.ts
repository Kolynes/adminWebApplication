import { RouteConfig } from "vue-router";

export default [
  {
    path: "/dashboard/rides",
    component: () =>
      import("@/modules/rides/views/rides/Rides.vue"),
    props: route => route.query,
  },
  {
    path: "/dashboard/rides/details",
    component: () =>
      import("@/modules/rides/views/ride-details/RideDetails.vue"),
    props: route => route.query
  },
] as RouteConfig[];