import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";
import vuetify from "./plugins/vuetify.js";
import VueResource from "vue-resource";

Vue.config.productionTip = false;
Vue.use(VueResource);
//String de Conexão
Vue.http.options.root = "https://peneira.sccorinthians.com.br";
//Vue.http.options.root = "http://127.0.0.1:5000";

//Interceptor
Vue.http.interceptors.push((request, next) => {
  request.headers["Authorization"] =
    "Bearer " + window.localStorage.getItem("token");
  next(response => {
    if (response.status == 401) {
      window.location.href =
        window.location.origin + "/login?msg=Sua Sessão expirou!";
    } else if (
      response.status == 500 &&
      response.body.message == "Internal Server Error"
    ) {
      window.location.href =
        window.location.origin + "/login?msg=Sua Sessão expirou!";
    } else if (response.status == 500) {
      alert(response.body.message);
    }
  });
});

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
