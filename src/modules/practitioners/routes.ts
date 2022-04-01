import { RouteConfig } from "vue-router";
import { EUserType } from "../auth/types";
import { EPractitionerTypes } from "./types";

export default [
  {
    path: "/dashboard/doctors",
    component: () =>
      import("@/modules/practitioners/views/practitioners/Practitioners.vue"),
    props: route => {
      route.query.type = EPractitionerTypes.doctor
      return route.query
    },
    meta: { requiredUserType: [EUserType.admin] }
  },
  {
    path: "/dashboard/doctors/details",
    component: () =>
      import("@/modules/practitioners/views/practitioner-details/PractitionerDetails.vue"),
    props: route => {
      route.query.type = EPractitionerTypes.doctor
      return route.query
    },
    meta: { requiredUserType: [EUserType.admin] }
  },
  {
    path: "/dashboard/nurses",
    component: () =>
      import("@/modules/practitioners/views/practitioners/Practitioners.vue"),
    props: route => {
      route.query.type = EPractitionerTypes.nurse
      return route.query
    },
    meta: { requiredUserType: [EUserType.admin] }
  },
  {
    path: "/dashboard/nurses/details",
    component: () =>
      import("@/modules/practitioners/views/practitioner-details/PractitionerDetails.vue"),
    props: route => {
      route.query.type = EPractitionerTypes.nurse
      return route.query
    },
    meta: { requiredUserType: [EUserType.admin] }
  },
  {
    path: "/dashboard/physiotherapists",
    component: () =>
      import("@/modules/practitioners/views/practitioners/Practitioners.vue"),
    props: route => {
      route.query.type = EPractitionerTypes.physiotherapist
      return route.query
    },
    meta: { requiredUserType: [EUserType.admin] }
  },
  {
    path: "/dashboard/physiotherapists/details",
    component: () =>
      import("@/modules/practitioners/views/practitioner-details/PractitionerDetails.vue"),
    props: route => {
      route.query.type = EPractitionerTypes.physiotherapist
      return route.query
    },
    meta: { requiredUserType: [EUserType.admin] }
  },
  {
    path: "/dashboard/hospitals",
    component: () =>
      import("@/modules/practitioners/views/practitioners/Practitioners.vue"),
    props: route => {
      route.query.type = EPractitionerTypes.hospital
      return route.query
    },
    meta: { requiredUserType: [EUserType.admin] }
  },
  {
    path: "/dashboard/hospitals/details",
    component: () =>
      import("@/modules/practitioners/views/practitioner-details/PractitionerDetails.vue"),
    props: route => {
      route.query.type = EPractitionerTypes.hospital
      return route.query
    },
    meta: { requiredUserType: [EUserType.admin] }
  },
  {
    path: "/dashboard/laboratories",
    component: () =>
      import("@/modules/practitioners/views/practitioners/Practitioners.vue"),
    props: route => {
      route.query.type = EPractitionerTypes.laboratory
      return route.query
    },
    meta: { requiredUserType: [EUserType.admin] }
  },
  {
    path: "/dashboard/laboratories/details",
    component: () =>
      import("@/modules/practitioners/views/practitioner-details/PractitionerDetails.vue"),
    props: route => {
      route.query.type = EPractitionerTypes.laboratory
      return route.query
    },
    meta: { requiredUserType: [EUserType.admin] }
  },
  {
    path: "/dashboard/ambulances",
    component: () =>
      import("@/modules/practitioners/views/practitioners/Practitioners.vue"),
    props: route => {
      route.query.type = EPractitionerTypes.ambulance
      return route.query
    },
    meta: { requiredUserType: [EUserType.admin] }
  },
  {
    path: "/dashboard/ambulances/details",
    component: () =>
      import("@/modules/practitioners/views/practitioner-details/PractitionerDetails.vue"),
    props: route => {
      route.query.type = EPractitionerTypes.ambulance
      return route.query
    },
    meta: { requiredUserType: [EUserType.admin] }
  },
] as RouteConfig[];
