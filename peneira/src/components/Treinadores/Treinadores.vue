<template>
  <div>
    <Nav />
    <h1>Treinadores</h1>
    <div class="div-add">
      <router-link to="/treinador">
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
        <th class="text-center">ID</th>
        <th class="text-center">Nome</th>
        <th class="text-center">Data Cadastro</th>
        <th class="text-center">Ações</th>
      </thead>
      <tbody v-if="treinadores.length">
        <tr v-for="t in treinadores" :key="t.id">
          <td>{{t.id}}</td>
          <td>{{t.nome}}</td>
          <td>{{t.dtCadastro}}</td>
          <td style="width:32%">
            <router-link :to="'/treinador/' + t.id">
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
              @click="treinador = t;dialog2=true"
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

        <v-card-text>Deseja realmente excluir a posição {{treinador.nome}}?</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="error" text @click="dialog2 = false">Cancelar</v-btn>

          <v-btn color="primary" text @click="removerTreinador(treinador)">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      dialog2: false,
      nome: "",
      nameRules: [v => !!v || "O nome do treinador é obrigatório!"],
      treinadores: [],
      treinador: {},
      id: this.$route.params.id
    };
  },

  created() {
    this.$http
      .get("https://my-json-server.typicode.com/rafafcasado/peneirasccp/treinadores")
      .then(res => res.json())
      .then(treinadores => (this.treinadores = treinadores));
  },

  beforeMount() {
    this.$http
      .get("https://my-json-server.typicode.com/rafafcasado/peneirasccp/treinadores")
      .then(res => res.json())
      .then(treinadores => (this.treinadores = treinadores));
  },

  methods: {
    removerTreinador(treinador) {
      this.$http
        .delete(`https://my-json-server.typicode.com/rafafcasado/peneirasccp/treinadores/${treinador.id}`)
        .then(() => {
          let indice = this.treinadores.indexOf(treinador);
          this.treinadores.splice(indice, 1);
          //this.treinadores = this.treinadores.filter(p => p.id != treinador.id);
          this.dialog2 = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
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