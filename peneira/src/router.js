import Vue from 'vue'
import Router from 'vue-router'
import Usuario from "./components/Usuario/Usuario"
import Perfil from "./components/Perfil/Perfil"
import Login from "./components/Login/Login"
import Avaliacoes from "./components/Avaliacoes/Avaliacoes"
import Atletas from "./components/Atletas/Atletas"
import Categorias from "./components/Categorias/Categorias"
import Cursos from "./components/Cursos/Cursos"
import Escolas from "./components/Escolas/Escolas"

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            nome:'Login',
            component: Login
        },
        {
            path: '/usuarios',
            nome:'Usuario',
            component: Usuario
        },
        {
            path: '/perfil',
            nome:'Perfil',
            component: Perfil
        },
        {
            path: '/avaliacoes',
            nome:'Avaliacoes',
            component: Avaliacoes
        },
        {
            path: '/atletas',
            nome:'Atletas',
            component: Atletas
        },
        {
            path: '/categorias',
            nome:'Categorias',
            component: Categorias
        },
        {
            path: '/cursos',
            nome:'Cursos',
            component: Cursos
        },
        {
            path: '/escolas',
            nome:'Escolas',
            component: Escolas
        }         
    ] 
})