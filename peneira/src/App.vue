<template>
  <v-app id="app">
    <v-content>
      <router-view :key="$route.fullPath"></router-view>
    </v-content>
  </v-app>
</template>


<script>
export default {
  name: "app"
};
</script>

<style>
.btn {
  width: 10px;
}
</style>

