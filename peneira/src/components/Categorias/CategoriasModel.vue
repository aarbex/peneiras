<template>
  <div>
    <Nav></Nav>
    <h1>Categorias</h1>
    <div class="divForm">
      <v-form class="form">
        <v-text-field v-if="this.id" v-model="categoria.id" label="ID" disable readonly></v-text-field>
        <v-text-field
          v-if="this.id"
          v-model="categoria.nome"
          label="Nome"
          required
          autofocus
          @keyup.enter="editarCategoria(categoria)"
        ></v-text-field>
        <v-text-field
          v-else
          v-model="nome"
          label="Nome"
          required
          autofocus
          v-on:keyup.enter="addCategoria()"
        ></v-text-field>
        <v-btn
          v-if="this.id"
          class="mr-4"
          @click="editarCategoria(categoria)"
          color="success"
        >Editar</v-btn>
        <v-btn v-else class="mr-4" @click="addCategoria()" color="success">Salvar</v-btn>
        <router-link to="/categorias" tag="button">
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
      categoria: {},
      nome: "",
      dtCadastro: ""
    };
  },

  created() {
    if (this.id) {
      this.$http
        .get("https://my-json-server.typicode.com/rafafcasado/peneirasccp/categorias/" + this.id)
        .then(res => res.json())
        .then(categoria => (this.categoria = categoria));
    }
  },

  methods: {
    addCategoria() {
      let now = new Date();
      this.dtCadastro =
        now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
      let _categoria = {
        nome: this.nome,
        dtCadastro: this.dtCadastro
      };
      if (this.nome.length > 0) {
        this.$http
          .post("https://my-json-server.typicode.com/rafafcasado/peneirasccp/categorias/", _categoria)
          .then(res => res.json());
        this.nome = "";
        this.dtCadastro = "";
        this.$router.push("/categorias");
      }
    },

    editarCategoria(_categoria) {
      let now = new Date();
      this.dtCadastro =
        now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
      let _categoriaEditar = {
        id: _categoria.id,
        nome: _categoria.nome,
        dtCadastro: this.dtCadastro
      };
      this.$http.put(
        `https://my-json-server.typicode.com/rafafcasado/peneirasccp/categorias/${_categoriaEditar.id}`,
        _categoriaEditar
      );
      this.$router.push("/categorias");
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