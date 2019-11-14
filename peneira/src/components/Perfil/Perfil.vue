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
            <v-list-item @click="dialog = true; perfil = item; carregaPerfil(item)">
              <v-list-item-title text>Editar</v-list-item-title>
            </v-list-item>
            <v-list-item @click="dialog1 = true; perfil = item">
              <v-list-item-title text>Excluir</v-list-item-title>
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
              <v-col cols="12">
                <v-text-field
                  v-if="perfil.id"
                  v-model="nome"
                  label="Nome do Perfil"
                  prepend-inner-icon="mdi-account-details"
                  autofocus
                  required
                  :rules="[rules.required]"
                  @keyup.enter="editarPerfil(perfil)"
                ></v-text-field>
                <v-text-field
                  v-else
                  v-model="nome"
                  label="Nome do Perfil"
                  prepend-inner-icon="mdi-account-details"
                  autofocus
                  required
                  :rules="[rules.required]"
                  @keyup.enter="verificaPerfil()"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="black" text @click="limparFormulario(); dialog = false">Cancelar</v-btn>
          <v-btn v-if="perfil.id" color="blue darken-1" text @click="editarPerfil(perfil)">Salvar</v-btn>
          <v-btn v-else color="blue darken-1" text @click="verificaPerfil()">Salvar</v-btn>
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
    <v-dialog v-model="dialog2" max-width="290">
      <v-card>
        <v-card-title class="headline">Atenção!</v-card-title>

        <v-card-text justify="center">O perfil "{{this.nome}}" já está cadastrado!</v-card-text>

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
      perfis: [],
      perfil: {},
      perfilVerificado: "",
      dtCadastro: "",
      date: new Date().toISOString().substr(0, 10),
      id: this.$route.params.id
    };
  },
  computed: {
    headers() {
      return [
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
      .get("perfis", {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      })
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
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    removerPerfil(perfil) {
      this.$http
        .delete(`perfis/${perfil.id}`, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
            "Content-Type": "application/json"
          }
        })
        .then(() => {
          let indice = this.perfis.indexOf(perfil);
          this.perfis.splice(indice, 1);
          //this.perfis = this.perfis.filter(p => p.id != perfil.id);
          this.dialog1 = false;
        });
    },
    verificaPerfil() {
      this.perfilVerificado = this.perfis.filter(x => x.nome === this.nome)[0];
      if (this.perfilVerificado) {
        this.dialog2 = true;
      } else {
        this.addPerfil();
        this.perfilVerificado = "";
      }
    },
    addPerfil() {
      this.dtCadastro = this.formatDate(this.date);
      let _perfil = {
        nome: this.nome,
        dtCadastro: this.dtCadastro
      };
      if (this.nome.length > 0) {
        this.$http
          .post("perfis", _perfil, {
            headers: {
              Authorization: "Bearer " + window.localStorage.getItem("token"),
              "Content-Type": "application/json"
            }
          })
          .then(res => res.json());
        window.location.href = window.location.origin + "/perfis";
      }
    },

    editarPerfil(_perfil) {
      let _perfilEditar = {
        id: _perfil.id,
        nome: this.nome,
        dtCadastro: this.dtCadastro
      };
      if (this.nome.length > 0) {
        this.$http.put(`perfis/${_perfilEditar.id}`, _perfilEditar, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
            "Content-Type": "application/json"
          }
        });
        window.location.href = window.location.origin + "/perfis";
      }
    },
    carregaPerfil(perfil) {
      this.nome = perfil.nome;
      this.dtCadastro = perfil.dtCadastro;
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