import { RouteConfig } from "vue-router";
import adminsRoutes from "@/modules/admins/routes";
import agentsRoutes from "@/modules/agents/routes";
import customersRoutes from "@/modules/customers/routes";
import ordersRoutes from "@/modules/orders/routes";
import organizationsRoutes from "@/modules/organizations/routes";
import practitionersRoutes from "@/modules/practitioners/routes"
import ridesRoutes from "@/modules/rides/routes";
import tripsRoutes from "@/modules/trips/routes";

export default [
  {
    path: "/dashboard",
    component: () =>
      import("@/modules/dashboard/views/dashboard/Dashboard.vue"),
    props: route => route.query,
    redirect: "/dashboard/home",
    children: [
      {
        path: "/dashboard/home",
        component: () =>
          import("@/modules/dashboard/views/home/Home.vue"),
        props: route => route.query
      },
      {
        path: "/dashboard/account",
        component: () =>
          import("@/modules/dashboard/views/account/Account.vue"),
        props: route => route.query
      },
      ...adminsRoutes,
      ...agentsRoutes,
      ...customersRoutes,
      ...ordersRoutes,
      ...organizationsRoutes,
      ...practitionersRoutes,
      ...ridesRoutes,
      ...tripsRoutes
    ]
  }
] as RouteConfig[];