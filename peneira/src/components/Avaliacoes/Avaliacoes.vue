<template>
  <div>
    <Nav />
    <h1>Avaliações</h1>
    <div>
      <v-data-table
        :headers="headers"
        :items="avaliacoes"
        sort-by="dtInicio"
        item-key="id"
        class="elevation-1"
        :search="search"
        :custom-filter="filterOnlyCapsText"
      >
        <template v-slot:top>
          <div style="display:flex">
            <div style="width:1000%">
              <v-text-field v-model="search" label="Buscar..." class="mx-4"></v-text-field>
            </div>
            <!--div-- class="div-add">
              
                <v-btn class="mx-2" fab dark xSmall color="primary" style="margin: 15px">
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-icon medium dark v-on="on">mdi-plus</v-icon>
                    </template>
                    <span>Adicionar</span>
                  </v-tooltip>
                </v-btn>
                
            </!--div-->
          </div>
        </template>
        <!--template-- v-slot:item.action="{ item }">
          <router-link :to="'/avaliacao/detalhe/' + item.id" tag="button">
            <v-btn class="mx-2" fab dark xSmall color="black">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon medium dark v-on="on">mdi-eye</v-icon>
                </template>
                <span>Detalhes</span>
              </v-tooltip>
            </v-btn>
          </router-link>
          <router-link :to="'/avaliacao/' + item.id" tag="button">
            <v-btn class="mx-2" fab dark xSmall color="primary">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon medium dark v-on="on">mdi-pencil</v-icon>
                </template>
                <span>Editar</span>
              </v-tooltip>
            </v-btn>
          </router-link>
          <v-btn
            class="mx-2"
            fab
            dark
            xSmall
            color="error"
            @click="removerAvaliacao(item); dialog1 = true"
          >
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-icon medium dark v-on="on">mdi-trash-can</v-icon>
              </template>
              <span>Excluir</span>
            </v-tooltip>
          </v-btn>
        </!--template-->
        <template v-slot:item.action="{ item }">
          <v-menu>
            <template v-slot:activator="{ on }">
              <v-btn light icon v-on="on">
                <v-icon primary>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list bottom>
              <router-link :to="'/avaliacao/detalhe/' + item.id" tag="button">
                <v-list-item>
                  <v-list-item-title xSmall>Detalhes</v-list-item-title>
                </v-list-item>
              </router-link>
              <br />
              <router-link :to="'/avaliacao/' + item.id" tag="button">
                <v-list-item>
                  <v-list-item-title>Editar</v-list-item-title>
                </v-list-item>
              </router-link>
              <v-list-item>
                <v-list-item-title @click="removerAvaliacao(item); dialog1 = true">Excluir</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
        <template v-slot:body.append>
          <tr>
            <td></td>
            <router-link to="/avaliacao/">
              <v-btn absolute dark fab small right color="primary">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </router-link>
            <td colspan="4"></td>
          </tr>
        </template>
      </v-data-table>
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
      search: "",
      avaliacoes: []
      
    };
  },
  computed: {
    headers() {
      return [
        {
          text: "Atleta",
          align: "left",
          sortable: false,
          value: "nome"
        },
        { text: "CPF", value: "cpf" },
        { text: "Categoria", value: "categoria.nome" },
        { text: "Treinador", value: "treinador.nome" },
        { text: "Posição", value: "posicao" },
        { text: "Data Início", value: "dtInicio" },
        { text: "Data Dispensa", value: "dtDispensa" },
        { text: "Status", value: "status.nome" },
        { text: "Nota", value: "nota" },
        { text: "Ações", value: "action", align: "center", sortable: false }
      ];
    }
  },

  beforeMount() {
    this.$http
      .get(
        "https://my-json-server.typicode.com/rafafcasado/peneirasccp/avaliacoes/"
      )
      .then(res => res.json())
      .then(avaliacoes => (this.avaliacoes = avaliacoes));
  },

  methods: {
    filterOnlyCapsText(value, search) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value
          .toString()
          .toLowerCase()
          .indexOf(search) !== -1
      );
    },
    removerAvaliacao(avaliacao) {
      this.$http
        .delete(
          `https://my-json-server.typicode.com/rafafcasado/peneirasccp/avaliacoes/${avaliacao.id}`
        )
        .then(() => {
          let indice = this.avaliacoes.indexOf(avaliacao);
          this.avaliacoes.splice(indice, 1);
          //this.avaliacoes = this.avaliacoes.filter(u => u.id != avaliacao.id);
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
  width: 100%;
}
</style>