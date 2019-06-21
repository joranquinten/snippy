import Vue from "vue";
import VueRouter from "vue-router";

import auth from "./auth/authService";

Vue.use(VueRouter);

import SnippetsOverview from "./components/SnippetsOverview";
import EditSnippet from "./components/EditSnippet";
import Callback from "./components/Callback";
import Profile from "./components/Profile";

const routes = [
  { path: "/", name: "home", component: SnippetsOverview },
  {
    path: "/snippet/new",
    name: "create",
    meta: { isSecure: true },
    component: EditSnippet
  },
  {
    path: "/snippet/:id/edit",
    name: "edit",
    meta: { isSecure: true },
    component: EditSnippet
  },
  {
    path: "/snippets/search/:query",
    name: "searchByQuery",
    component: SnippetsOverview
  },
  {
    path: "/snippets/tags/:tag",
    name: "searchByTag",
    component: SnippetsOverview
  },
  {
    path: "/snippets/languages/:language",
    name: "searchByLanguage",
    component: SnippetsOverview
  },
  { path: "/callback", name: "callback", component: Callback },
  { path: "/profile", name: "profile", component: Profile }
];

const router = new VueRouter({
  mode: "history",
  routes
});

// NEW - add a `beforeEach` handler to each route
router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.isSecure && !auth.isAuthenticated()) {
    auth.login({ target: to.path });
  }
  next();
});

export default router;
