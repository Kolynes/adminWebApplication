import { RouteConfig } from "vue-router";
import { EUserType } from "../auth/types";

export default [
  {
    path: "/dashboard/orders",
    component: () =>
      import("@/modules/orders/views/orders/Orders.vue"),
    props: route => route.query,
    meta: { excludedUserTypes: [EUserType.practitioner] }
  },

  {
    path: "/dashboard/orders/details",
    component: () =>
      import("@/modules/orders/views/order-details/OrderDetails.vue"),
    props: route => route.query,
    meta: { excludedUserTypes: [EUserType.practitioner] }
  }
] as RouteConfig[];