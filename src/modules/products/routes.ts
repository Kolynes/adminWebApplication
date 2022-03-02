import { RouteConfig } from "vue-router";
import { EProductTypes } from "./types";

export default [
  {
    path: "/dashboard/drugs",
    component: () =>
      import("@/modules/products/views/products/Products.vue"),
    props: route => {
      route.query.type = EProductTypes.drug;
      return route.query;
    },
  },
  {
    path: "/dashboard/drugs/details",
    component: () =>
      import("@/modules/products/views/product-details/ProductDetails.vue"),
    props: route => {
      route.query.type = EProductTypes.drug;
      return route.query;
    }
  },
  {
    path: "/dashboard/equipment",
    component: () =>
      import("@/modules/products/views/products/Products.vue"),
    props: route => {
      route.query.type = EProductTypes.equipment;
      return route.query;
    },
  },
  {
    path: "/dashboard/equipment/details",
    component: () =>
      import("@/modules/products/views/product-details/ProductDetails.vue"),
    props: route => {
      route.query.type = EProductTypes.equipment;
      return route.query;
    }
  },
] as RouteConfig[];