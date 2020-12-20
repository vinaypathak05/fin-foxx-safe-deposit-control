import Index from "./views/Index.jsx";
import Login from "./views/examples/Login.js";
import Agents from "./components/agents/component/index";
import AgentDetails from './components/agents/component/agents-details';
import Customers from "./components/customers/component/index";
import CustomerDetails from './components/customers/component/customers-details';
import Plans from "./components/plans/component/index";

// Languages
import LocaleStrings from './languages';

var routes = [
  {
    path: "/index",
    name: LocaleStrings.dashboard,
    icon: "ni ni-tv-2 text-info",
    component: Index,
    display: true,
    layout: "/admin"
  },
  {
    path: "/agents",
    name: LocaleStrings.agents,
    icon: "ni ni-single-02 text-info",
    component: Agents,
    display: true,
    layout: "/admin"
  },
  {
    path: "/agent",
    name: LocaleStrings.agentDetails,
    icon: "fa fa-user text-info",
    component: AgentDetails,
    display: false,
    layout: "/admin",
  },
  {
    path: "/customers",
    name: LocaleStrings.customers,
    icon: "fa fa-users text-info",
    component: Customers,
    display: true,
    layout: "/admin"
  },
  {
    path: "/customer",
    name: LocaleStrings.customerDetails,
    icon: "fa fa-users text-info",
    component: CustomerDetails,
    display: false,
    layout: "/admin"
  },
  {
    path: "/plans",
    name: LocaleStrings.plans,
    icon: "fa fa-road text-info",
    component: Plans,
    display: true,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    display: false,
    layout: "/auth"
  },
];
export default routes;
