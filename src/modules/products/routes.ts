import { RouteConfig } from "vue-router";
import { EUserType } from "../auth/types";
import { EOrganizationTypes } from "../organizations/types";
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
    meta: { 
      excludedUserTypes: [EUserType.practitioner], 
      excludedUserSubTypes: [EOrganizationTypes.OEM]
    }
  },
  {
    path: "/dashboard/drugs/details",
    component: () =>
      import("@/modules/products/views/product-details/ProductDetails.vue"),
    props: route => {
      route.query.type = EProductTypes.drug;
      return route.query;
    },
    meta: { 
      excludedUserTypes: [EUserType.practitioner], 
      excludedUserSubTypes: [EOrganizationTypes.OEM] 
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
    meta: { 
      excludedUserTypes: [EUserType.practitioner], 
      excludedUserSubTypes: [EOrganizationTypes.pharmacy]
    }
  },
  {
    path: "/dashboard/equipment/details",
    component: () =>
      import("@/modules/products/views/product-details/ProductDetails.vue"),
    props: route => {
      route.query.type = EProductTypes.equipment;
      return route.query;
    },
    meta: { 
      excludedUserTypes: [EUserType.practitioner], 
      excludedUserSubTypes: [EOrganizationTypes.pharmacy]
    }
  },
] as RouteConfig[];