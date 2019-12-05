<template>
  <div>
    <v-app-bar text-left dark>
      <v-toolbar-title
        :justify="left"
        align="center"
        cols="12"
        md="12"
        class="title text-uppercase font-weight-medium"
      >SISTEMA DE AVALIAÇÕES</v-toolbar-title>
    </v-app-bar>

    <v-card class="mx-auto mt-12" max-width="500" flex align="right">
      <v-toolbar dark>
        <v-toolbar-title dense>Entrar</v-toolbar-title>
      </v-toolbar>
      <v-text-field
        label="Email"
        v-model="email"
        prepend-inner-icon="mdi-email"
        class="mx-5 mt-5"
        @keyup.enter="submit()"
        hint="* Preenchimento Obrigatório"
        persistent-hint
        required
        :rules="[rules.required]"
      ></v-text-field>
      <v-text-field
        label="Senha"
        prepend-inner-icon="mdi-lock"
        class="mx-5"
        v-model="senha"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        @click:append="show = !show"
        @keyup.enter="submit()"
        hint="* Preenchimento Obrigatório"
        persistent-hint
        required
        :rules="[rules.required]"
      ></v-text-field>
      <v-divider></v-divider>
      <v-btn dark text-color="white" class="ma-2" @click="submit();">Entrar</v-btn>
    </v-card>
    <v-dialog v-model="dialog1" max-width="290">
      <v-card>
        <v-card-title class="headline">Atenção!</v-card-title>

        <v-card-text justify="center">O usuário ou a senha estão incorretos!</v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn color="black" text @click="dialog1 = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog2" max-width="290">
      <v-card>
        <v-card-title class="headline">Atenção!</v-card-title>

        <v-card-text justify="center">Os campos usuário e senha são obrigatórios!</v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn color="black" text @click="dialog2 = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog3" max-width="290">
      <v-card>
        <v-card-title class="headline">Atenção!</v-card-title>

        <v-card-text justify="center">{{msgfromurl}}</v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn color="black" text @click="dialog3 = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog4" max-width="290">
      <v-card>
        <v-card-title class="headline">Atenção!</v-card-title>

        <v-card-text justify="center">Usuário desativado em nossa base de dados!</v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn color="black" text @click="dialog4 = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email },
    senha: { required }
  },

  data: () => ({
    email: "",
    senha: "",
    usuarios:[],
    show: false,
    dialog1: false,
    dialog2: false,
    dialog3: false,
    dialog4: false,
    password: "",
    msgfromurl: "",
    rules: {
      required: value => !!value || "Preenchimento obrigatório!"
    }
  }),

  computed: {},

  created() {
    var msg = this.$route.query.msg;
    if (msg != undefined && msg != null) {
      this.dialog3 = true;
      this.msgfromurl = msg;
    }    
  },

  methods: {
    submit() {
      let _login = {
        email: this.email,
        senha: this.senha
      };
      if (this.email.length == 0 || this.senha.length == 0) {
        this.dialog2 = true;
      } else {
        this.$http.post("login", _login).then(
          function(res) {
            window.localStorage.setItem("token", res.body.access_token);
            window.localStorage.setItem(
              "usuario",
              JSON.stringify(res.body.usuario)
            );
            if(res.body.usuario.dtExclusao == null)
            {window.location.href = window.location.origin + "/boas-vindas";}
            else{
              this.dialog4 = true;
            }
          },
          function() {
            this.dialog1 = true;
          }
        );
      }
    },
    
  }
};
</script>

<style>
.v-app-bar {
  background-color: black;
}

.menu-title {
  width: 100%;
  margin: 0 auto;
  display: inline-flex;
  text-align: center;
  color: white;
}
</style>