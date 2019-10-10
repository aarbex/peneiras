<template>
  <div>
    <Nav></Nav>
    <h1>Status das Avaliaçoes</h1>
    <div class="divForm">
      <v-form class="form">
        <v-text-field v-if="this.id" v-model="status.id" label="ID" disable readonly></v-text-field>
        <v-text-field
          v-if="this.id"
          v-model="status.nome"
          label="Nome"
          required
          autofocus
          @keyup.enter="editarStatus(status)"
        ></v-text-field>
        <v-text-field
          v-else
          v-model="nome"
          label="Nome"
          required
          autofocus
          v-on:keyup.enter="addStatus()"
        ></v-text-field>
        <v-btn v-if="this.id" class="mr-4" @click="editarStatus(status)" color="primary">Editar</v-btn>
        <v-btn v-else class="mr-4" @click="addStatus()" color="primary">Salvar</v-btn>
        <router-link to="/status" tag="button">
          <v-btn color="error">Cancelar</v-btn>
        </router-link>
      </v-form>
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
      id: this.$route.params.id,
      status: {},
      nome: "",
      dtCadastro: ""
    };
  },

  created() {
    if (this.id) {
      this.$http
        .get("https://my-json-server.typicode.com/rafafcasado/peneirasccp/status/" + this.id)
        .then(res => res.json())
        .then(status => (this.status = status));
    }
  },

  methods: {
    addStatus() {
      let now = new Date();
      this.dtCadastro =
        now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
      let _status = {
        nome: this.nome,
        dtCadastro: this.dtCadastro
      };
      if (this.nome.length > 0) {
        this.$http
          .post("https://my-json-server.typicode.com/rafafcasado/peneirasccp/status/", _status)
          .then(res => res.json());
        this.nome = "";
        this.dtCadastro = "";
        this.$router.push("/status");
      }
    },

    editarStatus(_status) {
      let now = new Date();
      this.dtCadastro =
        now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
      let _statusEditar = {
        id: _status.id,
        nome: _status.nome,
        dtCadastro: this.dtCadastro
      };
      this.$http.put(
        `https://my-json-server.typicode.com/rafafcasado/peneirasccp/status/${_statusEditar.id}`,
        _statusEditar
      );
      this.$router.push("/status");
    }
  }
};
</script>

<style lang="scss" scoped>
.divForm {
  width: 50%;
  text-align: center;
  display: flex;
  margin: 0 auto;
}
.form {
  width: 100%;
}
</style>