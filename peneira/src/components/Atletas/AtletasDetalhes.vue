<template>
  <div>
    <Nav></Nav>

    <v-row class="mx-5" flex bottom>
      <v-col cols="12" sm="6" md="2">
        <img
          center
          width="120"
          height="160"
          src="http://kb-w.com/wp-content/uploads/2019/08/3x4-Placeholder.jpg"
          alt
        />
      </v-col>
      <v-col cols-12 sm="6" md="10">
        <p class="display-2 mt-5">{{atleta.nome}}</p>
      </v-col>
      <v-col cols="12" sm="6" md="10">
        <v-text-field v-model="atleta.email" label="E-mail" filled readonly></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-text-field v-model="atleta.dtNascimento" label="Data de Nascimento" filled readonly></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field v-model="atleta.cpf" label="CPF" filled readonly></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field v-model="atleta.rg" label="RG" filled readonly></v-text-field>
      </v-col>

      <v-col cols="12" sm="6" md="10">
        <v-text-field v-model="atleta.endereco" label="Endereço (Rua / Avenida)" readonly filled></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-text-field v-model="atleta.num" label="Número" readonly filled></v-text-field>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-text-field v-model="atleta.bairro" label="Bairro" readonly filled></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-text-field v-model="atleta.cep" label="CEP" readonly filled></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-text-field v-model="atleta.cidade" label="Cidade" readonly filled></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-text-field v-model="atleta.uf" label="UF" readonly filled></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field v-model="atleta.celular" label="Telefone Celular" readonly filled></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field v-model="atleta.tel" label="Telefone Fixo" readonly filled></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field v-model="atleta.escolaridade" label="Escolaridade" readonly filled></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field label="Nome da Escola" v-model="atleta.nomeEscola" filled readonly></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field v-model="atleta.pai" label="Nome do Pai" readonly filled></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field v-model="atleta.mae" label="Nome da Mãe" readonly filled></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field v-model="atleta.posicao.nome" label="Posição" readonly filled></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field v-model="atleta.indicacao" label="Indicação" readonly filled></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-checkbox
          v-model="atleta.federado"
          label="Atleta Federado"
          hide-details
          readonly
          filled
          class="shrink mr-2 mt-0"
        ></v-checkbox>
      </v-col>
      <v-col cols="12" sm="6" md="10">
        <v-text-field
          :disabled="!atleta.federado"
          filled
          v-model="atleta.federacao"
          label="Qual Federação?"
          readonly
        ></v-text-field>
      </v-col>
    </v-row>
    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <div style="width: 100%; margin: 0 auto; margin-bottom: 20px; text-align: center;">
        <router-link to="/atletas" tag="button">
          <v-btn text style="margin: 5px" color="primary">Visualizar Avaliações</v-btn>
        </router-link>
        <router-link :to="'/atleta/' + atleta.id" tag="button">
          <v-btn text style="margin: 5px" color="primary">Editar</v-btn>
        </router-link>
        <router-link to="/atletas" tag="button">
          <v-btn text style="margin: 5px" color="black">Voltar</v-btn>
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
      atleta: {},
      id: this.$route.params.id
    };
  },

  created() {
    if (this.id) {
      this.$http
        .get(
          "https://my-json-server.typicode.com/rafafcasado/peneirasccp/atletas/" +
            this.id
        )
        .then(res => res.json())
        .then(atleta => (this.atleta = atleta));
    }

    this.$http
      .get(
        "https://my-json-server.typicode.com/rafafcasado/peneirasccp/posicoes"
      )
      .then(res => res.json())
      .then(posicoes => {
        this.posicoes = posicoes;
        //.map(x => ({ text: x.nome, value: x.id }));
      });
  },

  beforeMount() {
    if (this.id) {
      this.$http
        .get(
          "https://my-json-server.typicode.com/rafafcasado/peneirasccp/atletas/" +
            this.id
        )
        .then(res => res.json())
        .then(atleta => (this.atleta = atleta));
    }
  },

  methods: {}
};
</script>

<style lang="scss" scoped>
.foto {
  text-align: left;
  display: flex;
  margin-left: 20px;
  width: 100%;
}
.div-main {
  display: flex;
  width: 100%;
  padding-top: 20px;
}

.td-foto {
  width: 20%;
}
</style>