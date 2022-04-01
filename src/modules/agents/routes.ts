import { RouteConfig } from "vue-router";
import { EUserType } from "../auth/types";

export default [
  {
    path: "/dashboard/agents",
    component: () =>
      import("@/modules/agents/views/agents/Agents.vue"),
    props: route => route.query,
    meta: { requiredUserTypes: [EUserType.admin]}
  },
  {
    path: "/dashboard/agents/details",
    component: () =>
      import("@/modules/agents/views/agent-details/AgentDetails.vue"),
    props: route => route.query,
    meta: { requiredUserTypes: [EUserType.admin]}
  },
] as RouteConfig[];