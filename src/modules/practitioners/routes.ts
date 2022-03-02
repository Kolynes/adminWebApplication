import { RouteConfig } from "vue-router";
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
  },
  {
    path: "/dashboard/doctors/details",
    component: () =>
      import("@/modules/practitioners/views/practitioner-details/PractitionerDetails.vue"),
    props: route => {
      route.query.type = EPractitionerTypes.doctor
      return route.query
    }
  },
  {
    path: "/dashboard/nurses",
    component: () =>
      import("@/modules/practitioners/views/practitioners/Practitioners.vue"),
    props: route => {
      route.query.type = EPractitionerTypes.nurse
      return route.query
    },
  },
  {
    path: "/dashboard/nurses/details",
    component: () =>
      import("@/modules/practitioners/views/practitioner-details/PractitionerDetails.vue"),
    props: route => {
      route.query.type = EPractitionerTypes.nurse
      return route.query
    }
  },
  {
    path: "/dashboard/physiotherapists",
    component: () =>
      import("@/modules/practitioners/views/practitioners/Practitioners.vue"),
    props: route => {
      route.query.type = EPractitionerTypes.physiotherapist
      return route.query
    }
  },
  {
    path: "/dashboard/physiotherapists/details",
    component: () =>
      import("@/modules/practitioners/views/practitioner-details/PractitionerDetails.vue"),
    props: route => {
      route.query.type = EPractitionerTypes.physiotherapist
      return route.query
    }
  },
  {
    path: "/dashboard/hospitals",
    component: () =>
      import("@/modules/practitioners/views/practitioners/Practitioners.vue"),
    props: route => {
      route.query.type = EPractitionerTypes.hospital
      return route.query
    }
  },
  {
    path: "/dashboard/hospitals/details",
    component: () =>
      import("@/modules/practitioners/views/practitioner-details/PractitionerDetails.vue"),
    props: route => {
      route.query.type = EPractitionerTypes.hospital
      return route.query
    }
  },
  {
    path: "/dashboard/laboratories",
    component: () =>
      import("@/modules/practitioners/views/practitioners/Practitioners.vue"),
    props: route => {
      route.query.type = EPractitionerTypes.laboratory
      return route.query
    }
  },
  {
    path: "/dashboard/laboratories/details",
    component: () =>
      import("@/modules/practitioners/views/practitioner-details/PractitionerDetails.vue"),
    props: route => {
      route.query.type = EPractitionerTypes.laboratory
      return route.query
    }
  },
  {
    path: "/dashboard/ambulances",
    component: () =>
      import("@/modules/practitioners/views/practitioners/Practitioners.vue"),
    props: route => {
      route.query.type = EPractitionerTypes.ambulance
      return route.query
    }
  },
  {
    path: "/dashboard/ambulances/details",
    component: () =>
      import("@/modules/practitioners/views/practitioner-details/PractitionerDetails.vue"),
    props: route => {
      route.query.type = EPractitionerTypes.ambulance
      return route.query
    }
  },
] as RouteConfig[];
