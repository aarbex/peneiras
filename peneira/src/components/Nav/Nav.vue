<template>
  <nav>
    <v-app-bar dark app>
      <v-icon v-if="drawer" @click.stop="drawer = !drawer">mdi-arrow-collapse-left</v-icon>
      <v-icon v-else @click.stop="drawer = !drawer">mdi-menu</v-icon>
      <router-link to="/boas-vindas" tag="button">
        <v-app-bar-title
          align="center"
          cols="12"
          md="12"
          class="title text-uppercase font-weight-medium ps-5"
        >SISTEMA DE AVALIAÇÕES</v-app-bar-title>
      </router-link>
      <div class="flex-grow-1"></div>
      <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x>
        <template v-slot:activator="{ on }">
          <v-icon dark v-on="on">mdi-account</v-icon>
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar color="black">
                <span class="white--text headline">{{usuario.nome.substring(0,1)}}</span>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{usuario.nome}}</v-list-item-title>
                <v-list-item-subtitle>{{usuario.perfil}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-list dense>
            <v-list-item @click="dialog=true; buscarUsuario();zeraSenha()">
              <v-list-item-icon>
                <v-icon small>mdi-account-key</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Alterar senha</v-list-item-title>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-card-actions>
            <div class="flex-grow-1"></div>

            <v-btn small color="black" text @click="logout()">
              Sair
              <v-icon class="ms-2">mdi-exit-to-app</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer
      dense
      light
      app
      :mobile-break-point="600"
      hide-overlay
      v-model="drawer"
      class="px-2"
    >
      <v-row>
        <h3 class="my-3 mx-auto">SISTEMA DE AVALIAÇÕES</h3>
      </v-row>
      <v-divider></v-divider>
      <v-list dense>
        <h5 class="ms-4">INÍCIO</h5>
        <router-link to="/boas-vindas" tag="row">
          <v-list-item class="mb-3">
            <v-list-item-icon>
              <v-icon small>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Início</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <h5 class="ms-4">OPERACIONAL</h5>

        <router-link to="/avaliacoes" tag="row">
          <v-list-item>
            <v-list-item-icon>
              <v-icon small>mdi-clipboard-text</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Avaliações</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/atletas" tag="row">
          <v-list-item class="mb-2">
            <v-list-item-icon>
              <v-icon small>mdi-account-badge-horizontal</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Atletas</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <h5 class="ms-4">GESTÃO</h5>
        <router-link to="/categorias" tag="row">
          <v-list-item>
            <v-list-item-icon>
              <v-icon small>mdi-soccer</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Categorias</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/perfis" tag="row">
          <v-list-item>
            <v-list-item-icon>
              <v-icon small>mdi-account-details</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Perfil</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/posicoes" tag="row">
          <v-list-item>
            <v-list-item-icon>
              <v-icon small>mdi-soccer-field</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Posições</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/status" tag="row">
          <v-list-item>
            <v-list-item-icon>
              <v-icon small>mdi-progress-check</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Status</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/treinadores" tag="row">
          <v-list-item>
            <v-list-item-icon>
              <v-icon small>mdi-account-edit</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Treinadores</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/usuarios" tag="row">
          <v-list-item>
            <v-list-item-icon>
              <v-icon small>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Usuários</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>
    <v-dialog v-model="dialog" width="50%">
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
                  :rules="[rules.required]"
                  autofocus
                  hint="* Preenchimento Obrigatório"
                  persistent-hint
                  @keyup.enter="alterarSenha()"
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
                  hint="* Preenchimento Obrigatório"
                  persistent-hint
                  @keyup.enter="alterarSenha();"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="black" text @click="dialog = false">Cancelar</v-btn>
          <v-btn v-if="usuario.id" color="blue darken-1" text @click="alterarSenha()">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog1" max-width="290">
      <v-card>
        <v-card-title class="headline">Atenção!</v-card-title>

        <v-card-text justify="center">Senha alterada com sucesso!</v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn color="black" text @click="dialog1 = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog2" max-width="290">
      <v-card>
        <v-card-title class="headline">Atenção!</v-card-title>

        <v-card-text justify="center">As senhas não coincidem!</v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn color="black" text @click="dialog2 = false; dialog1=true">Fechar</v-btn>
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
    <v-dialog v-model="dialog4" max-width="290">
      <v-card>
        <v-card-title class="headline">Atenção!</v-card-title>

        <v-card-text justify="center">As senhas devem ser preenchidas!</v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn color="black" text @click="dialog4 = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </nav>
</template>

<script>
export default {
  data: () => ({
    usuario: JSON.parse(window.localStorage.getItem("usuario")),
    usuarioEditar: {},
    rules: {
      required: value => !!value || "Preenchimento obrigatório."
    },
    nome: "",
    email: "",
    perfilID: "",
    dtCadastro: "",
    usuarioID: "",
    senhaAux1: "",
    senhaAux2: "",
    date: "",
    dialog: false,
    dialog1: false,
    dialog2: false,
    dialog3: false,
    dialog4: false,
    card: false,
    menu: false,
    drawer: false,
    group: null,
    disabled: false,
    openDelay: "0",
    closeDelay: "0",
    value: false,
    active: true,
    show1: false,
    show2: false,
    avaliacoes: {
      route: "/avaliacoes"
    },
    atletas: {
      route: "/atletas"
    },
    items: [
      {
        title: "Administração",
        items: [
          { title: "Treinadores", route: "/treinadores" },
          { title: "Status", route: "/status" },
          { title: "Categorias", route: "/categorias" },
          { title: "Usuários", route: "/usuarios" },
          { title: "Perfis", route: "/perfis" },
          { title: "Posições", route: "/posicoes" }
        ]
      }
    ]
  }),

  watch: {
    group() {
      this.drawer = false;
    }
  },

  created() {
    this.usuario = JSON.parse(window.localStorage.getItem("usuario"));
    this.$http
      .get("usuarios/" + this.usuario.id, {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(usuario => (this.usuarioEditar = usuario));
  },

  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    logout() {
      /*this.$http.post("logout", {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      });*/
      window.location.href = window.location.origin + "/login";      
    },
    carregaUsuario(usuario) {
      this.nome = usuario.nome;
      this.email = usuario.email;
      this.perfilID = usuario.perfilID;
      this.dtCadastro = usuario.dtCadastro;
    },
    alterarSenha() {
      if (!this.senhaAux1 && !this.senhaAux2) {
        this.dialog4 = true;
      } else if (this.senhaAux1 === this.senhaAux2) {
        let _senha = this.senhaAux1;
        let _usuarioEditar = {
          id: this.usuarioEditar.id,
          nome: this.usuarioEditar.nome,
          email: this.usuarioEditar.email,
          perfilID: this.usuarioEditar.perfilID,
          senha: _senha,
          dtCadastro: this.usuarioEditar.dtCadastro
        };
        this.$http.put(`usuarios/${this.usuarioEditar.id}`, _usuarioEditar, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
            "Content-Type": "application/json"
          }
        });
        this.dialog = false;
        this.dialog1 = true;
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
.exact-active-class {
  background-color: rgb(250, 250, 250);
}
.v-btn:hover {
  background-color: dimgray;
}
.v-list-item:hover {
  background-color: dimgray;
}
.dropdown-content {
  display: none;
  position: absolute;
}

.dropdown-content:hover {
  display: block;
}
</style>