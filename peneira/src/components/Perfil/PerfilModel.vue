<template>
  <div>
    <Nav></Nav>
    <h1>Perfis de Usuário</h1>
    <div class="divForm">
      <v-form class="form">
        <v-text-field v-if="this.id" v-model="perfil.id" label="ID" disable readonly></v-text-field>
        <v-text-field
          v-if="this.id"
          v-model="perfil.nome"
          label="Nome"
          required
          autofocus
          @keyup.enter="editarPerfil(perfil)"
        ></v-text-field>
        <v-text-field
          v-else
          v-model="nome"
          label="Nome"
          required
          autofocus
          v-on:keyup.enter="addPerfil()"
        ></v-text-field>
        <v-btn v-if="this.id" class="mr-4" @click="editarPerfil(perfil)" color="success">Editar</v-btn>
        <v-btn v-else class="mr-4" @click="addPerfil()" color="success">Salvar</v-btn>
        <router-link to="/perfis" tag="button">
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
      perfil: {},
      nome: "",
      dtCadastro: ""
    };
  },

  created() {
    if (this.id) {
      this.$http
        .get("http://localhost:3000/perfis/" + this.id)
        .then(res => res.json())
        .then(perfil => (this.perfil = perfil));
    }
  },

  methods: {
    addPerfil() {
      let now = new Date();
      this.dtCadastro =
        now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
      let _perfil = {
        nome: this.nome,
        dtCadastro: this.dtCadastro
      };
      if (this.nome.length > 0) {
        this.$http
          .post("http://localhost:3000/perfis/", _perfil)
          .then(res => res.json());
        this.nome = "";
        this.dtCadastro = "";
        this.$router.push("/perfis");
      }
    },

    editarPerfil(_perfil) {
      let now = new Date();
      this.dtCadastro =
        now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
      let _perfilEditar = {
        id: _perfil.id,
        nome: _perfil.nome,
        dtCadastro: this.dtCadastro
      };
      this.$http.put(
        `http://localhost:3000/perfis/${_perfilEditar.id}`,
        _perfilEditar
      );
      this.$router.push("/perfis");
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