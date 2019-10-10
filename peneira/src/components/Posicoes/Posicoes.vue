<template>
  <div>
    <Nav />
    <h1>Posições</h1>
    <div class="div-add">
      <router-link to="/posicaoModel">
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
      <tbody v-if="posicoes.length">
        <tr v-for="p in posicoes" :key="p.id">
          <td>{{p.id}}</td>
          <td>{{p.nome}}</td>
          <td>{{p.dtCadastro}}</td>
          <td style="width:32%">
            <router-link :to="'/posicaoModel/' + p.id">
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
              @click="posicao = p;dialog2=true"
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

        <v-card-text>Deseja realmente excluir a posição {{posicao.nome}}?</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="error" text @click="dialog2 = false">Cancelar</v-btn>

          <v-btn color="primary" text @click="removerPosicao(posicao)">Confirmar</v-btn>
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
      nameRules: [v => !!v || "O nome da posição é obrigatório!"],
      posicoes: [],
      posicao: {},
      id: this.$route.params.id
    };
  },

  created() {
    this.$http
      .get("https://my-json-server.typicode.com/rafafcasado/peneirasccp/posicoes")
      .then(res => res.json())
      .then(posicoes => (this.posicoes = posicoes));
  },

  beforeMount() {
    this.$http
      .get("https://my-json-server.typicode.com/rafafcasado/peneirasccp/posicoes")
      .then(res => res.json())
      .then(posicoes => (this.posicoes = posicoes));
  },

  methods: {
    removerPosicao(posicao) {
      this.$http
        .delete(`https://my-json-server.typicode.com/rafafcasado/peneirasccp/posicoes/${posicao.id}`)
        .then(() => {
          let indice = this.posicoes.indexOf(posicao);
          this.posicoes.splice(indice, 1);
          //this.posicoes = this.posicoes.filter(p => p.id != posicao.id);
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