import Vue from "vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import VueClipboard from "vue-clipboard2";
import VuePrismEditor from "vue-prism-editor";
import App from "./App.vue";

import "vuetify/dist/vuetify.min.css";

import "vue-prism-editor/dist/VuePrismEditor.css"; // import the styles
import "prismjs";
import "prismjs/themes/prism.css";

import "./registerServiceWorker";

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  theme: {
    primary: "#914bf5",
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
Vue.component("prism-editor", VuePrismEditor);

import SnippetList from "./components/SnippetList";
import EditSnippet from "./components/EditSnippet";
import SearchSnippet from "./components/SearchSnippet";

const routes = [
  { path: "/", component: SnippetList },
  { path: "/snippet/new", component: EditSnippet },
  { path: "/snippets/search/:query", component: SearchSnippet }
];

const router = new VueRouter({
  routes // short for `routes: routes`
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
