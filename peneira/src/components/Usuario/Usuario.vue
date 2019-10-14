<template>
  <div>
    <Nav></Nav>
    <v-row class="my-5">
      <h2 class="mx-auto">Posições</h2>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="usuarios"
      calculate-widths
      sort-by="id"
      item-key="id"
      class="elevation-1 px-5"
      :search="search"
      :custom-filter="filterOnlyCapsText"
    >
      <template v-slot:top>
        <v-col cols="12">
          <v-text-field
            v-model="search"
            label="Pesquisar em usuarios cadastrados"
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
              <v-list-item-title @click="dialog = true; usuario = item">Editar</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title @click="dialog1 = true; usuario = item">Excluir</v-list-item-title>
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
          small
          v-on="on"
          @click="limparFormulario()"
        >
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-icon small dark v-on="on">mdi-plus</v-icon>
            </template>
            <span>Adicionar</span>
          </v-tooltip>
        </v-btn>
      </template>
      <v-card>
        <v-toolbar v-if="usuario.id" dark color="primary">Editar Avaliação</v-toolbar>
        <v-toolbar v-else dark color="primary">Cadastrar Avaliação</v-toolbar>
        <v-card-text>
          <v-container>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-if="usuario.id"
                  v-model="usuario.nome"
                  label="Nome da usuario"
                  prepend-inner-icon="mdi-account"
                ></v-text-field>
                <v-text-field
                  v-else
                  v-model="nome"
                  label="Nome do usuario"
                  prepend-inner-icon="mdi-account"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-if="usuario.id"
                  v-model="usuario.email"
                  label="Email da usuario"
                  prepend-inner-icon="mdi-email"
                ></v-text-field>
                <v-text-field
                  v-else
                  v-model="email"
                  label="Email do usuario"
                  prepend-inner-icon="mdi-email"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-if="usuario.id"
                  name="Perfil"
                  v-model="usuario.perfil.id"
                  :items="perfis"
                  item-text="nome"
                  item-value="id"
                  label="Perfil"
                  prepend-inner-icon="mdi-account-details"
                  required
                ></v-select>
                <v-select
                  v-else
                  v-model="perfil.id"
                  :items="perfis"
                  item-text="nome"
                  item-value="id"
                  label="Perfil"
                  name="perfil"
                  prepend-inner-icon="mdi-account-details"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="black" text @click="limparFormulario(); dialog = false">Cancelar</v-btn>
          <v-btn
            v-if="usuario.id"
            color="blue darken-1"
            text
            @click="editarUsuario(usuario);dialog=false"
          >Salvar</v-btn>
          <v-btn v-else color="blue darken-1" text @click="addUsuario();dialog=false">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog1" max-width="290">
      <v-card>
        <v-card-title class="headline">Atenção!</v-card-title>

        <v-card-text justify="center">Deseja realmente excluir o usuario {{usuario.nome}}?</v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn color="black" text @click="dialog1 = false">Cancelar</v-btn>
          <v-btn color="primary" text @click="removerUsuario(usuario); dialog1=false">Excluir</v-btn>
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
      search: "",
      nome: "",
      email: "",
      dtCadastro: "",
      dialog: false,
      dialog1: false,
      show1: false,
      show2: false,
      password1: "",
      password2: "",
      perfil: {},
      perfis: [],
      senhaAux1: "",
      senhaAux2: "",
      senha: "",
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match"
      },
      select: null,
      usuarios: [],
      usuario: {},
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
        { text: "Nome", value: "nome", align: "center" },
        { text: "E-mail", value: "email", align: "center" },
        { text: "Perfil", value: "perfil.nome", align: "center" },
        { text: "Data de Cadastro", value: "dtCadastro", align: "center" },
        { text: "Ações", value: "action", align: "center", sortable: false }
      ];
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    }
  },

  created() {
    this.$http
      .get(
        "https://my-json-server.typicode.com/rafafcasado/peneirasccp/usuarios/"
      )
      .then(res => res.json())
      .then(usuarios => (this.usuarios = usuarios));

    this.$http
      .get(
        "https://my-json-server.typicode.com/rafafcasado/peneirasccp/perfis/"
      )
      .then(res => res.json())
      .then(perfis => (this.perfis = perfis));
  },

  methods: {
    submit() {
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.select = null;
      this.checkbox = false;
    },

    removerUsuario(usuario) {
      this.$http
        .delete(
          `https://my-json-server.typicode.com/rafafcasado/peneirasccp/usuarios/${usuario.id}`
        )
        .then(() => {
          let indice = this.usuarios.indexOf(usuario);
          this.usuarios.splice(indice, 1);
          //this.usuarios = this.usuarios.filter(u => u.id != usuario.id);
          this.dialog1 = false;
        });
    },
    addUsuario() {
      let now = new Date();
      this.dtCadastro =
        now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
      let _senha = "";
      if (this.senha1 === this.senha2) {
        _senha = this.senha1;
      }
      this.perfil = this.perfis.filter(x => x.id == this.perfil.id)[0];
      let _usuario = {
        nome: this.nome,
        email: this.email,
        senha: _senha,
        dtCadastro: this.dtCadastro,
        perfil: {
          id: this.perfil.id,
          nome: this.perfil.nome
        },
        senhaAux1: this.senhaAux1,
        senhaAux2: this.senhaAux2
      };
      this.$http
        .post(
          "https://my-json-server.typicode.com/rafafcasado/peneirasccp/usuarios",
          _usuario
        )
        .then(res => res.json())
        .then(
          (this.nome = ""),
          (this.email = ""),
          (this.dtCadastro = ""),
          (this.perfil = {}),
          (this.senha = ""),
          (this.senhaAux1 = ""),
          (this.senhaAux2 = ""),
          this.$router.push("/usuarios")
        );
    },

    editarUsuario(_usuario) {
      let now = new Date();
      this.dtCadastro =
        now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
      let _senha = "";
      if (_usuario.senhaAux1 === _usuario.senhaAux2) {
        _senha = _usuario.senhaAux1;
      }
      this.perfil = this.perfis.filter(x => x.id == this.usuario.perfil.id)[0];
      let _usuarioEditar = {
        nome: _usuario.nome,
        email: _usuario.email,
        senha: _senha,
        senhaAux1: _usuario.senhaAux1,
        senhaAux2: _usuario.senhaAux2,
        dtCadastro: this.dtCadastro,
        perfil: {
          id: this.perfil.id,
          nome: this.perfil.nome
        }
      };
      this.$http.put(
        `https://my-json-server.typicode.com/rafafcasado/peneirasccp/usuarios/${_usuario.id}`,
        _usuarioEditar
      );
      this.$router.push("/usuarios");
    },
    limparFormulario() {
      this.nome = "";
      this.email = "";
      this.dtCadastro = "";
      this.usuario = {};
      this.perfil = {};
      this.senha = "";
      this.senhaAux1 = "";
      this.senhaAux2 = "";
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