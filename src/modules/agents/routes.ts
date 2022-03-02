import { RouteConfig } from "vue-router";

export default [
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
] as RouteConfig[];