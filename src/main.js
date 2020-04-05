import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import { firestorePlugin } from "vuefire";
import db from "./db.js";

Vue.use(firestorePlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  db,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
