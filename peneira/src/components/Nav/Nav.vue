<template>
  <div>
    <v-app-bar app text-center color="black">
      <v-toolbar-title class="headline text-uppercase">
        <img src="../../assets/logo-corinthians.png" height="50px" alt />
      </v-toolbar-title>
      <div style="margin: 0 auto; display: inline-flex">
        <router-link :to="avaliacoes.route" tag="v-btn">
          <v-btn color="white" text>Avaliações</v-btn>
        </router-link>
        <router-link :to="atletas.route" tag="v-btn">
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
</template>

<script>
export default {
  data: () => ({
    disabled: false,
    openDelay: "0",
    closeDelay: "0",
    value: false,
    avaliacoes: {
      route: "/avaliacoes"
    },
    atletas: {
      route: "/atletas"
    },
    items: [
      { title: "Escolas", route: "/escolas" },
      { title: "Cursos", route: "/cursos" },
      { title: "Categorias", route: "/categorias" },
      { title: "Usuários", route: "/usuarios" },
      { title: "Perfil", route: "/perfil" }
    ]
  })
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