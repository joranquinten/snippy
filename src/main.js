import Vue from "vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import VueClipboard from "vue-clipboard2";
import App from "./App.vue";
import "vuetify/dist/vuetify.min.css";

import "./registerServiceWorker";

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  theme: {
    primary: "#F8F8F2",
    secondary: "#BD93F9",
    accent: "#8BE9FD",
    error: "#FF5555",
    info: "#FF79C6",
    success: "#50FA7B",
    warning: "#FFB86C"
  }
});
Vue.use(VueRouter);
Vue.use(VueClipboard);

import SnippetList from "./components/SnippetList";
import EditSnippet from "./components/EditSnippet";

const routes = [
  { path: "/", component: SnippetList },
  { path: "/snippet/new", component: EditSnippet },
  { path: "/snippet/:id/edit", component: EditSnippet }
];

const router = new VueRouter({
  routes // short for `routes: routes`
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
