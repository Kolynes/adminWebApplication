import { RouteConfig } from "vue-router";

export default [
  {
    path: "/dashboard/customers",
    component: () =>
      import("@/modules/customers/views/customers/Customers.vue"),
    props: route => route.query,
  },
  {
    path: "/dashboard/customers/details",
    component: () =>
      import("@/modules/customers/views/customer-details/CustomerDetails.vue"),
    props: route => route.query
  }
] as RouteConfig[];