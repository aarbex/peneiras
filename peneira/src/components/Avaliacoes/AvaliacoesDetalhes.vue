<template>
  <div>
    <Nav></Nav>
    <h1>Avaliação</h1>
    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <div style="width: 20%;">
        <v-text-field v-model="avaliacao.cpf" label="CPF do Atleta" required readonly filled></v-text-field>
      </div>
      <div style="width: 4%; margin-right:4%; display: flex">
        <v-icon style="vertical-align:middle">mdi-magnify</v-icon>
      </div>
      <div style="width: 76%">
        <v-text-field v-model="avaliacao.nome" label="Nome do Atleta" required readonly filled></v-text-field>
      </div>
    </div>

    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <div style="width: 15%; margin-right:4%">
        <v-text-field
          v-model="avaliacao.dtNascimento"
          label="Data de Nascimento"
          prepend-icon="mdi-calendar-month"
          readonly
          filled
        ></v-text-field>
      </div>
      <div style="width: 37%; margin-right:4%">
        <v-text-field
          name="posicao"
          v-model="avaliacao.posicao"
          label="posicao"
          required
          readonly
          filled
        ></v-text-field>
      </div>
      <div style="width: 40%">
        <v-text-field v-model="avaliacao.indicacao" readonly filled label="Indicação"></v-text-field>
      </div>
    </div>

    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <div style="width: 48%; margin-right:4%">
        <v-text-field
          name="categoria"
          v-model="avaliacao.categoria.nome"
          label="categoria"
          required
          readonly
          filled
        ></v-text-field>
      </div>
      <div style="width: 48%;">
        <v-text-field
          name="posicao"
          v-model="avaliacao.treinador.nome"
          label="treinador"
          required
          readonly
          filled
        ></v-text-field>
      </div>
    </div>
    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <div style="width: 20%; margin-right:4%">
        <v-text-field
          v-if="avaliacao.dtInicio"
          v-model="avaliacao.dtInicio"
          label="Data de Início"
          prepend-icon="mdi-calendar-month"
          readonly
          filled
        ></v-text-field>
        <v-text-field
          v-else
          label="Data de Início"
          value=" "
          prepend-icon="mdi-calendar-month"
          readonly
          filled
        ></v-text-field>
      </div>
      <div style="width: 20%; margin-right:4%">
        <v-text-field
          v-if="avaliacao.dtDispensa"
          v-model="avaliacao.dtDispensa"
          label="Data de Dispensa"
          prepend-icon="mdi-calendar-month"
          readonly
          filled
        ></v-text-field>
        <v-text-field
          v-else
          label="Data de Dispensa"
          value=" "
          prepend-icon="mdi-calendar-month"
          readonly
          filled
        ></v-text-field>
      </div>
      <div style="width: 20%; margin-right:4%">
        <v-text-field v-if="avaliacao.nota" v-model="avaliacao.nota" label="Nota" readonly filled></v-text-field>
        <v-text-field v-else value=" " label="Nota" readonly filled></v-text-field>
      </div>
      <div style="width: 32%;">
        <v-text-field v-model="avaliacao.cadastradoPor" label="Cadastrado por:" readonly filled></v-text-field>
      </div>
    </div>
    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <v-textarea
        v-model="avaliacao.observacao"
        name="observacao"
        label="Observação"
        readonly
        filled
      ></v-textarea>
    </div>

    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <div style="width: 100%; margin: 0 auto; margin-bottom: 20px; text-align: center;">
        <router-link :to="'/avaliacao/' + this.id" tag="button">
          <v-btn class="mr-4" color="primary">Editar</v-btn>
        </router-link>
        <router-link to="/avaliacoes" tag="button">
          <v-btn color="error">Voltar</v-btn>
        </router-link>
      </div>
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
      avaliacoes: [],
      avaliacao: {},
      id: this.$route.params.id
    };
  },

  created() {
    if (this.id) {
      this.$http
        .get("http://localhost:3000/avaliacoes/" + this.id)
        .then(res => res.json())
        .then(avaliacao => (this.avaliacao = avaliacao));
    }
  }
};
</script>

<style lang="scss" scoped>
.foto {
  text-align: left;
  display: flex;
  margin: 20px;
  width: 100%;
}
.div-main {
  display: flex;
  width: 100%;
}

.td-foto {
  width: 20%;
}
</style>