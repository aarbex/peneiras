<template>
  <div>
    <Nav />
    <v-row class="my-5">
      <h2 class="mx-auto">Perfil</h2>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="perfis"
      calculate-widths
      sort-by="nome"
      item-key="id"
      class="elevation-1 px-5"
      :search="search"
      :custom-filter="filterOnlyCapsText"
      mobile-breakpoint="0"
    >
      <template v-slot:top>
        <v-col cols="12">
          <v-text-field
            v-model="search"
            label="Pesquisar em perfis cadastradas"
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
              <v-list-item-title @click="dialog = true; perfil = item">Editar</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title @click="dialog1 = true; perfil = item">Excluir</v-list-item-title>
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
    <v-dialog v-model="dialog" width="80%">
      <template v-slot:activator="{ on }">
        <v-btn
          style="position: fixed; z-index: 100; right: 10pt; bottom: 1pt;"
          color="primary"
          class="ms-5 mb-5"
          fab
          dark
          v-on="on"
          @click="limparFormulario()"
        >
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-icon dark v-on="on">mdi-plus</v-icon>
            </template>
            <span>Adicionar</span>
          </v-tooltip>
        </v-btn>
      </template>
      <v-card>
        <v-toolbar v-if="perfil.id" dark color="primary">Editar Avaliação</v-toolbar>
        <v-toolbar v-else dark color="primary">Cadastrar Avaliação</v-toolbar>
        <v-card-text>
          <v-container>
            <v-row dense>
              <v-col cols="12" sm="6" md="9">
                <v-text-field
                  v-if="perfil.id"
                  v-model="perfil.nome"
                  label="Nome do Perfil"
                  prepend-inner-icon="mdi-account-details"
                ></v-text-field>
                <v-text-field
                  v-else
                  v-model="nome"
                  label="Nome do Perfil"
                  prepend-inner-icon="mdi-account-details"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="black" text @click="limparFormulario(); dialog = false">Cancelar</v-btn>
          <v-btn
            v-if="perfil.id"
            color="blue darken-1"
            text
            @click="editarPerfil(perfil);dialog=false"
          >Salvar</v-btn>
          <v-btn v-else color="blue darken-1" text @click="addPerfil();dialog=false">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog1" max-width="290">
      <v-card>
        <v-card-title class="headline">Atenção!</v-card-title>

        <v-card-text justify="center">Deseja realmente excluir o perfil {{perfil.nome}}?</v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn color="black" text @click="dialog1 = false">Cancelar</v-btn>
          <v-btn color="primary" text @click="removerPerfil(perfil); dialog1=false">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="flex-grow-1 mx-auto" align="center">
      <small class="mx-5">Sport Club Corinthians Paulista © 2019</small>
      <br />
      <small class="mx-5">Todos os direitos reservados</small>
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
      dialog: false,
      dialog1: false,
      nome: "",
      nameRules: [v => !!v || "O nome da perfil é obrigatório!"],
      perfis: [],
      perfil: {},
      dtCadastro: "",
      id: this.$route.params.id
    };
  },
  computed: {
    headers() {
      return [
        {
          text: "ID",
          align: "center",
          value: "id"
        },
        {
          text: "Perfil",
          align: "center",
          value: "nome"
        },
        {
          text: "Data de Cadastro",
          value: "dtCadastro",
          align: "center"
        },

        {
          text: "Ações",
          value: "action",
          align: "center",
          sortable: false
        }
      ];
    }
  },

  created() {
    this.$http
      .get("https://my-json-server.typicode.com/rafafcasado/peneirasccp/perfis")
      .then(res => res.json())
      .then(perfis => (this.perfis = perfis));
  },

  beforeMount() {
    this.$http
      .get("https://my-json-server.typicode.com/rafafcasado/peneirasccp/perfis")
      .then(res => res.json())
      .then(perfis => (this.perfis = perfis));
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
    adicionarOuEditar(perfil) {
      if (perfil.id) {
        this.addPerfil();
      } else {
        this.editarPerfil(perfil);
      }
    },
    removerPerfil(perfil) {
      this.$http
        .delete(
          `https://my-json-server.typicode.com/rafafcasado/peneirasccp/perfis/${perfil.id}`
        )
        .then(() => {
          let indice = this.perfis.indexOf(perfil);
          this.perfis.splice(indice, 1);
          //this.perfis = this.perfis.filter(p => p.id != perfil.id);
          this.dialog1 = false;
        });
    },
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
          .post(
            "https://my-json-server.typicode.com/rafafcasado/peneirasccp/perfis/",
            _perfil
          )
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
        `https://my-json-server.typicode.com/rafafcasado/peneirasccp/perfis/${_perfilEditar.id}`,
        _perfilEditar
      );
      this.$router.push("/perfis");
    },
    limparFormulario() {
      this.nome = "";
      this.dtCadastro = "";
      this.perfil = {};
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