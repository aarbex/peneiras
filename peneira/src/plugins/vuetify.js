import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

import pt from "vuetify/es5/locale/pt";

Vue.component("my-component", {
  methods: {
    changeLocale() {
      this.$vuetify.lang.current = "pt";
    }
  }
});

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    }
  },
  icons: {
    iconfont: "mdi"
  },
  lang: {
    locales: { pt },
    current: "pt"
  }
});
