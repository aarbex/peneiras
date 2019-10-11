<template>
  <div>
    <Nav></Nav>
    <h1>Avaliação</h1>
    <v-row class="mx-5">
      <v-col cols="12" sm="6" md="3">
        <v-text-field v-model="avaliacao.cpf" label="CPF do Atleta" required readonly filled></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="9">
        <v-text-field v-model="avaliacao.nome" label="Nome do Atleta" required readonly filled></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-text-field v-model="avaliacao.dtNascimento" label="Data de Nascimento" readonly filled></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="5">
        <v-text-field
          name="posicao"
          v-model="avaliacao.posicao"
          label="posicao"
          required
          readonly
          filled
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="5">
        <v-text-field v-model="avaliacao.indicacao" readonly filled label="Indicação"></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field
          name="categoria"
          v-model="avaliacao.categoria.nome"
          label="categoria"
          required
          readonly
          filled
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field
          name="posicao"
          v-model="avaliacao.treinador.nome"
          label="treinador"
          required
          readonly
          filled
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-text-field v-model="avaliacao.dtInicio" label="Data de Início" readonly filled></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-text-field v-model="avaliacao.dtDispensa" label="Data de Dispensa" readonly filled></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-text-field v-model="avaliacao.nota" label="Nota" readonly filled></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-text-field v-model="avaliacao.cadastradoPor" label="Cadastrado por:" readonly filled></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-textarea
          v-model="avaliacao.observacao"
          name="observacao"
          label="Observação"
          readonly
          filled
        ></v-textarea>
      </v-col>
    </v-row>
    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <div style="width: 100%; margin: 0 auto; margin-bottom: 20px; text-align: center;">
        <router-link to="/avaliacoes" tag="button">
          <v-btn color="black" text>Voltar</v-btn>
        </router-link>
        <router-link :to="'/avaliacao/' + this.id" tag="button">
          <v-btn text class="mr-4" color="primary">Editar</v-btn>
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
        .get(
          "https://my-json-server.typicode.com/rafafcasado/peneirasccp/avaliacoes/" +
            this.id
        )
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