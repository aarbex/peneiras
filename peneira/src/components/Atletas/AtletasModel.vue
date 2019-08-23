<template>
  <v-container>
    <Nav></Nav>
    <h1>Atleta</h1>
    <div class="div-main">
      <div style="width:20%;">
        <picture-input
          class="foto"
          width="120"
          height="160"
          accept="image/jpeg, image/png"
          :customStrings="{
        upload: '<h1>Bummer!</h1>',
        drag: 'Clique aqui ou arraste a foto para inseri-la!'
      }"
        ></picture-input>
      </div>
      <div style="width: 80%">
        <div style="padding-right: 20px;">
          <v-text-field v-if="this.id" v-model="usuario.nome" label="Nome" required></v-text-field>
          <v-text-field v-else v-model="nome" label="Nome" required></v-text-field>
        </div>
        <div style="padding-right: 20px;">
          <v-text-field v-if="this.id" v-model="usuario.email" label="E-mail" required></v-text-field>
          <v-text-field v-else v-model="email" label="E-mail" required></v-text-field>
        </div>
        <div style="padding-right: 20px; display: flex; ">
          <div style="width: 48%; margin-right:4%">
            <v-text-field v-if="this.id" v-model="atleta.cpf" label="CPF" required></v-text-field>
            <v-text-field v-else v-model="cpf" label="CPF" required></v-text-field>
          </div>
          <div style="width: 48%">
            <v-text-field v-if="this.id" v-model="atleta.rg" label="RG" required></v-text-field>
            <v-text-field v-else v-model="rg" label="RG" required></v-text-field>
          </div>
        </div>
      </div>
    </div>
    <div style="padding-right: 20px; display: flex; ">
      <div style="width: 83%; margin-right:4%">
        <v-text-field
          v-if="this.id"
          v-model="atleta.endereco"
          label="Endereço (Rua / Avenida)"
          required
        ></v-text-field>
        <v-text-field v-else v-model="endereco" label="Endereço (Rua / Avenida)" required></v-text-field>
      </div>
      <div style="width: 13%">
        <v-text-field v-if="this.id" v-model="atleta.num" label="Número" required></v-text-field>
        <v-text-field v-else v-model="num" label="Número" required></v-text-field>
      </div>
    </div>
    <div style="padding-right: 20px; display: flex; ">
      <div style="width: 41.5%; margin-right:4%">
        <v-text-field v-if="this.id" v-model="atleta.bairro" label="Bairro" required></v-text-field>
        <v-text-field v-else v-model="bairro" label="Bairro" required></v-text-field>
      </div>
      <div style="width: 41.5%; margin-right:4%">
        <v-text-field v-if="this.id" v-model="atleta.cidade" label="Cidade" required></v-text-field>
        <v-text-field v-else v-model="cidade" label="Cidade" required></v-text-field>
      </div>
      <div style="width: 13%">
        <v-text-field v-if="this.id" v-model="atleta.uf" label="UF" required></v-text-field>
        <v-text-field v-else v-model="uf" label="UF" required></v-text-field>
      </div>
    </div>
    <div style="padding-right: 20px; display: flex; ">
      <div style="width: 48%; margin-right:4%">
        <v-text-field v-if="this.id" v-model="atleta.celular" label="Telefone Celular"></v-text-field>
        <v-text-field v-else v-model="celular" label="Telefone Celular" required></v-text-field>
      </div>
      <div style="width: 48%">
        <v-text-field v-if="this.id" v-model="atleta.tel" label="Telefone Fixo"></v-text-field>
        <v-text-field v-else v-model="tel" label="Telefone Fixo" required></v-text-field>
      </div>
    </div>
    <div style="padding-right: 20px; display: flex; ">
      <div style="width: 28%; margin-right:4%">
        <v-text-field v-if="this.id" v-model="atleta.escolaridade" label="Escolariade"></v-text-field>
        <v-text-field v-else v-model="escolaridade" label="Escolaridade" required></v-text-field>
      </div>
      <div style="width: 68%">
        <v-text-field v-if="this.id" v-model="atleta.nomeEscola" label="Nome da Escola"></v-text-field>
        <v-text-field v-else v-model="nomeEscola" label="Nome da Escola" required></v-text-field>
      </div>
    </div>
    <div style="padding-right: 20px; display: flex; ">
      <div style="width: 100%;">
        <v-text-field v-if="this.id" v-model="atleta.nomePai" label="Nome do Pai"></v-text-field>
        <v-text-field v-else v-model="nomePai" label="Nome do Pai" required></v-text-field>
      </div>
    </div>
    <div style="padding-right: 20px; display: flex; ">
      <div style="width: 100%;">
        <v-text-field v-if="this.id" v-model="atleta.nomeMae" label="Nome da Mãe"></v-text-field>
        <v-text-field v-else v-model="nomeMae" label="Nome da Mãe" required></v-text-field>
      </div>
    </div>
    <div style="padding-right: 20px; display: flex; ">
      <div style="width: 48%; margin-right:4%">
        <v-text-field v-if="this.id" v-model="atleta.posicao" label="Posição"></v-text-field>
        <v-text-field v-else v-model="posicao" label="Posição" required></v-text-field>
      </div>
      <div style="width: 48%">
        <v-text-field v-if="this.id" v-model="atleta.indicacao" label="Indicação"></v-text-field>
        <v-text-field v-else v-model="indicacao" label="Indicação" required></v-text-field>
      </div>
    </div>
    <div style="padding-right: 20px; display: flex; ">
      <div style="width: 23%; margin-right:4%">
        <v-radio-group v-model="row" row label="Federado?">
          <v-radio label="Sim" value="sim"></v-radio>
          <v-radio label="Não" value="não"></v-radio>
        </v-radio-group>
      </div>
      <div style="width: 73%">
        <v-text-field v-if="this.id" v-model="atleta.federacao" label="Se sim, qual?"></v-text-field>
        <v-text-field v-else v-model="federacao" label="Se sim, qual?" required></v-text-field>
      </div>
    </div>
    <div style="padding-right: 20px; display: flex; ">
      <div style="width: 100%; margin: 0 auto; text-align: center">
        <v-btn v-if="this.id" class="mr-4" @click="editarUsuario(usuario)" color="success">Editar</v-btn>
        <v-btn v-else class="mr-4" @click="addUsuario()" color="success">Salvar</v-btn>
        <router-link to="/usuarios" tag="button">
          <v-btn color="error">Cancelar</v-btn>
        </router-link>
      </div>
    </div>
  </v-container>
</template>

<script>
import Nav from "../Nav/Nav";
import PictureInput from "vue-picture-input";
export default {
  components: {
    Nav,
    PictureInput
  },

  methods: {}
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