<template>
  <div>
    <Nav></Nav>
    <h1>Permissões</h1>
    <v-simple-table style="text-align: center">
      <thead>
        <th style="text-align: center"></th>
        <th style="text-align: center">Controle</th>
        <th style="text-align: left">Permissão</th>
      </thead>
      <tbody v-if="permissoes.length">
        <tr v-for="(permissao) in permissoes" :key="permissao.id">
          <td class="colunaCheck">
            <label class="container">
              <input type="checkbox" />
              <span class="checkmark"></span>
            </label>
          </td>
          <td class="colunaControle">{{permissao.controle}}</td>
          <td class="colunaPermissao">{{permissao.permissao}}</td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
import Nav from "../Nav/Nav";

export default {
  components: {
    Nav
  },

  data: () => ({
    permissoes: []
  }),

  created() {
    this.$http
      .get("http://localhost:3000/permissoes")
      .then(res => res.json())
      .then(permissao => (this.permissoes = permissao));
  }
};
</script>

<style lang="scss" scoped>
.center {
  margin: 0 auto;
  text-align: center;
  width: 100%;
}
.colunaCheck {
  width: 5%;
}
.colunaControle {
  width: 25%;
}
.colunaPermissao {
  width: 70%;
  text-align: left;
}
.container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #2196f3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>