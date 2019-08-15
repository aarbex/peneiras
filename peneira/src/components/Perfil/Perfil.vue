<template>
  <v-container>
    <Nav></Nav>
    <h1>Perfis de Usuário</h1>

    <div class="div-add">
      <v-btn class="mx-2" fab dark small v-on="on" color="primary">
        <v-icon dark large>mdi-plus</v-icon>
      </v-btn>
    </div>
    <v-simple-table class="text-center" style="width: 60%; margin: 0 auto">
      <thead class="text-center">
        <th class="text-center">Nome</th>
        <th class="text-center">Data Cadastro</th>
        <th class="text-center">Ações</th>
      </thead>
      <tbody>
        <tr>
          <td>Administrador</td>
          <td>02/08/2019</td>
          <td style="width: 30%">
            <v-btn class="mx-2" fab dark small color="black">
              <v-icon dark>mdi-settings</v-icon>
            </v-btn>
            <v-btn class="mx-2" fab dark small color="primary">
              <v-icon dark>mdi-pencil</v-icon>
            </v-btn>
            <v-btn class="mx-2" fab dark small color="error">
              <v-icon dark>mdi-trash-can</v-icon>
            </v-btn>
          </td>
        </tr>
        <tr>
          <td>Usuário</td>
          <td>02/08/2019</td>
          <td style="width: 15%">
            <v-btn class="mx-2" fab dark small color="black">
              <v-icon dark>mdi-settings</v-icon>
            </v-btn>
            <v-btn class="mx-2" fab dark small color="primary">
              <v-icon dark>mdi-pencil</v-icon>
            </v-btn>
            <v-btn class="mx-2" fab dark small color="error">
              <v-icon dark>mdi-trash-can</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-container>
</template>

<script>
import Nav from "../Nav/Nav";

export default {
  components: {
    Nav
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
  padding: 20px 0px;
}
table {
  padding: 20px opx;
  margin: 0 auto;
}
.div-add {
  margin: 0 auto;
  text-align: right;
  padding-bottom: 10px;
  width: 60%;
}
</style>