<template>
  <div>
    <Nav></Nav>
    <v-row>
      <v-img src="../../assets/iptec.png" class="grey lighten-2 mx-auto mt-12" max-width="40%"></v-img>
    </v-row>
    <div class="mt-12" align="center">
      <h3>Olá, {{this.usuario.nome}}!</h3>
      <p>Seja bem-vindo(a) ao Sistema de Peneiras</p>
    </div>
  </div>
</template>

<script>
import Nav from "../Nav/Nav";

export default {
  components: {
    Nav
  },
  data() {
    return {
      usuario: JSON.parse(window.localStorage.getItem("usuario")),
      id: this.$route.params.id
    };
  }
};
</script>
<style>
</style>