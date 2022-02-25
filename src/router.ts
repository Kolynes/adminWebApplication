import Vue from 'vue'
import Router from 'vue-router'
import { EOrganizationTypes } from './modules/organizations/types';
import { EPractitionerTypes } from './modules/practitioners/types';
import { EProductTypes } from './modules/products/types';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: "",
  routes: [
    { 
      path: "/", 
      component: () => 
        import("@/views/splash/Splash.vue"), 
      props: route => route.query
    },
    {
      path: "/login",
      component: () =>
        import("@/modules/auth/views/login/Login.vue"),
      props: route => route.query
    },
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
        },
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
        {
          path: "/dashboard/admins",
          component: () =>
            import("@/modules/admins/views/admins/Admins.vue"),
          props: route => route.query,
        },
        {
          path: "/dashboard/admins/details",
          component: () =>
            import("@/modules/admins/views/admin-details/AdminDetails.vue"),
          props: route => route.query
        },
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
        },
        {
          path: "/dashboard/agents",
          component: () =>
            import("@/modules/agents/views/agents/Agents.vue"),
          props: route => route.query,
        },
        {
          path: "/dashboard/agents/details",
          component: () =>
            import("@/modules/agents/views/agent-details/AgentDetails.vue"),
          props: route => route.query
        },
        {
          path: "/dashboard/rides",
          component: () =>
            import("@/modules/rides/views/rides/Rides.vue"),
          props: route => route.query,
        },
        {
          path: "/dashboard/rides/details",
          component: () =>
            import("@/modules/rides/views/ride-details/RideDetails.vue"),
          props: route => route.query
        },
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
        {
          path: "/dashboard/trips",
          component: () =>
            import("@/modules/trips/views/trips/Trips.vue"),
          props: route => route.query
        },
        {
          path: "/dashboard/trips/details",
          component: () =>
            import("@/modules/trips/views/trip-details/TripDetails.vue"),
          props: route => route.query
        }
      ]
    }
  ],
  scrollBehavior: (to, from, savedPosition) => {
    return { x: 0, y: 0 }
  }
})
