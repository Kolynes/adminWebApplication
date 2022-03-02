import { RouteConfig } from "vue-router";

export default [
  {
    path: "/dashboard/trips",
    component: () =>
      import("@/modules/trips/views/trips/Trips.vue"),
    props: route => route.query
  },
  {
    path: "/dashboard/trips/details",
    component: () =>
      import("@/modules/trips/views/trip-details/TripDetails.vue"),
    props: route => route.query
  }
] as RouteConfig[];