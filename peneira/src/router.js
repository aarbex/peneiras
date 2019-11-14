import Vue from "vue";
import Router from "vue-router";
import Usuario from "./components/Usuario/Usuario.vue";
import Perfil from "./components/Perfil/Perfil.vue";
import Login from "./components/Login/Login.vue";
import Avaliacoes from "./components/Avaliacoes/Avaliacoes.vue";
import AvaliacoesDetalhes from "./components/Avaliacoes/AvaliacoesDetalhes.vue";
import Atletas from "./components/Atletas/Atletas.vue";
import AtletasDetalhes from "./components/Atletas/AtletasDetalhes.vue";
import Categorias from "./components/Categorias/Categorias.vue";
import Treinadores from "./components/Treinadores/Treinadores.vue";
import Status from "./components/Status/Status.vue";
import Posicoes from "./components/Posicoes/Posicoes.vue";
import BoasVindas from "./components/BoasVindas/BoasVindas.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "LoginInicio",
      component: Login
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/boas-vindas",
      name: "BoasVindas",
      component: BoasVindas
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
      path: "/perfis",
      name: "Perfil",
      component: Perfil
    },
    {
      path: "/avaliacoes",
      name: "Avaliacoes",
      component: Avaliacoes
    },
    {
      path: "/avaliacao/detalhe/:id",
      name: "AvaliacoesDetalhes",
      component: AvaliacoesDetalhes
    },
    {
      path: "/atletas",
      name: "Atletas",
      component: Atletas
    },
    {
      path: "/atleta/detalhe/:id",
      name: "AtletasDetalhes",
      component: AtletasDetalhes
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
      path: "/posicoes",
      name: "Posicoes",
      component: Posicoes
    },
    {
      path: "/treinadores",
      name: "Treinadores",
      component: Treinadores
    }
  ]
});
