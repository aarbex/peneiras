<template>
  <div>
    <Nav></Nav>
    <h1>Treinadores</h1>
    <div class="divForm">
      <v-form class="form">
        <v-text-field v-if="this.id" v-model="treinador.id" label="ID" disable readonly></v-text-field>
        <v-text-field
          v-if="this.id"
          v-model="treinador.nome"
          label="Nome"
          required
          autofocus
          @keyup.enter="editarTreinador(treinador)"
        ></v-text-field>
        <v-text-field
          v-else
          v-model="nome"
          label="Nome"
          required
          autofocus
          v-on:keyup.enter="addTreinador()"
        ></v-text-field>
        <v-btn
          v-if="this.id"
          class="mr-4"
          @click="editarTreinador(treinador)"
          color="primary"
        >Editar</v-btn>
        <v-btn v-else class="mr-4" @click="addTreinador()" color="primary">Salvar</v-btn>
        <router-link to="/treinadores" tag="button">
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
      treinador: {},
      nome: "",
      dtCadastro: ""
    };
  },

  created() {
    if (this.id) {
      this.$http
        .get("https://my-json-server.typicode.com/rafafcasado/peneirasccp/treinadores/" + this.id)
        .then(res => res.json())
        .then(treinador => (this.treinador = treinador));
    }
  },

  methods: {
    addTreinador() {
      let now = new Date();
      this.dtCadastro =
        now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
      let _treinador = {
        nome: this.nome,
        dtCadastro: this.dtCadastro
      };
      if (this.nome.length > 0) {
        this.$http
          .post("https://my-json-server.typicode.com/rafafcasado/peneirasccp/treinadores/", _treinador)
          .then(res => res.json());
        this.nome = "";
        this.dtCadastro = "";
        this.$router.push("/treinadores");
      }
    },

    editarTreinador(_treinador) {
      let now = new Date();
      this.dtCadastro =
        now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
      let _treinadorEditar = {
        id: _treinador.id,
        nome: _treinador.nome,
        dtCadastro: this.dtCadastro
      };
      this.$http.put(
        `https://my-json-server.typicode.com/rafafcasado/peneirasccp/treinadores/${_treinadorEditar.id}`,
        _treinadorEditar
      );
      this.$router.push("/treinadores");
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