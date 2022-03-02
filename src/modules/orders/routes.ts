import { RouteConfig } from "vue-router";

export default [
  {
    path: "/dashboard/orders",
    component: () =>
      import("@/modules/orders/views/orders/Orders.vue"),
    props: route => route.query,
  },
  {
    path: "/dashboard/orders/details",
    component: () =>
      import("@/modules/orders/views/order-details/OrderDetails.vue"),
    props: route => route.query
  }
] as RouteConfig[];