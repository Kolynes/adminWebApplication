import Vue from 'vue'
import Router from 'vue-router'
import EOrganizationTypes from './types/EOrganizationTypes'
import EPractitionerTypes from './types/EPractitionerTypes'
import EProductTypes from './types/EProductTypes'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: "/admin/",
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
        import("@/views/login/Login.vue"),
      props: route => route.query
    },
    {
      path: "/dashboard",
      component: () =>
        import("@/views/dashboard/Dashboard.vue"),
      props: route => route.query,
      redirect: "/dashboard/home",
      children: [
        {
          path: "/dashboard/home",
          component: () =>
            import("@/views/dashboard/home/Home.vue"),
          props: route => route.query
        },
        {
          path: "/dashboard/account",
          component: () =>
            import("@/views/dashboard/account/Account.vue"),
          props: route => route.query
        },
        {
          path: "/dashboard/orders",
          component: () =>
            import("@/views/dashboard/orders/Orders.vue"),
          props: route => route.query,
        },
        {
          path: "/dashboard/orders/details",
          component: () =>
            import("@/views/dashboard/orders/order-details/OrderDetails.vue"),
          props: route => route.query
        },
        {
          path: "/dashboard/drugs",
          component: () =>
            import("@/views/dashboard/products/Products.vue"),
          props: route => {
            route.query.type = EProductTypes.drug;
            return route.query;
          },
        },
        {
          path: "/dashboard/drugs/details",
          component: () =>
            import("@/views/dashboard/products/product-details/ProductDetails.vue"),
          props: route => {
            route.query.type = EProductTypes.drug;
            return route.query;
          }
        },
        {
          path: "/dashboard/equipment",
          component: () =>
            import("@/views/dashboard/products/Products.vue"),
          props: route => {
            route.query.type = EProductTypes.equipment;
            return route.query;
          },
        },
        {
          path: "/dashboard/equipment/details",
          component: () =>
            import("@/views/dashboard/products/product-details/ProductDetails.vue"),
          props: route => {
            route.query.type = EProductTypes.equipment;
            return route.query;
          }
        },
        {
          path: "/dashboard/admins",
          component: () =>
            import("@/views/dashboard/admins/Admins.vue"),
          props: route => route.query,
        },
        {
          path: "/dashboard/admins/details",
          component: () =>
            import("@/views/dashboard/admins/admin-details/AdminDetails.vue"),
          props: route => route.query
        },
        {
          path: "/dashboard/customers",
          component: () =>
            import("@/views/dashboard/customers/Customers.vue"),
          props: route => route.query,
        },
        {
          path: "/dashboard/customers/details",
          component: () =>
            import("@/views/dashboard/customers/customer-details/CustomerDetails.vue"),
          props: route => route.query
        },
        {
          path: "/dashboard/agents",
          component: () =>
            import("@/views/dashboard/agents/Agents.vue"),
          props: route => route.query,
        },
        {
          path: "/dashboard/agents/details",
          component: () =>
            import("@/views/dashboard/agents/agent-details/AgentDetails.vue"),
          props: route => route.query
        },
        {
          path: "/dashboard/rides",
          component: () =>
            import("@/views/dashboard/rides/Rides.vue"),
          props: route => route.query,
        },
        {
          path: "/dashboard/rides/details",
          component: () =>
            import("@/views/dashboard/rides/ride-details/RideDetails.vue"),
          props: route => route.query
        },
        {
          path: "/dashboard/pharmacies",
          component: () =>
            import("@/views/dashboard/organizations/Organizations.vue"),
          props: route => {
            route.query.type = EOrganizationTypes.pharmacy
            return route.query
          },
        },
        {
          path: "/dashboard/pharmacies/details",
          component: () =>
            import("@/views/dashboard/organizations/organization-details/OrganizationDetails.vue"),
          props: route => {
            route.query.type = EOrganizationTypes.pharmacy
            return route.query
          }
        },
        {
          path: "/dashboard/pharmacies/products",
          component: () =>
            import("@/views/dashboard/organizations/organization-products/OrganizationProducts.vue"),
          props: route => {
            route.query.type = EProductTypes.drug
            return route.query
          }
        },
        {
          path: "/dashboard/oems",
          component: () =>
            import("@/views/dashboard/organizations/Organizations.vue"),
          props: route => {
            route.query.type = EOrganizationTypes.OEM
            return route.query
          }
        },
        {
          path: "/dashboard/oems/details",
          component: () =>
            import("@/views/dashboard/organizations/organization-details/OrganizationDetails.vue"),
          props: route => {
            route.query.type = EOrganizationTypes.OEM
            return route.query
          }
        },
        {
          path: "/dashboard/oems/products",
          component: () =>
            import("@/views/dashboard/organizations/organization-products/OrganizationProducts.vue"),
          props: route => {
            route.query.type = EProductTypes.equipment
            return route.query
          }
        },
        {
          path: "/dashboard/doctors",
          component: () =>
            import("@/views/dashboard/practitioners/Practitioners.vue"),
          props: route => {
            route.query.type = EPractitionerTypes.doctor
            return route.query
          },
        },
        {
          path: "/dashboard/doctors/details",
          component: () =>
            import("@/views/dashboard/practitioners/practitioner-details/PractitionerDetails.vue"),
          props: route => {
            route.query.type = EPractitionerTypes.doctor
            return route.query
          }
        },
        {
          path: "/dashboard/nurses",
          component: () =>
            import("@/views/dashboard/practitioners/Practitioners.vue"),
          props: route => {
            route.query.type = EPractitionerTypes.nurse
            return route.query
          },
        },
        {
          path: "/dashboard/nurses/details",
          component: () =>
            import("@/views/dashboard/practitioners/practitioner-details/PractitionerDetails.vue"),
          props: route => {
            route.query.type = EPractitionerTypes.nurse
            return route.query
          }
        },
        {
          path: "/dashboard/physiotherapists",
          component: () =>
            import("@/views/dashboard/practitioners/Practitioners.vue"),
          props: route => {
            route.query.type = EPractitionerTypes.physiotherapist
            return route.query
          }
        },
        {
          path: "/dashboard/physiotherapists/details",
          component: () =>
            import("@/views/dashboard/practitioners/practitioner-details/PractitionerDetails.vue"),
          props: route => {
            route.query.type = EPractitionerTypes.physiotherapist
            return route.query
          }
        },
        {
          path: "/dashboard/hospitals",
          component: () =>
            import("@/views/dashboard/practitioners/Practitioners.vue"),
          props: route => {
            route.query.type = EPractitionerTypes.hospital
            return route.query
          }
        },
        {
          path: "/dashboard/hospitals/details",
          component: () =>
            import("@/views/dashboard/practitioners/practitioner-details/PractitionerDetails.vue"),
          props: route => {
            route.query.type = EPractitionerTypes.hospital
            return route.query
          }
        },
        {
          path: "/dashboard/laboratories",
          component: () =>
            import("@/views/dashboard/practitioners/Practitioners.vue"),
          props: route => {
            route.query.type = EPractitionerTypes.laboratory
            return route.query
          }
        },
        {
          path: "/dashboard/laboratories/details",
          component: () =>
            import("@/views/dashboard/practitioners/practitioner-details/PractitionerDetails.vue"),
          props: route => {
            route.query.type = EPractitionerTypes.laboratory
            return route.query
          }
        },
        {
          path: "/dashboard/ambulances",
          component: () =>
            import("@/views/dashboard/practitioners/Practitioners.vue"),
          props: route => {
            route.query.type = EPractitionerTypes.ambulance
            return route.query
          }
        },
        {
          path: "/dashboard/ambulances/details",
          component: () =>
            import("@/views/dashboard/practitioners/practitioner-details/PractitionerDetails.vue"),
          props: route => {
            route.query.type = EPractitionerTypes.ambulance
            return route.query
          }
        },
        {
          path: "/dashboard/timesheet",
          component: () =>
            import("@/views/dashboard/timesheet/Timesheet.vue"),
          props: route => route.query
        },
        {
          path: "/dashboard/reports",
          component: () =>
            import("@/views/dashboard/reports/Reports.vue"),
          props: route => route.query
        },
      ]
    }
  ],
  scrollBehavior: (to, from, savedPosition) => {
    return { x: 0, y: 0 }
  }
})
