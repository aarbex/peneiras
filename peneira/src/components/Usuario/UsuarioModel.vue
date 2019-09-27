<template>
  <div>
    <Nav></Nav>
    <h1>Usuários do Sistema</h1>
    <div class="divForm">
      <v-form class="form">
        <v-text-field v-if="this.id" v-model="usuario.id" label="ID" disable readonly></v-text-field>
        <v-text-field v-if="this.id" v-model="usuario.nome" label="Nome" required></v-text-field>
        <v-text-field v-else v-model="nome" label="Nome" required></v-text-field>
        <v-text-field v-if="this.id" v-model="usuario.email" label="E-mail" required></v-text-field>
        <v-text-field v-else v-model="email" label="E-mail" required></v-text-field>
        <v-select
          v-if="this.id"
          name="perfil"
          v-model="usuario.perfil.id"
          :items="perfis"
          item-text="nome"
          item-value="id"
          label="Perfil"
          required
        ></v-select>
        <v-select
          v-else
          v-model="perfil.id"
          :items="perfis"
          item-text="nome"
          item-value="id"
          label="Perfil"
          name="perfil"
          required
        ></v-select>
        <v-text-field
          v-if="this.id"
          v-model="usuario.senhaAux1"
          label="Senha"
          type="password"
          required
        ></v-text-field>
        <v-text-field v-else v-model="senhaAux1" label="Senha" type="password" required></v-text-field>
        <v-text-field
          v-if="this.id"
          v-model="usuario.senhaAux2"
          label="Repetir senha"
          type="password"
          required
        ></v-text-field>
        <v-text-field v-else v-model="senhaAux2" label="Repetir senha" type="password" required></v-text-field>
        <v-btn v-if="this.id" class="mr-4" @click="editarUsuario(usuario)" color="success">Editar</v-btn>
        <v-btn v-else class="mr-4" @click="addUsuario()" color="success">Salvar</v-btn>
        <router-link to="/usuarios" tag="button">
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
      nome: "",
      email: "",
      dtCadastro: "",
      usuario: {},
      perfil: {},
      perfis: [],
      senhaAux1: "",
      senhaAux2: "",
      senha: "",
      id: this.$route.params.id
    };
  },

  created() {
    if (this.id) {
      this.$http
        .get("http://localhost:3000/usuarios/" + this.id)
        .then(res => res.json())
        .then(usuario => (this.usuario = usuario));
    }

    this.$http
      .get("http://localhost:3000/perfis")
      .then(res => res.json())
      .then(perfis => {
        this.perfis = perfis;
        //.map(x => ({ text: x.nome, value: x.id }));
      });
  },

  beforeMount() {
    if (this.id) {
      this.$http
        .get("http://localhost:3000/usuarios/" + this.id)
        .then(res => res.json())
        .then(usuario => (this.usuario = usuario));
    }
  },

  methods: {
    addUsuario() {
      let now = new Date();
      this.dtCadastro =
        now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
      let _senha = "";
      if (this.senha1 === this.senha2) {
        _senha = this.senha1;
      }
      this.perfil = this.perfis.filter(x => x.id == this.perfil.id)[0];
      let _usuario = {
        nome: this.nome,
        email: this.email,
        senha: _senha,
        dtCadastro: this.dtCadastro,
        perfil: {
          id: this.perfil.id,
          nome: this.perfil.nome
        },
        senhaAux1: this.senhaAux1,
        senhaAux2: this.senhaAux2
      };
      this.$http
        .post("http://localhost:3000/usuarios", _usuario)
        .then(res => res.json())
        .then(
          (this.nome = ""),
          (this.email = ""),
          (this.dtCadastro = ""),
          (this.perfil = {}),
          (this.senha = ""),
          (this.senhaAux1 = ""),
          (this.senhaAux2 = ""),
          this.$router.push("/usuarios")
        );
    },

    editarUsuario(_usuario) {
      let now = new Date();
      this.dtCadastro =
        now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
      let _senha = "";
      if (_usuario.senhaAux1 === _usuario.senhaAux2) {
        _senha = _usuario.senhaAux1;
      }
      this.perfil = this.perfis.filter(x => x.id == this.usuario.perfil.id)[0];
      let _usuarioEditar = {
        nome: _usuario.nome,
        email: _usuario.email,
        senha: _senha,
        senhaAux1: _usuario.senhaAux1,
        senhaAux2: _usuario.senhaAux2,
        dtCadastro: this.dtCadastro,
        perfil: {
          id: this.perfil.id,
          nome: this.perfil.nome
        }
      };
      this.$http.put(
        `http://localhost:3000/usuarios/${_usuario.id}`,
        _usuarioEditar
      );
      this.$router.push("/usuarios");
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