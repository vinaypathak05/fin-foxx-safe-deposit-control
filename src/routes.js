import Index from "./views/Index.jsx";
import Login from "./views/examples/Login.js";
import Agents from "./components/agents/component/index";

// Languages
import LocaleStrings from './languages';
// const LocaleStrings = require('./languages');

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
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    display: false,
    layout: "/auth"
  },
];
export default routes;
