<template>
  <div>
    <Nav></Nav>
    <h1>Atleta</h1>
    <div class="div-main">
      <div style="width:15%;">
        <picture-input
          ref="pictureInput"
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
      <div style="width: 85%">
        <div style="padding-right: 20px;">
          <v-text-field v-if="this.id" v-model="atleta.nome" label="Nome" required></v-text-field>
          <v-text-field v-else v-model="nome" label="Nome" required></v-text-field>
        </div>
        <div style="padding-right: 20px;">
          <v-text-field v-if="this.id" v-model="atleta.email" label="E-mail" required></v-text-field>
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
    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
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
    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
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
    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <div style="width: 48%; margin-right:4%">
        <v-text-field v-if="this.id" v-model="atleta.celular" label="Telefone Celular"></v-text-field>
        <v-text-field v-else v-model="celular" label="Telefone Celular" required></v-text-field>
      </div>
      <div style="width: 48%">
        <v-text-field v-if="this.id" v-model="atleta.tel" label="Telefone Fixo"></v-text-field>
        <v-text-field v-else v-model="tel" label="Telefone Fixo" required></v-text-field>
      </div>
    </div>
    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <div style="width: 28%; margin-right:4%">
        <v-select
          v-if="this.id"
          name="escolaridade"
          v-model="atleta.escolaridade"
          :items="escolaridades"
          label="Escolaridade"
          required
        ></v-select>
        <v-select
          v-else
          name="escolaridade"
          v-model="escolaridade"
          :items="escolaridades"
          label="Escolaridade"
          required
        ></v-select>
      </div>
      <div style="width: 68%">
        <v-text-field v-if="this.id" v-model="atleta.nomeEscola" label="Nome da Escola"></v-text-field>
        <v-text-field v-else v-model="nomeEscola" label="Nome da Escola" required></v-text-field>
      </div>
    </div>
    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <div style="width: 100%;">
        <v-text-field v-if="this.id" v-model="atleta.pai" label="Nome do Pai"></v-text-field>
        <v-text-field v-else v-model="pai" label="Nome do Pai" required></v-text-field>
      </div>
    </div>
    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <div style="width: 100%;">
        <v-text-field v-if="this.id" v-model="atleta.mae" label="Nome da Mãe"></v-text-field>
        <v-text-field v-else v-model="mae" label="Nome da Mãe" required></v-text-field>
      </div>
    </div>
    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <div style="width: 48%; margin-right:4%">
        <v-select
          v-if="this.id"
          name="posicao"
          v-model="atleta.posicao"
          :items="posicoes"
          item-text="nome"
          item-value="id"
          label="posicao"
          required
        ></v-select>
        <v-select
          v-else
          v-model="posicao"
          :items="posicoes"
          item-text="nome"
          item-value="posicao"
          label="posicao"
          name="posicao"
          required
        ></v-select>
      </div>
      <div style="width: 48%">
        <v-text-field v-if="this.id" v-model="atleta.indicacao" label="Indicação"></v-text-field>
        <v-text-field v-else v-model="indicacao" label="Indicação" required></v-text-field>
      </div>
    </div>
    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <div style="width: 12%; margin-right:4%; margin-top: 15px">
        <v-checkbox
        v-if="this.id"
          v-model="atleta.federado"
          label="Atleta Federado"
          hide-details
          class="shrink mr-2 mt-0"
        ></v-checkbox>
        <v-checkbox
        v-else
          v-model="federado"
          label="Atleta Federado"
          hide-details
          class="shrink mr-2 mt-0"
        ></v-checkbox>        
      </div>
      <div style="width: 84%">
        <v-text-field :disabled="!atleta.federado" v-if="this.id" v-model="atleta.federacao" label="Qual Federação?"></v-text-field>
        <v-text-field :disabled="!federado" v-else v-model="federacao" label="Qual Federação?" required></v-text-field>
      </div>
    </div>
    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <div style="width: 100%; margin: 0 auto; margin-bottom: 20px; text-align: center;">
        <v-btn v-if="this.id" class="mr-4" @click="editarAtleta(atleta)" color="success">Editar</v-btn>
        <v-btn v-else class="mr-4" @click="addAtleta()" color="success">Salvar</v-btn>
        <router-link to="/atletas" tag="button">
          <v-btn color="error">Cancelar</v-btn>
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
      nome: "",
      email: "",
      cpf:"",
      rg:"",
      endereco:"",
      num:"",
      bairro:"",
      cidade:"",
      uf:"",
      celular:"",
      tel:"",
      escolaridade:"",
      nomeEscola:"",
      pai:"",
      mae:"",      
      indicacao:"",
      federado: "",
      federacao:"",
      dtCadastro: "",
      atleta: {},
      posicao: {},
      posicoes: [],
      id: this.$route.params.id,
      escolaridades:[
        "Ensino Fundamental - Incompleto",
        "Ensino Fundamental - Completo",
        "Ensino Médio - Incompleto",
        "Ensino Médio - Completo",
        "Ensino Superior - Incompleto",
        "Ensino Superior - Completo",
        "Pós-graduação (Lato senso) - Incompleto",
        "Pós-graduação (Lato senso) - Completo",
        "Pós-graduação (Stricto sensu, nível mestrado) - Incompleto",
        "Pós-graduação (Stricto sensu, nível mestrado) - Completo",
        "Pós-graduação (Stricto sensu, nível doutor) - Incompleto",
        "Pós-graduação (Stricto sensu, nível doutor) - Completo"
      ]
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

  methods: {
    addAtleta() {
      let now = new Date();
      this.dtCadastro =
        now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();      
      let _atleta = {
        nome: this.nome,
        email: this.email,
        cpf:this.cpf,
        rg:this.rg,
        endereco:this.endereco,
        num:this.num,
        bairro:this.bairro,
        cidade:this.cidade,
        uf:this.uf,
        celular:this.celular,
        tel:this.tel,
        escolaridade:this.escolaridade,
        nomeEscola:this.nomeEscola,
        pai:this.pai,
        mae:this.mae,      
        indicacao:this.indicacao,
        federado:this.federado,
        federacao:this.federacao,
        dtCadastro: this.dtCadastro             
      };
      this.$http
        .post("http://localhost:3000/atletas", _atleta)
        .then(res => res.json())
        .then(
          this.nome = "",
        this.email = "",
          this.cpf = "",
          this.rg = "",
          this.endereco = "",
          this.num = "",
          this.bairro = "",
          this.cidade = "",
          this.uf = "",
          this.celular = "",
          this.tel = "",
          this.escolaridade = "",
          this.nomeEscola = "",
          this.pai = "",
          this.mae = "",      
          this.indicacao = "",
          this.federado = "",
          this.federacao = "",
          this.dtCadastro = "" ,
          this.$router.push("/atletas")
        );
    },

    editarAtleta(_atleta) {
      let now = new Date();
      this.dtCadastro =
        now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
      let _senha = "";
      if (_atleta.senhaAux1 === _atleta.senhaAux2) {
        _senha = _atleta.senhaAux1;
      }

      let _atletaEditar = {
        nome: _atleta.nome,
        email: _atleta.email,
        senha: _senha,
        senhaAux1: _atleta.senhaAux1,
        senhaAux2: _atleta.senhaAux2,
        dtCadastro: this.dtCadastro,
        posicao: _atleta.posicao
      };
      this.$http.put(
        `http://localhost:3000/atletas/${_atleta.id}`,
        _atletaEditar
      );
      this.$router.push("/atletas");
    }
  }

  }

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