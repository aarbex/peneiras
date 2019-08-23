import Vue from "vue";
import Router from "vue-router";
import Usuario from "./components/Usuario/Usuario.vue";
import Perfil from "./components/Perfil/Perfil.vue";
import PerfilModel from "./components/Perfil/PerfilModel.vue";
import Login from "./components/Login/Login.vue";
import Avaliacoes from "./components/Avaliacoes/Avaliacoes.vue";
import Atletas from "./components/Atletas/Atletas.vue";
import AtletasModel from "./components/Atletas/AtletasModel.vue";
import Categorias from "./components/Categorias/Categorias.vue";
import CategoriasModel from "./components/Categorias/CategoriasModel.vue";
import Treinadores from "./components/Treinadores/Treinadores.vue";
import TreinadoresModel from "./components/Treinadores/TreinadoresModel.vue";
import Status from "./components/Status/Status.vue";
import StatusModel from "./components/Status/StatusModel.vue";
import Permissoes from "./components/Permissoes/Permissoes.vue";
import UsuarioModel from "./components/Usuario/UsuarioModel.vue";
import Posicoes from "./components/Posicoes/Posicoes.vue";
import PosicoesModel from "./components/Posicoes/PosicoesModel.vue";

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
      path: "/atleta",
      name: "AtletasModel",
      component: AtletasModel
    },
    {
      path: "/atleta/:id",
      name: "AtletasModelEdit",
      component: AtletasModel
    },
    {
      path: "/categorias",
      name: "Categorias",
      component: Categorias
    },
    {
      path: "/categoria",
      name: "CategoriasModel",
      component: CategoriasModel
    },
    {
      path: "/categoria/:id",
      name: "CategoriasModelEdit",
      component: CategoriasModel
    },
    {
      path: "/status",
      name: "Status",
      component: Status
    },
    {
      path: "/statusModel",
      name: "StatusModel",
      component: StatusModel
    },
    {
      path: "/statusmodel/:id",
      name: "StatusModelEdit",
      component: StatusModel
    },
    {
      path: "/permissoes",
      name: "Permissoes",
      component: Permissoes
    },
    {
      path: "/posicoes",
      name: "Posicoes",
      component: Posicoes
    },
    {
      path: "/posicaoModel/:id",
      name: "PosicaoModelEdit",
      component: PosicoesModel
    },
    {
      path: "/posicaoModel",
      name: "PosicaoModel",
      component: PosicoesModel
    },
    {
      path: "/treinadores",
      name: "Treinadores",
      component: Treinadores
    },
    {
      path: "/treinador/:id",
      name: "TreinadorModelEdit",
      component: TreinadoresModel
    },
    {
      path: "/treinador",
      name: "TreinadorModel",
      component: TreinadoresModel
    }
  ]
});
