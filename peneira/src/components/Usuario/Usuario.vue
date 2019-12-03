<template>
  <div>
    <Nav></Nav>
    <v-row class="my-5">
      <h2 class="mx-auto">Usuarios</h2>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="usuarios"
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
            label="Pesquisar em usuarios cadastrados"
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
            <v-list-item @click="dialog5 = true; usuario = item">
              <v-list-item-title>Redefinir senha</v-list-item-title>
            </v-list-item>
            <v-list-item @click="dialog = true; usuario = item; carregaUsuario(item)">
              <v-list-item-title>Editar</v-list-item-title>
            </v-list-item>
            <v-list-item @click="dialog1 = true; usuario = item">
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
        <v-toolbar v-if="usuario.id" dark color="primary">Editar Usuários</v-toolbar>
        <v-toolbar v-else dark color="primary">Cadastrar Usuários</v-toolbar>
        <v-card-text>
          <v-container>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="nome"
                  label="Nome do usuario"
                  prepend-inner-icon="mdi-account"
                  autofocus
                  required
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="email"
                  label="Email da usuario"
                  prepend-inner-icon="mdi-email"
                  required
                  :rules="[rules.required, rules.email]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  name="Perfil"
                  v-model="perfilID"
                  :items="perfis"
                  item-text="nome"
                  item-value="id"
                  label="Perfil"
                  prepend-inner-icon="mdi-account-details"
                  required
                  :rules="[rules.required]"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-if="!usuario.id"
                  v-model="senhaAux1"
                  label="Digite a senha"
                  prepend-inner-icon="mdi-lock"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                  required
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-if="!usuario.id"
                  v-model="senhaAux2"
                  label="Repita a senha"
                  prepend-inner-icon="mdi-lock"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show2 ? 'text' : 'password'"
                  @click:append="show2 = !show2"
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
          <v-btn v-if="usuario.id" color="blue darken-1" text @click="editarUsuario(usuario)">Salvar</v-btn>
          <v-btn v-else color="blue darken-1" text @click="verificaUsuario()">Salvar</v-btn>
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
    <v-dialog v-model="dialog2" max-width="290">
      <v-card>
        <v-card-title class="headline">Atenção!</v-card-title>

        <v-card-text justify="center">Já existe um usuário cadastrado com o e-mail "{{this.email}}"!</v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn color="black" text @click="dialog2 = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog3" max-width="290">
      <v-card>
        <v-card-title class="headline">Atenção!</v-card-title>

        <v-card-text justify="center">As senhas não coincidem!</v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn color="black" text @click="dialog3 = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog7" max-width="290">
      <v-card>
        <v-card-title class="headline">Atenção!</v-card-title>

        <v-card-text justify="center">As senhas devem ser preenchidas!</v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn color="black" text @click="dialog7 = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog5" width="50%">
      <v-card>
        <v-toolbar dark color="primary">Alterar senha</v-toolbar>
        <v-card-text>
          <v-container>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="senhaAux1"
                  label="Digite a senha"
                  prepend-inner-icon="mdi-lock"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  @click:append="show1 = !show1"
                  required
                  autofocus
                  :rules="[rules.required]"
                  @keyup.enter="alterarSenha(usuario)"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="senhaAux2"
                  label="Repita a senha"
                  prepend-inner-icon="mdi-lock"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show2 ? 'text' : 'password'"
                  @click:append="show2 = !show2"
                  required
                  :rules="[rules.required]"
                  @keyup.enter="alterarSenha(usuario)"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="black" text @click="dialog5 = false;zeraSenha()">Cancelar</v-btn>
          <v-btn v-if="usuario.id" color="blue darken-1" text @click="alterarSenha(usuario);">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog6" max-width="290">
      <v-card>
        <v-card-title class="headline">Atenção!</v-card-title>

        <v-card-text justify="center">Senha alterada com sucesso!</v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn color="black" text @click="dialog6 = false">Fechar</v-btn>
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
      perfilID: "",
      dtCadastro: "",
      date: new Date().toISOString().substr(0, 10),
      dialog: false,
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialog7: false,
      dialog5: false,
      dialog6: false,
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
        required: value => !!value || "Preenchimento obrigatório.",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "E-mail inválido.";
        }
      },
      select: null,
      usuarios: [],
      usuario: {},
      usuarioVerificado: "",
      usuarioSessao: JSON.parse(window.localStorage.getItem("usuario")),
      id: this.$route.params.id
    };
  },
  computed: {
    headers() {
      return [
        { text: "Nome", value: "nome", align: "center" },
        { text: "E-mail", value: "email", align: "center" },
        {
          text: "Perfil",
          value: "perfil",
          align: "center"
        },
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
      .get("usuarios", {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(usuarios => (this.usuarios = usuarios.filter(x => x.dtExclusao == null)));
    this.$http
      .get("perfis", {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(perfis => (this.perfis = perfis.filter(x => x.dtExclusao == null)));
  },

  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    removerUsuario(_usuario) {
      let _usuarioEditar = {
        nome: _usuario.nome,
        email: _usuario.email,
        perfilID: _usuario.perfilID,
        senha: _usuario.senha,
        dtCadastro: _usuario.dtCadastro,
        dtExclusao: this.formatDate(this.date),
        usuarioExclusao: this.usuarioSessao.nome
      };
      this.$http.put(`usuarios/${_usuario.id}`, _usuarioEditar, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
            "Content-Type": "application/json"
          }
        });
        window.location.href = window.location.origin + "/usuarios";
    },
    addUsuario() {
      this.dtCadastro = this.formatDate(this.date);
      let _senha;
      if (!this.senhaAux1 && !this.senhaAux2) {
        this.dialog7 = true;
      } else if (this.senhaAux1 === this.senhaAux2) {
        _senha = this.senhaAux1;
        this.perfil = this.perfis.filter(x => x.id == this.perfilID)[0];
        let _usuario = {
          nome: this.nome,
          email: this.email,
          senha: _senha,
          dtCadastro: this.dtCadastro,
          perfilID: this.perfil.id
        };
        this.$http
          .post("usuarios", _usuario, {
            headers: {
              Authorization: "Bearer " + window.localStorage.getItem("token"),
              "Content-Type": "application/json"
            }
          })
          .then(res => res.json());
        window.location.href = window.location.origin + "/usuarios";
      } else {
        this.dialog3 = true;
      }
    },
    verificaUsuario() {
      this.usuarioVerificado = this.usuarios.filter(
        x => x.email === this.email
      )[0];
      if (this.usuarioVerificado) {
        this.dialog2 = true;
      } else {
        this.addUsuario();
        this.usuarioVerificado = "";
      }
    },
    editarUsuario(_usuario) {
      this.perfil = this.perfis.filter(x => x.id == this.perfilID)[0];
      let _usuarioEditar = {
        nome: this.nome,
        email: this.email,
        perfilID: this.perfil.id,
        senha: this.senha,
        dtCadastro: this.dtCadastro
      };
      if (this.nome.length > 0 && this.email.length > 0) {
        this.$http.put(`usuarios/${_usuario.id}`, _usuarioEditar, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
            "Content-Type": "application/json"
          }
        });
        window.location.href = window.location.origin + "/usuarios";
      }
    },

    carregaUsuario(usuario) {
      this.nome = usuario.nome;
      this.email = usuario.email;
      this.perfilID = usuario.perfilID;
      this.senha = usuario.senha;
      this.dtCadastro = usuario.dtCadastro;
    },
    limparFormulario() {
      this.nome = "";
      this.email = "";
      this.dtCadastro = "";
      this.usuario = {};
      this.perfilID = "";
      this.senha = "";
      this.senhaAux1 = "";
      this.senhaAux2 = "";
    },
    alterarSenha(usuario) {
      if (this.senhaAux1 === this.senhaAux2) {
        let _senha = this.senhaAux1;
        let _usuarioEditar = {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          perfilID: usuario.perfilID,
          senha: _senha,
          dtCadastro: usuario.dtCadastro
        };
        if (this.senhaAux1 > 0 && this.senhaAux2 > 0) {
          this.$http.put(`usuarios/${this.usuario.id}`, _usuarioEditar, {
            headers: {
              Authorization: "Bearer " + window.localStorage.getItem("token"),
              "Content-Type": "application/json"
            }
          });
          this.dialog5 = false;
          this.dialog6 = true;
          this.zeraSenha();
        }
      } else {
        this.dialog3 = true;
      }
    },
    zeraSenha() {
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