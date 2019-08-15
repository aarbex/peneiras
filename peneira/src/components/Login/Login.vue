<template>
  <div>
    <v-app-bar text-center color="black">
      <v-toolbar-title
        :justify="center"
        align="center"
        cols="12"
        md="12"
        class="headline text-uppercase"
      >
        <img src="../../assets/logo-corinthians.png" height="50px" alt />
      </v-toolbar-title>
    </v-app-bar>
    <h1>SISTEMA DE GESTÃO DE PENEIRAS</h1>
    <div style="width: 30%; align-content: center; margin: 0 auto;">
      <h2>Login</h2>
      <form>
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="E-mail"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show ? 'text' : 'password'"
          name="input-password"
          label="Senha"
          hint="At least 8 characters"
          counter
          @click:append="show = !show"
        ></v-text-field>
        <v-checkbox
          v-model="checkbox"
          label="Primeiro Acesso?"
          @change="$v.checkbox.$touch()"
          @blur="$v.checkbox.$touch()"
        ></v-checkbox>        
          <v-btn class="mr-4 success" @click="submit" :to="avaliacoes.route" >Entrar</v-btn>        
      </form>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email },
    checkbox: {
      checked(val) {
        return val;
      }
    }
  },

  data: () => ({
    email: "",
    show: false,
    password: "",
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters",
      emailMatch: () => "The email and password you entered don't match"
    },
    checkbox: false,
    avaliacoes: {
      route: "/avaliacoes"
    }
  }),

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
    }
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