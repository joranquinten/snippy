import Vue from "vue";
import Vuetify from "vuetify";
import VueClipboard from "vue-clipboard2";
import VuePrismEditor from "vue-prism-editor";
import App from "./App.vue";

import "vuetify/dist/vuetify.min.css";

import "vue-prism-editor/dist/VuePrismEditor.css"; // import the styles
import "prismjs";
import "prismjs/themes/prism.css";

import router from "./router";

import AuthPlugin from "./plugins/auth";

import "./registerServiceWorker";

Vue.use(VueClipboard);
Vue.use(AuthPlugin);

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

Vue.component("prism-editor", VuePrismEditor);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
