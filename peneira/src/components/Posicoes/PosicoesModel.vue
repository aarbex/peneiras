<template>
  <div>
    <Nav></Nav>
    <h1>Posições</h1>
    <div class="divForm">
      <v-form class="form">
        <v-text-field v-if="this.id" v-model="posicao.id" label="ID" disable readonly></v-text-field>
        <v-text-field
          v-if="this.id"
          v-model="posicao.nome"
          label="Nome"
          required
          autofocus
          @keyup.enter="editarPosicao(posicao)"
        ></v-text-field>
        <v-text-field
          v-else
          v-model="nome"
          label="Nome"
          required
          autofocus
          v-on:keyup.enter="addPosicao()"
        ></v-text-field>
        <v-btn v-if="this.id" class="mr-4" @click="editarPosicao(posicao)" color="primary">Editar</v-btn>
        <v-btn v-else class="mr-4" @click="addPosicao()" color="primary">Salvar</v-btn>
        <router-link to="/posicoes" tag="button">
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
      posicao: {},
      nome: "",
      dtCadastro: ""
    };
  },

  created() {
    if (this.id) {
      this.$http
        .get("https://my-json-server.typicode.com/rafafcasado/peneirasccp/posicoes/" + this.id)
        .then(res => res.json())
        .then(posicao => (this.posicao = posicao));
    }
  },

  methods: {
    addPosicao() {
      let now = new Date();
      this.dtCadastro =
        now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
      let _posicao = {
        nome: this.nome,
        dtCadastro: this.dtCadastro
      };
      if (this.nome.length > 0) {
        this.$http
          .post("https://my-json-server.typicode.com/rafafcasado/peneirasccp/posicoes/", _posicao)
          .then(res => res.json());
        this.nome = "";
        this.dtCadastro = "";
        this.$router.push("/posicoes");
      }
    },

    editarPosicao(_posicao) {
      let now = new Date();
      this.dtCadastro =
        now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
      let _posicaoEditar = {
        id: _posicao.id,
        nome: _posicao.nome,
        dtCadastro: this.dtCadastro
      };
      this.$http.put(
        `https://my-json-server.typicode.com/rafafcasado/peneirasccp/posicoes/${_posicaoEditar.id}`,
        _posicaoEditar
      );
      this.$router.push("/posicoes");
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