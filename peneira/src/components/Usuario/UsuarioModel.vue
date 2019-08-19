<template>
  <div>
    <Nav></Nav>
    <h1>Usuários</h1>
    <div class="divForm">
      <v-form class="form">
        <v-text-field v-if="this.id" v-model="usuario.id" label="ID" disable readonly></v-text-field>
        <v-text-field v-model="usuario.nome" label="Nome" required></v-text-field>
        <v-text-field v-model="usuario.email" label="E-mail" required></v-text-field>
        <v-select
          v-if="this.id"
          v-model="usuario.perfil.id"
          :items="perfis"
          label="Perfil"
          required
        ></v-select>
        <v-select v-else v-model="usuario.perfil" :items="perfis" label="Perfil" required></v-select>
        <v-text-field v-model="usuario.senha" label="Senha" type="password" required></v-text-field>
        <v-text-field v-model="usuario.senha" label="Repetir senha" type="password" required></v-text-field>
        <v-btn class="mr-4" @click="submit" color="success">Salvar</v-btn>
        <v-btn @click="clear" color="error">Cancelar</v-btn>
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
      usuario: {},
      perfis: [],
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
        this.perfis = perfis.map(x => ({ text: x.nome, value: x.id }));
      });
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