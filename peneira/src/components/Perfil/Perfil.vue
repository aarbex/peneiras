<template>
  <v-container>
    <Nav></Nav>
    <h1>Perfis de Usuário</h1>

    <div class="div-add">
      <router-link to="/perfil">
        <v-btn class="mx-2 btn" fab dark xSmall color="primary">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-icon medium dark v-on="on">mdi-plus</v-icon>
            </template>
            <span>Adicionar</span>
          </v-tooltip>
        </v-btn>
      </router-link>
    </div>
    <v-simple-table class="text-center" style="width: 70%; margin: 0 auto">
      <thead class="text-center">
        <th>ID</th>
        <th class="text-center">Nome</th>
        <th class="text-center">Data Cadastro</th>
        <th class="text-center">Ações</th>
      </thead>
      <tbody v-if="perfis.length">
        <tr v-for="p in perfis" :key="p.id">
          <td>{{p.id}}</td>
          <td>{{p.nome}}</td>
          <td>{{p.dtCadastro}}</td>
          <td style="width:32%">
            <router-link to="/permissoes" tag="button">
              <v-btn class="actionButtons" fab dark xSmall color="black">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-icon medium dark v-on="on">mdi-account-check</v-icon>
                  </template>
                  <span>Permissões</span>
                </v-tooltip>
              </v-btn>
            </router-link>
            <router-link :to="'/perfil/' + p.id">
              <v-btn class="mx-2 btn" fab dark xSmall color="primary">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-icon medium dark v-on="on">mdi-pencil</v-icon>
                  </template>
                  <span>Editar</span>
                </v-tooltip>
              </v-btn>
            </router-link>
            <v-btn
              class="actionButtons"
              fab
              dark
              xSmall
              @click="perfil = p;dialog2=true"
              color="error"
            >
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon medium dark v-on="on">mdi-trash-can</v-icon>
                </template>
                <span>Excluir</span>
              </v-tooltip>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-dialog v-model="dialog2" max-width="290">
      <v-card>
        <v-card-title class="headline">Atenção!!!</v-card-title>

        <v-card-text>Deseja realmente excluir o perfil {{perfil.nome}}?</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="error" text @click="dialog2 = false">Cancelar</v-btn>

          <v-btn color="success" text @click="removerPerfil(perfil)">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Nav from "../Nav/Nav";

export default {
  data() {
    return {
      valid: true,
      dialog2: false,
      nome: "",
      nameRules: [v => !!v || "O nome do Perfil é obrigatório!"],
      perfis: [],
      perfil: {},
      id: this.$route.params.id
    };
  },
  components: {
    Nav
  },

  created() {
    this.$http
      .get("http://localhost:3000/perfis")
      .then(res => res.json())
      .then(perfis => (this.perfis = perfis));
  },

  methods: {
    removerPerfil(perfil) {
      this.$http
        .delete(`http://localhost:3000/perfis/${perfil.id}`)
        .then(() => {
          let indice = this.perfis.indexOf(perfil);
          this.perfis.splice(indice, 1);
          //this.perfis = this.perfis.filter(p => p.id != perfil.id);
          this.dialog2 = false;
        });
    }
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
  padding: 20px 0px;
}
table {
  padding: 20px opx;
  margin: 0 auto;
}
.div-add {
  margin: 0 auto;
  text-align: right;
  padding-bottom: 10px;
  width: 70%;
}
.actionButtons {
  margin: 0 3px;
}
</style>