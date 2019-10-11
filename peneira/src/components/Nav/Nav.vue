<!--template>
  <div>
    <v-app-bar app text-center color="black">
      <v-toolbar-title class="headline text-uppercase"></v-toolbar-title>
      <div style="margin: 0 auto; display: inline-flex">
        <router-link :to="avaliacoes.route" tag="button">
          <v-btn color="white" text>Avaliações</v-btn>
        </router-link>
        <router-link :to="atletas.route" tag="button">
          <v-btn color="white" text>Atletas</v-btn>
        </router-link>
        <div class="text-center">
          <v-menu open-on-hover botton offset-y>
            <template v-slot:activator="{ on }">
              <v-btn color="white" text v-on="on">Administração</v-btn>
            </template>

            <v-list color="black">
              <v-list-item
                style="color:white"
                v-for="(item, index) in items"
                :key="index"
                :to="item.route"
              >
                <v-list-item-title style="color:white">{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </v-app-bar>
  </div>
</!--template>-->

<template>
  <nav>
    <v-app-bar dark app>
      <v-icon @click.stop="drawer = !drawer">mdi-menu</v-icon>
      <v-app-bar-title
        :justify="left"
        align="center"
        cols="12"
        md="12"
        class="title text-uppercase font-weight-medium ps-5"
      >SISTEMA DE PENEIRAS</v-app-bar-title>
      <div class="flex-grow-1"></div>
      <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x>
        <template v-slot:activator="{ on }">
          <v-icon dark v-on="on">mdi-account</v-icon>
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar color="black">
                <span class="white--text headline">F</span>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{usuario.nome}}</v-list-item-title>
                <v-list-item-subtitle>{{usuario.perfil.nome}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-list dense>
            <v-list-item>
              <v-list-item-icon>
                <v-icon small>mdi-account-key</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Alterar senha</v-list-item-title>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-card-actions>
            <div class="flex-grow-1"></div>

            <v-btn small color="black" text @click="menu = false">
              Sair
              <v-icon class="ms-2">mdi-exit-to-app</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer dense light absolute temporary v-model="drawer" class="px-2">
      <h3 class="my-3">SISTEMA DE PENEIRAS</h3>

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
  </nav>
</template>

<script>
export default {
  data: () => ({
    usuario: {
      nome: "Fulano de Tal",
      perfil: {
        nome: "Administrador"
      }
    },

    card: false,
    drawer: false,
    group: null,
    disabled: false,
    openDelay: "0",
    closeDelay: "0",
    value: false,
    active: true,
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