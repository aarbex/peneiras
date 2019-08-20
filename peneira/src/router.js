import Vue from "vue";
import Router from "vue-router";
import Usuario from "./components/Usuario/Usuario.vue";
import Perfil from "./components/Perfil/Perfil.vue";
import PerfilModel from "./components/Perfil/PerfilModel.vue";
import Login from "./components/Login/Login.vue";
import Avaliacoes from "./components/Avaliacoes/Avaliacoes.vue";
import Atletas from "./components/Atletas/Atletas.vue";
import Categorias from "./components/Categorias/Categorias.vue";
import Treinador from "./components/Treinador/Treinador.vue";
import Status from "./components/Status/Status.vue";
import Permissoes from "./components/Permissoes/Permissoes.vue";
import UsuarioModel from "./components/Usuario/UsuarioModel.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/usuarios",
      component: Usuario
    },
    {
      path: "/usuarios/:id",
      component: Usuario
    },
    {
      path: "/usuario/:id",
      name: "UsuarioModelEdit",
      component: UsuarioModel
    },
    {
      path: "/usuario/",
      name: "UsuarioModel",
      component: UsuarioModel
    },
    {
      path: "/perfis",
      name: "Perfil",
      component: Perfil
    },
    {
      path: "/perfil/:id",
      name: "PerfilModelEdit",
      component: PerfilModel
    },
    {
      path: "/perfil/",
      name: "PerfilModel",
      component: PerfilModel
    },
    {
      path: "/avaliacoes",
      name: "Avaliacoes",
      component: Avaliacoes
    },
    {
      path: "/atletas",
      name: "Atletas",
      component: Atletas
    },
    {
      path: "/categorias",
      name: "Categorias",
      component: Categorias
    },
    {
      path: "/status",
      name: "Status",
      component: Status
    },
    {
      path: "/treinadores",
      name: "Treinador",
      component: Treinador
    },
    {
      path: "/permissoes",
      name: "Permissoes",
      component: Permissoes
    }
  ]
});
