<template>
  <v-container>
    <Nav></Nav>
    <h1>Usuários do Sistema</h1>
    <div class="div-add">
      <router-link to="/usuario/">
        <v-btn class="mx-2" fab dark xSmall color="primary">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-icon medium dark v-on="on">mdi-plus</v-icon>
            </template>
            <span>Adicionar</span>
          </v-tooltip>
        </v-btn>
      </router-link>
    </div>
    <v-simple-table>
      <thead class="text-center">
        <th class="text-center">Nome</th>
        <th class="text-center">Email</th>
        <th class="text-center">Perfil</th>
        <th class="text-center">Data Cadastro</th>
        <th class="text-center">Ações</th>
      </thead>
      <tbody v-if="usuarios.length">
        <tr v-for="(u, index) in usuarios" :key="index">
          <td class="text-center">{{u.nome}}</td>
          <td class="text-center">{{u.email}}</td>
          <td class="text-center">{{u.perfil.nome}}</td>
          <td class="text-center">{{u.dtCadastro}}</td>
          <td class="text-center" style="width: 20%">
            <router-link :to="'/usuario/' + u.id">
              <v-btn class="mx-2" fab dark xSmall color="primary">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-icon medium dark v-on="on">mdi-pencil</v-icon>
                  </template>
                  <span>Editar</span>
                </v-tooltip>
              </v-btn>
            </router-link>
            <v-btn class="mx-2" fab dark xSmall color="error" @click="usuario = u;dialog1 = true">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon medium dark v-on="on">mdi-trash-can</v-icon>
                </template>
                <span>Excluir</span>
              </v-tooltip>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-dialog v-model="dialog1" max-width="290">
      <v-card>
        <v-card-title class="headline">Atenção!</v-card-title>
        <v-card-text>Deseja realmente excluir o usuário {{usuario.nome}}?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="dialog1 = false">Cancelar</v-btn>
          <v-btn color="success" text @click="removerUsuario(usuario)">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Nav from "../Nav/Nav";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email }
  },

  components: {
    Nav
  },

  data() {
    return {
      dialog: false,
      dialog1: false,
      dialog3: false,
      show1: false,
      show2: false,
      password1: "",
      password2: "",
      email: "",
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match"
      },
      select: null,
      usuarios: [],
      usuario: {},
      perfis: [],
      id: this.$route.params.id
    };
  },

  created() {
    this.$http
      .get("http://localhost:3000/usuarios/")
      .then(res => res.json())
      .then(usuarios => (this.usuarios = usuarios));

    this.$http
      .get("http://localhost:3000/perfis")
      .then(res => res.json())
      .then(perfil => (this.perfis = perfil));
  },
  beforeMount() {
    this.$http
      .get("http://localhost:3000/usuarios/")
      .then(res => res.json())
      .then(usuarios => (this.usuarios = usuarios));
  },

  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    }
  },

  methods: {
    submit() {
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.select = null;
      this.checkbox = false;
    },

    removerUsuario(usuario) {
      this.$http
        .delete(`http://localhost:3000/usuarios/${usuario.id}`)
        .then(() => {
          let indice = this.usuarios.indexOf(usuario);
          this.usuarios.splice(indice, 1);
          //this.usuarios = this.usuarios.filter(u => u.id != usuario.id);
          this.dialog1 = false;
        });
    }
  }
};
</script>

<style>
h1 {
  text-align: center;
  padding: 20px 0px;
}
table {
  width: 100%;
  padding: 20px opx;
  margin: 0 auto;
}
.div-add {
  text-align: right;
  padding-bottom: 10px;
}
</style>