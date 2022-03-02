import { RouteConfig } from "vue-router";
import { EProductTypes } from "../products/types";
import { EOrganizationTypes } from "./types";

export default [
  {
    path: "/dashboard/pharmacies",
    component: () =>
      import("@/modules/organizations/views/organizations/Organizations.vue"),
    props: route => {
      route.query.type = EOrganizationTypes.pharmacy
      return route.query
    },
  },
  {
    path: "/dashboard/pharmacies/details",
    component: () =>
      import("@/modules/organizations/views/organization-details/OrganizationDetails.vue"),
    props: route => {
      route.query.type = EOrganizationTypes.pharmacy
      return route.query
    }
  },
  {
    path: "/dashboard/pharmacies/products",
    component: () =>
      import("@/modules/organizations/views/organization-products/OrganizationProducts.vue"),
    props: route => {
      route.query.type = EProductTypes.drug
      return route.query
    }
  },
  {
    path: "/dashboard/oems",
    component: () =>
      import("@/modules/organizations/views/organizations/Organizations.vue"),
    props: route => {
      route.query.type = EOrganizationTypes.OEM
      return route.query
    }
  },
  {
    path: "/dashboard/oems/details",
    component: () =>
      import("@/modules/organizations/views/organization-details/OrganizationDetails.vue"),
    props: route => {
      route.query.type = EOrganizationTypes.OEM
      return route.query
    }
  },
  {
    path: "/dashboard/oems/products",
    component: () =>
      import("@/modules/organizations/views/organization-products/OrganizationProducts.vue"),
    props: route => {
      route.query.type = EProductTypes.equipment
      return route.query
    }
  },
] as RouteConfig[];