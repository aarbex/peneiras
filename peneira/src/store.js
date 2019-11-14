import Vuex from "vuex";

export default function getStore() {
  return new Vuex.Store({
    state: {
      urlAPI: "http://localhost:3000"
    }
  });
}
