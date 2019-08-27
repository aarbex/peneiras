<template>
  <div>
    <Nav></Nav>
    <div class="div-main">
      <div style="width:20%; margin-top: 5px; margin-bottom:10px">
        <picture-input
          ref="pictureInput"
          class="foto"
          width="180"
          height="240"
          accept="image/jpeg, image/png"
          :customStrings="{
        upload: '<h1>Bummer!</h1>',
        drag: 'Clique aqui ou arraste a foto para inseri-la!'
      }"
        ></picture-input>
      </div>
      <div style="width: 80%">
        <div style="padding-right: 20px; display:flex">
          <v-text-field
            style="font-size: 36px; font-weight: bold"
                        v-model="atleta.nome"
            label="Nome"
            solo
            flat
            readonly
          ></v-text-field>
          <router-link to="/atletas" tag="button">
            <v-btn color="primary">Visualizar Avaliações</v-btn>
          </router-link>
        </div>
        <div style="padding-right: 20px;">
          <v-text-field v-model="atleta.email" label="E-mail" filled readonly></v-text-field>
        </div>
        <div style="padding-right: 20px; display: flex; ">
          <div style="width: 48%; margin-right:4%">
            <v-text-field v-model="atleta.cpf" label="CPF" filled readonly></v-text-field>
          </div>
          <div style="width: 48%">
            <v-text-field v-model="atleta.rg" label="RG" filled readonly></v-text-field>
          </div>
        </div>
      </div>
    </div>
    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <div style="width: 83%; margin-right:4%">
        <v-text-field
                    v-model="atleta.endereco"
          label="Endereço (Rua / Avenida)"
          readonly
          filled
        ></v-text-field>
      </div>
      <div style="width: 13%">
        <v-text-field v-model="atleta.num" label="Número" readonly filled></v-text-field>
      </div>
    </div>
    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <div style="width: 41.5%; margin-right:4%">
        <v-text-field v-model="atleta.bairro" label="Bairro" readonly filled></v-text-field>
      </div>
      <div style="width: 41.5%; margin-right:4%">
        <v-text-field v-model="atleta.cidade" label="Cidade" readonly filled></v-text-field>
      </div>
      <div style="width: 13%">
        <v-text-field v-model="atleta.uf" label="UF" readonly filled></v-text-field>
      </div>
    </div>
    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <div style="width: 48%; margin-right:4%">
        <v-text-field
                    v-model="atleta.celular"
          label="Telefone Celular"
          readonly
          filled
        ></v-text-field>
      </div>
      <div style="width: 48%">
        <v-text-field v-model="atleta.tel" label="Telefone Fixo" readonly filled></v-text-field>
      </div>
    </div>
    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <div style="width: 28%; margin-right:4%">
        <v-text-field  v-model="atleta.escolaridade" label="Escolaridade" readonly filled></v-text-field>
      </div>
      <div style="width: 68%">
        <v-text-field label="Nome da Escola" v-model="atleta.nomeEscola" filled readonly></v-text-field>
      </div>
    </div>
    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <div style="width: 100%;">
        <v-text-field v-model="atleta.pai" label="Nome do Pai" readonly filled></v-text-field>
      </div>
    </div>
    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <div style="width: 100%;">
        <v-text-field v-model="atleta.mae" label="Nome da Mãe" readonly filled></v-text-field>
      </div>
    </div>
    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <div style="width: 48%; margin-right:4%">
        <v-text-field v-model="atleta.posicao" label="Posição" readonly filled></v-text-field>
      </div>
      <div style="width: 48%">
        <v-text-field v-model="atleta.indicacao" label="Indicação" readonly filled></v-text-field>
      </div>
    </div>
    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <div style="width: 12%; margin-right:4%; margin-top: 15px">
        <v-checkbox
                    v-model="atleta.federado"
          label="Atleta Federado"
          hide-details
          readonly
          filled
          class="shrink mr-2 mt-0"
        ></v-checkbox>
      </div>
      <div style="width: 84%">
        <v-text-field
          :disabled="!atleta.federado"
                    filled
          v-model="atleta.federacao"
          label="Qual Federação?"
          readonly
        ></v-text-field>
      </div>
    </div>
    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <div style="width: 100%; margin: 0 auto; margin-bottom: 20px; text-align: center;">
        <router-link to="/atletas" tag="button">
          <v-btn style="margin: 0 5px" color="primary">Visualizar Avaliações</v-btn>
        </router-link>
        <router-link :to="'/atleta/' + atleta.id" tag="button">
          <v-btn style="margin: 0 5px" color="success">Editar</v-btn>
        </router-link>
        <router-link to="/atletas" tag="button">
          <v-btn style="margin: 0 5px" color="error">Voltar</v-btn>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "../Nav/Nav";
import PictureInput from "vue-picture-input";
export default {
  components: {
    Nav,
    PictureInput
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
        .get("http://localhost:3000/atletas/" + this.id)
        .then(res => res.json())
        .then(atleta => (this.atleta = atleta));
    }

    this.$http
      .get("http://localhost:3000/posicoes")
      .then(res => res.json())
      .then(posicoes => {
        this.posicoes = posicoes;
        //.map(x => ({ text: x.nome, value: x.id }));
      });
  },

  beforeMount() {
    if (this.id) {
      this.$http
        .get("http://localhost:3000/atletas/" + this.id)
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