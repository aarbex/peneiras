<template>
  <div>
    <Nav />
    <v-row class="my-5">
      <h2 class="mx-auto">Categorias</h2>
    </v-row>
    <!--v-simple-table class="text-center" style="width: 70%; margin: 0 auto">
      <thead class="text-center">
        <th class="text-center">ID</th>
        <th class="text-center">Nome</th>
        <th class="text-center">Data Cadastro</th>
        <th class="text-center">Ações</th>
      </thead>
      <tbody v-if="categorias.length">
        <tr v-for="c in categorias" :key="c.id">
          <td>{{c.id}}</td>
          <td>{{c.nome}}</td>
          <td>{{c.dtCadastro}}</td>
          <td style="width:32%">
            <router-link :to="'/categoria/' + c.id">
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
              @click="categoria = c;dialog2=true"
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
    </!--v-simple-table>-->
    <v-data-table
      :headers="headers"
      :items="categorias"
      calculate-widths
      sort-by="nome"
      item-key="id"
      class="elevation-1 px-5"
      :search="search"
      :custom-filter="filterOnlyCapsText"
    >
      <template v-slot:top>
        <v-col cols="12">
          <v-text-field
            v-model="search"
            label="Pesquisar em categorias cadastradas"
            prepend-inner-icon="mdi-magnify"
            filled
          ></v-text-field>
        </v-col>
      </template>
      <template v-slot:item.action="{ item }">
        <v-menu>
          <template v-slot:activator="{ on }">
            <v-btn light icon v-on="on">
              <v-icon primary>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list bottom>
            <v-list-item>
              <v-list-item-title @click="dialog = true; categoria = item">Editar</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title @click="dialog1 = true; categoria = item">Excluir</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-slot:body.append>
        <tr>
          <td></td>

          <td colspan="4"></td>
        </tr>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog2" max-width="290">
      <v-card>
        <v-card-title class="headline">Atenção!!!</v-card-title>

        <v-card-text>Deseja realmente excluir a categoria {{categoria.nome}}?</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="error" text @click="dialog2 = false">Cancelar</v-btn>

          <v-btn color="success" text @click="removerCategoria(categoria)">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="flex-grow-1">
      <small class="mx-5">Sport Club Corinthians Paulista © 2019 - Todos os direitos reservados</small>
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
      dialog2: false,
      nome: "",
      nameRules: [v => !!v || "O nome da categoria é obrigatório!"],
      categorias: [],
      categoria: {},
      id: this.$route.params.id
    };
  },
  computed: {
    headers() {
      return [
        {
          text: "Categoria",
          align: "left",
          value: "nome",

          width: "50%"
        },
        { text: "Data de Cadastro", value: "dtCadastro", width: "40%" },
        {
          text: "Ações",
          width: "10%",
          value: "action",
          align: "center",
          sortable: false
        }
      ];
    }
  },

  created() {
    this.$http
      .get(
        "https://my-json-server.typicode.com/rafafcasado/peneirasccp/categorias"
      )
      .then(res => res.json())
      .then(categorias => (this.categorias = categorias));
  },

  beforeMount() {
    this.$http
      .get(
        "https://my-json-server.typicode.com/rafafcasado/peneirasccp/categorias"
      )
      .then(res => res.json())
      .then(categorias => (this.categorias = categorias));
  },

  methods: {
    removerCategoria(categoria) {
      this.$http
        .delete(
          `https://my-json-server.typicode.com/rafafcasado/peneirasccp/categorias/${categoria.id}`
        )
        .then(() => {
          let indice = this.categorias.indexOf(categoria);
          this.categorias.splice(indice, 1);
          //this.categorias = this.categorias.filter(p => p.id != categoria.id);
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