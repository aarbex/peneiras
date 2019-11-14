<template>
  <div>
    <Nav />
    <v-row class="my-5">
      <h2 class="mx-auto">Treinadores</h2>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="treinadores"
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
            label="Pesquisar em treinadores cadastrados"
            prepend-inner-icon="mdi-magnify"
            filled
            clearable
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
            <v-list-item @click="dialog = true; treinador = item; carregaTreinador(item)">
              <v-list-item-title>Editar</v-list-item-title>
            </v-list-item>
            <v-list-item @click="dialog1 = true; treinador = item">
              <v-list-item-title>Excluir</v-list-item-title>
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
        <v-toolbar v-if="treinador.id" dark color="primary">Editar Avaliação</v-toolbar>
        <v-toolbar v-else dark color="primary">Cadastrar Avaliação</v-toolbar>
        <v-card-text>
          <v-container>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-if="treinador.id"
                  v-model="nome"
                  label="Nome da treinador"
                  prepend-inner-icon="mdi-account-edit"
                  autofocus
                  @keyup.enter="editarTreinador(treinador)"
                  required
                  :rules="[rules.required]"
                ></v-text-field>
                <v-text-field
                  v-else
                  v-model="nome"
                  label="Nome do treinador"
                  prepend-inner-icon="mdi-account-edit"
                  autofocus
                  @keyup.enter="verificaTreinador()"
                  required
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="black" text @click="limparFormulario(); dialog = false">Cancelar</v-btn>
          <v-btn
            v-if="treinador.id"
            color="blue darken-1"
            text
            @click="editarTreinador(treinador)"
          >Salvar</v-btn>
          <v-btn v-else color="blue darken-1" text @click="verificaTreinador()">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog1" max-width="290">
      <v-card>
        <v-card-title class="headline">Atenção!</v-card-title>

        <v-card-text justify="center">Deseja realmente excluir o treinador {{treinador.nome}}?</v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn color="black" text @click="dialog1 = false">Cancelar</v-btn>
          <v-btn color="primary" text @click="removerTreinador(treinador); dialog1=false">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog2" max-width="290">
      <v-card>
        <v-card-title class="headline">Atenção!</v-card-title>

        <v-card-text justify="center">Já existe um treinador cadastrado com esse nome!</v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn color="black" text @click="dialog2 = false">Fechar</v-btn>
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
      dialog2: false,
      nome: "",
      rules: {
        required: value => !!value || "Preenchimento obrigatório."
      },
      treinadores: [],
      treinador: {},
      treinadorVerificado: "",
      dtCadastro: "",
      date: new Date().toISOString().substr(0, 10),
      id: this.$route.params.id
    };
  },
  computed: {
    headers() {
      return [
        {
          text: "Treinador",
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
      .get("treinadores", {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(treinadores => (this.treinadores = treinadores));
  },

  beforeMount() {
    this.$http
      .get("treinadores", {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(treinadores => (this.treinadores = treinadores));
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
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    removerTreinador(treinador) {
      this.$http
        .delete(`treinadores/${treinador.id}`, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
            "Content-Type": "application/json"
          }
        })
        .then(() => {
          let indice = this.treinadores.indexOf(treinador);
          this.treinadores.splice(indice, 1);
          //this.treinadores = this.treinadores.filter(p => p.id != treinador.id);
          this.dialog1 = false;
        });
    },
    verificaTreinador() {
      this.treinadorVerificado = this.treinadores.filter(
        x => x.nome === this.nome
      )[0];
      if (this.treinadorVerificado) {
        this.dialog2 = true;
      } else {
        this.addTreinador();
        this.treinadorVerificado = "";
      }
    },
    addTreinador() {
      this.dtCadastro = this.formatDate(this.date);
      let _treinador = {
        nome: this.nome,
        dtCadastro: this.dtCadastro
      };
      if (this.nome.length > 0) {
        this.$http
          .post("treinadores", _treinador, {
            headers: {
              Authorization: "Bearer " + window.localStorage.getItem("token"),
              "Content-Type": "application/json"
            }
          })
          .then(res => res.json());
        window.location.href = window.location.origin + "/treinadores";
      }
    },

    editarTreinador(_treinador) {
      let _treinadorEditar = {
        id: _treinador.id,
        nome: this.nome,
        dtCadastro: this.dtCadastro
      };
      if (this.nome.length > 0) {
        this.$http.put(`treinadores/${_treinadorEditar.id}`, _treinadorEditar, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
            "Content-Type": "application/json"
          }
        });
        window.location.href = window.location.origin + "/treinadores";
      }
    },
    carregaTreinador(treinador) {
      this.nome = treinador.nome;
      this.dtCadastro = treinador.dtCadastro;
    },
    limparFormulario() {
      this.nome = "";
      this.dtCadastro = "";
      this.treinador = {};
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