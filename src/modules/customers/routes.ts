import { RouteConfig } from "vue-router";
import { EUserType } from "../auth/types";

export default [
  {
    path: "/dashboard/customers",
    component: () =>
      import("@/modules/customers/views/customers/Customers.vue"),
    
    props: route => route.query,
    meta: { requiredUserTypes: [EUserType.admin]}
  },
  {
    path: "/dashboard/customers/details",
    component: () =>
      import("@/modules/customers/views/customer-details/CustomerDetails.vue"),
    props: route => route.query,
    meta: { requiredUserTypes: [EUserType.admin]}
  }
] as RouteConfig[];