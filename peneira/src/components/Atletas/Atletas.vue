<template>
    <div>
        <Nav />
        <h1>Atletas</h1>
        <div style="padding: 0 20px">
          <div class="div-add">
      <router-link to="/atleta/">
        <v-btn class="mx-2" fab dark xSmall color="primary">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-icon medium dark v-on="on">mdi-plus</v-icon>
            </template>
            <span>Adicionar</span>
          </v-tooltip>
        </v-btn>
      </router-link>
    </div>
    <v-simple-table>
      <thead class="text-center">
        <th class="text-center">Nome</th>
        <th class="text-center">Email</th>
        <th class="text-center">CPF</th>
        <th class="text-center">RG</th>
        <th class="text-center">Posição</th>
        <th class="text-center">Data de Cadastro</th>
        <th class="text-center">Ações</th>
      </thead>
      <tbody v-if="atletas.length">
        <tr v-for="a in atletas" :key="a.id">
          <td class="text-center">{{a.nome}}</td>
          <td class="text-center">{{a.email}}</td>
          <td class="text-center">{{a.cpf}}</td>
          <td class="text-center">{{a.rg}}</td>
          <td class="text-center">{{a.posicao.nome}}</td>
          <td class="text-center">{{a.dtCadastro}}</td>
          <td class="text-center" style="width: 20%">
            <router-link :to="'/atleta/detalhe/' + a.id" tag="button">
              <v-btn class="mx-2" fab dark xSmall color="black">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-icon medium dark v-on="on">mdi-eye</v-icon>
                  </template>
                  <span>Detalhes</span>
                </v-tooltip>
              </v-btn>
            </router-link>
            <router-link :to="'/atleta/' + a.id">
              <v-btn class="mx-2" fab dark xSmall color="primary">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-icon medium dark v-on="on">mdi-pencil</v-icon>
                  </template>
                  <span>Editar</span>
                </v-tooltip>
              </v-btn>
            </router-link>
            <v-btn class="mx-2" fab dark xSmall color="error" @click="atleta = a;dialog1 = true">
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
        </div>
    <v-dialog v-model="dialog1" max-width="290">
      <v-card>
        <v-card-title class="headline">Atenção!</v-card-title>
        <v-card-text>Deseja realmente excluir o atleta {{atleta.nome}}?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="dialog1 = false">Cancelar</v-btn>
          <v-btn color="success" text @click="removerAtleta(atleta)">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
</template>

<script>
import Nav from "../Nav/Nav";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email }
  },

  components: {
    Nav
  },

  data() {
    return {      
      dialog1: false, 
      atletas: [],
      atleta: {},
      posicoes: [],
      id: this.$route.params.id
    };
  },

  created() {
    this.$http
      .get("http://localhost:3000/atletas/")
      .then(res => res.json())
      .then(atletas => (this.atletas = atletas));

    this.$http
      .get("http://localhost:3000/posicoes")
      .then(res => res.json())
      .then(posicoes => (this.posicoes = posicoes));
  },
  beforeMount() {
    this.$http
      .get("http://localhost:3000/atletas/")
      .then(res => res.json())
      .then(atletas => (this.atletas = atletas));
  },

  methods: { 
    removerAtleta(atleta) {
      this.$http
        .delete(`http://localhost:3000/atletas/${atleta.id}`)
        .then(() => {
          let indice = this.atletas.indexOf(atleta);
          this.atletas.splice(indice, 1);
          //this.atletas = this.atletas.filter(u => u.id != atleta.id);
          this.dialog1 = false;
        });
    }
  }
};
</script>

<style>
h1 {
  text-align: center;
  padding: 20px 0px;
}
table {
  width: 100%;
  padding: 20px opx;
  margin: 0 auto;
}
.div-add {
  text-align: right;
  padding-bottom: 10px;
}
</style>