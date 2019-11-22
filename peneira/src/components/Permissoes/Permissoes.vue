<template>
  <div>
    <Nav />
    <v-row class="my-5">
      <h2 class="mx-auto">Permissões</h2>
    </v-row>
    <v-simple-table class="mx-5">
      <thead>
        <tr mx-auto>
          <th>Funcionalidade</th>
          <th>Listar</th>
          <th>Incluir</th>
          <th>Editar</th>
          <th>Excluir</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </v-simple-table>
    <div class="flex-grow-1 mx-auto" align="center">
      <small class="mx-5">Sport Club Corinthians Paulista © 2019</small>
      <br />
      <small class="mx-5">Todos os direitos reservados</small>
    </div>
  </div>
</template>

<script>
import Nav from "../Nav/Nav";
export default {
  components: {
    Nav
  },
  data() {
    return {
      dialog: false,
      nome: "",

      perfis: [],
      perfil: {},
      perfilVerificado: "",
      dtCadastro: "",
      date: new Date().toISOString().substr(0, 10),
      id: this.$route.params.id
    };
  },

  created() {
    this.$http
      .get("perfis", {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(perfis => (this.perfis = perfis));
  },

  methods: {
    filterOnlyCapsText(value, search) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value
          .toString()
          .toLowerCase()
          .indexOf(search) !== -1
      );
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    removerPerfil(perfil) {
      this.$http
        .delete(`perfis/${perfil.id}`, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
            "Content-Type": "application/json"
          }
        })
        .then(() => {
          let indice = this.perfis.indexOf(perfil);
          this.perfis.splice(indice, 1);
          //this.perfis = this.perfis.filter(p => p.id != perfil.id);
          this.dialog1 = false;
        });
    },
    verificaPerfil() {
      this.perfilVerificado = this.perfis.filter(x => x.nome === this.nome)[0];
      if (this.perfilVerificado) {
        this.dialog2 = true;
      } else {
        this.addPerfil();
        this.perfilVerificado = "";
      }
    },
    addPerfil() {
      this.dtCadastro = this.formatDate(this.date);
      let _perfil = {
        nome: this.nome,
        dtCadastro: this.dtCadastro
      };
      if (this.nome.length > 0) {
        this.$http
          .post("perfis", _perfil, {
            headers: {
              Authorization: "Bearer " + window.localStorage.getItem("token"),
              "Content-Type": "application/json"
            }
          })
          .then(res => res.json());
        window.location.href = window.location.origin + "/perfis";
      }
    },

    editarPerfil(_perfil) {
      let _perfilEditar = {
        id: _perfil.id,
        nome: this.nome,
        dtCadastro: this.dtCadastro
      };
      if (this.nome.length > 0) {
        this.$http.put(`perfis/${_perfilEditar.id}`, _perfilEditar, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
            "Content-Type": "application/json"
          }
        });
        window.location.href = window.location.origin + "/perfis";
      }
    },
    carregaPerfil(perfil) {
      this.nome = perfil.nome;
      this.dtCadastro = perfil.dtCadastro;
    },
    limparFormulario() {
      this.nome = "";
      this.dtCadastro = "";
      this.perfil = {};
    }
  }
};
</script>

<style lang="scss" scoped>
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
  width: 70%;
}
.actionButtons {
  margin: 0 3px;
}
</style>