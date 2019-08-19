import Vue from "vue";
import Router from "vue-router";
import Usuario from "./components/Usuario/Usuario.vue";
import Perfil from "./components/Perfil/Perfil.vue";
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
      nome: "Login",
      component: Login
    },
    {
      path: "/usuarios",
      nome: "Usuario",
      component: Usuario
    },
    {
      path: "/usuarios/:id",
      nome: "Usuario",
      component: Usuario
    },
    {
      path: "/usuario/:id",
      nome: "UsuarioModel",
      component: UsuarioModel
    },
    {
      path: "/usuario/",
      nome: "UsuarioModel",
      component: UsuarioModel
    },
    {
      path: "/perfil",
      nome: "Perfil",
      component: Perfil
    },
    {
      path: "/perfil/:id",
      nome: "Perfil",
      component: Perfil
    },
    {
      path: "/avaliacoes",
      nome: "Avaliacoes",
      component: Avaliacoes
    },
    {
      path: "/atletas",
      nome: "Atletas",
      component: Atletas
    },
    {
      path: "/categorias",
      nome: "Categorias",
      component: Categorias
    },
    {
      path: "/status",
      nome: "Status",
      component: Status
    },
    {
      path: "/treinadores",
      nome: "Treinador",
      component: Treinador
    },
    {
      path: "/permissoes",
      nome: "Permissoes",
      component: Permissoes
    }
  ]
});
