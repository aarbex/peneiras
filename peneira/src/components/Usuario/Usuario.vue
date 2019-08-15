<template>
  <v-container>
    <Nav></Nav>
    <h1>Usuários do Sistema</h1>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <div class="div-add">
          <v-btn class="mx-2" fab dark small v-on="on" color="primary">
            <v-icon dark large>mdi-plus</v-icon>
          </v-btn>
        </div>
      </template>
      <v-card>
        <v-toolbar dark color="black">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Cadastrar Usuario</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-form>
          <v-col cols="12" sm="6" md="6">
            <v-text-field label="Nome" placeholder="Digite o nome..."></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="email"
              :error-messages="emailErrors"
              label="E-mail"
              required
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="select"
              :items="items"
              :rules="[v => !!v || 'O perfil é obrigatório!']"
              label="Perfil"
              required
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="password1"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="senha"
              label="Senha"
              hint="No mínimo 8 caracteres"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="password2"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show2 ? 'text' : 'password'"
              name="senha"
              label="Repita a Senha"
              hint="No mínimo 8 caracteres"
              counter
              @click:append="show2 = !show2"
            ></v-text-field>
          </v-col>
          <v-btn class="mr-4" @click="submit" color="success">
            <v-icon>mdi-check</v-icon>Salvar
          </v-btn>
          <v-btn @click="clear" color="primary">
            <v-icon>mdi-refresh</v-icon>Limpar
          </v-btn>
        </v-form>
      </v-card>
    </v-dialog>
    <v-simple-table>
      <thead class="text-center">
        <th class="text-center">Nome</th>
        <th class="text-center">Email</th>
        <th class="text-center">Perfil</th>
        <th class="text-center">Data Cadastro</th>
        <th class="text-center">Ações</th>
      </thead>
      <tbody v-if="usuarios.length">
        <tr v-for="(usuario, index) in usuarios" :key="index">
          <td class="text-center">{{usuario.Nome}}</td>
          <td class="text-center">{{usuario.Email}}</td>
          <td class="text-center">{{usuario.Perfil}}</td>
          <td class="text-center">{{usuario.DataCadastro}}</td>
          <td class="text-center" style="width: 20%">
            <v-dialog
              v-model="dialog3"
              fullscreen
              hide-overlay
              transition="dialog-bottom-transition"
            >
              <template v-slot:activator="{ on }">
                <v-btn class="mx-2" fab dark small v-on="on" color="primary">
                  <v-icon dark>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-toolbar dark color="black">
                  <v-btn icon dark @click="dialog3 = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-toolbar-title>Editar Usuario</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn dark text @click="dialog3 = false">Save</v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-form>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Nome" placeholder="Digite o nome..."></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="email"
                      :error-messages="emailErrors"
                      label="E-mail"
                      required
                      @input="$v.email.$touch()"
                      @blur="$v.email.$touch()"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="select"
                      :items="items"
                      :rules="[v => !!v || 'O perfil é obrigatório!']"
                      label="Perfil"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="password1"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="show1 ? 'text' : 'password'"
                      name="senha"
                      label="Senha"
                      hint="No mínimo 8 caracteres"
                      counter
                      @click:append="show1 = !show1"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="password2"
                      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="show2 ? 'text' : 'password'"
                      name="senha"
                      label="Repita a Senha"
                      hint="No mínimo 8 caracteres"
                      counter
                      @click:append="show2 = !show2"
                    ></v-text-field>
                  </v-col>
                  <v-btn class="mr-4" @click="submit" color="success">
                    <v-icon>mdi-check</v-icon>Salvar
                  </v-btn>
                  <v-btn @click="clear" color="primary">
                    <v-icon>mdi-refresh</v-icon>Limpar
                  </v-btn>
                </v-form>
              </v-card>
            </v-dialog>
            <v-btn class="mx-2" fab dark small color="error" @click.stop="dialog1 = true">
              <v-icon dark>mdi-trash-can</v-icon>
            </v-btn>
            <v-dialog v-model="dialog1" max-width="290">
              <v-card>
                <v-card-title class="headline">Atenção!</v-card-title>
                <v-card-text>Deseja realmente excluir o item?</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error" text @click="dialog1 = false">Cancelar</v-btn>
                  <v-btn color="success" text @click="dialog1 = false">Confirmar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
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

  data: () => ({
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
    items: ["Administrador", "Usuário"],
    usuarios: []
  }),

  created() {
    this.$http
      .get("http://localhost:3000/usuarios")
      .then(res => res.json())
      .then(usr => (this.usuarios = usr));
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