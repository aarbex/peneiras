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
          <div style="width: 36%; margin-right:4%">
            <v-text-field v-if="this.id" v-mask="cpfMask" v-model="atleta.cpf" label="CPF" required></v-text-field>
            <v-text-field v-else v-mask="cpfMask" v-model="cpf" label="CPF" required></v-text-field>
          </div>
          <div style="width: 36%; margin-right:4%">
            <v-text-field v-if="this.id" v-mask="rgMask" v-model="atleta.rg" label="RG" required></v-text-field>
            <v-text-field v-else v-model="rg" v-mask="rgMask" label="RG" required></v-text-field>
          </div>
          <div style="width: 20%;">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="atleta.dtNascimento"
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="atleta.dtNascimento"
                  label="Data de Nascimento"
                  prepend-icon="mdi-calendar-month"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" no-title scrollable>
                <div class="flex-grow-1"></div>
                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
              </v-date-picker>
            </v-menu>
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
      <div style="width: 34%; margin-right:4%">
        <v-text-field v-if="this.id" v-model="atleta.bairro" label="Bairro" required></v-text-field>
        <v-text-field v-else v-model="bairro" label="Bairro" required></v-text-field>
      </div>
      <div style="width: 8%;">
        <v-text-field v-if="this.id" v-mask="cepMask" v-model="atleta.cep" label="CEP" required></v-text-field>
        <v-text-field v-else v-model="cep" v-mask="cepMask" label="CEP" required></v-text-field>
      </div>
      <div style="width: 4%; margin-right:4%; display: flex">
        <v-icon style="vertical-align:middle">mdi-magnify</v-icon>
      </div>
      <div style="width: 40%; margin-right:4%">
        <v-text-field v-if="this.id" v-model="atleta.cidade" label="Cidade" required></v-text-field>
        <v-text-field v-else v-model="cidade" label="Cidade" required></v-text-field>
      </div>
      <div style="width: 6%">
        <v-select v-if="this.id" name="uf" v-model="atleta.uf" :items="ufs" label="UF" required></v-select>
        <v-select v-else name="uf" v-model="uf" :items="ufs" label="UF" required></v-select>
      </div>
    </div>
    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <div style="width: 48%; margin-right:4%">
        <v-text-field
          v-if="this.id"
          v-mask="celMask"
          v-model="atleta.celular"
          label="Telefone Celular"
        ></v-text-field>
        <v-text-field v-else v-mask="celMask" v-model="celular" label="Telefone Celular" required></v-text-field>
      </div>
      <div style="width: 48%">
        <v-text-field v-if="this.id" v-mask="telMask" v-model="atleta.tel" label="Telefone Fixo"></v-text-field>
        <v-text-field v-else v-model="tel" v-mask="telMask" label="Telefone Fixo" required></v-text-field>
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
          v-model="atleta.posicao.id"
          :items="posicoes"
          item-text="nome"
          item-value="id"
          label="posicao"
          required
        ></v-select>
        <v-select
          v-else
          v-model="posicao.id"
          :items="posicoes"
          item-text="nome"
          item-value="id"
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
        <v-text-field
          :disabled="!atleta.federado"
          v-if="this.id"
          v-model="atleta.federacao"
          label="Qual Federação?"
        ></v-text-field>
        <v-text-field
          :disabled="!federado"
          v-else
          v-model="federacao"
          label="Qual Federação?"
          required
        ></v-text-field>
      </div>
    </div>
    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <div style="width: 100%; margin: 0 auto; margin-bottom: 20px; text-align: center;">
        <v-btn v-if="this.id" class="mr-4" @click="editarAtleta(atleta)" color="primary">Editar</v-btn>
        <v-btn v-else class="mr-4" @click="addAtleta()" color="primary">Salvar</v-btn>
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
import { mask } from "vue-the-mask";
export default {
  components: {
    Nav,
    PictureInput
  },
  directives: {
    mask
  },
  data() {
    return {
      nome: "",
      email: "",
      cpf: "",
      rg: "",
      vmodelDtNascimento: "13/09/1988",
      dtNascimento: "",
      endereco: "",
      num: "",
      bairro: "",
      cep: "",
      cidade: "",
      uf: "",
      celular: "",
      tel: "",
      escolaridade: "",
      nomeEscola: "",
      pai: "",
      mae: "",
      indicacao: "",
      federado: "",
      federacao: "",
      dtCadastro: "",
      atleta: {},
      posicao: {},
      posicoes: [],
      id: this.$route.params.id,
      escolaridades: [
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
      ],
      ufs: [
        "AC",
        "AL",
        "AM",
        "AP",
        "BA",
        "CE",
        "DF",
        "ES",
        "GO",
        "MA",
        "MG",
        "MS",
        "MT",
        "PA",
        "PB",
        "PE",
        "PI",
        "PR",
        "RJ",
        "RN",
        "RO",
        "RR",
        "RS",
        "SC",
        "SE",
        "SP",
        "TO"
      ],
      date: new Date().toLocaleString().substr(0, 10),
      menu: false,
      cpfMask: "###.###.###-##",
      rgMask: "##.###.###-#",
      dataMask: "##/##/####",
      celMask: "(##) #####-####",
      telMask: "(##) ####-####",
      cepMask: "##.###-###"
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

  methods: {
    addAtleta() {
      let now = new Date();
      this.dtCadastro =
        now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
      this.posicao = this.posicoes.filter(x => x.id == this.posicao.id)[0];
      let data = new Date(this.date);
      this.dtNascimento =
        data.getDate() +
        1 +
        "/" +
        (data.getMonth() + 1) +
        "/" +
        data.getFullYear();
      let _atleta = {
        nome: this.nome,
        email: this.email,
        cpf: this.cpf,
        rg: this.rg,
        endereco: this.endereco,
        num: this.num,
        bairro: this.bairro,
        cep: this.cep,
        cidade: this.cidade,
        uf: this.uf,
        celular: this.celular,
        tel: this.tel,
        escolaridade: this.escolaridade,
        nomeEscola: this.nomeEscola,
        pai: this.pai,
        mae: this.mae,
        posicao: {
          id: this.posicao.id,
          nome: this.posicao.nome
        },
        indicacao: this.indicacao,
        federado: this.federado,
        federacao: this.federacao,
        dtCadastro: this.dtCadastro,
        dtNascimento: this.dtNascimento
      };
      this.$http
        .post(
          "https://my-json-server.typicode.com/rafafcasado/peneirasccp/atletas",
          _atleta
        )
        .then(res => res.json())
        .then(
          (this.nome = ""),
          (this.email = ""),
          (this.cpf = ""),
          (this.rg = ""),
          (this.endereco = ""),
          (this.num = ""),
          (this.bairro = ""),
          (this.cep = ""),
          (this.cidade = ""),
          (this.uf = ""),
          (this.celular = ""),
          (this.tel = ""),
          (this.escolaridade = ""),
          (this.nomeEscola = ""),
          (this.posicao = {
            id: "",
            nome: ""
          }),
          (this.pai = ""),
          (this.mae = ""),
          (this.indicacao = ""),
          (this.federado = ""),
          (this.federacao = ""),
          (this.dtCadastro = ""),
          (this.dtNascimento = ""),
          this.$router.push("/atletas")
        );
    },

    editarAtleta(_atleta) {
      let now = new Date();
      this.dtCadastro =
        now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
      let data = new Date(this.date);
      let dataNascimento =
        data.getDate() +
        1 +
        "/" +
        (data.getMonth() + 1) +
        "/" +
        data.getFullYear();
      this.posicao = this.posicoes.filter(x => x.id == _atleta.posicao.id)[0];
      let _atletaEditar = {
        nome: _atleta.nome,
        email: _atleta.email,
        cpf: _atleta.cpf,
        rg: _atleta.rg,
        endereco: _atleta.endereco,
        num: _atleta.num,
        bairro: _atleta.bairro,
        cep: _atleta.cep,
        cidade: _atleta.cidade,
        uf: _atleta.uf,
        celular: _atleta.celular,
        tel: _atleta.tel,
        escolaridade: _atleta.escolaridade,
        nomeEscola: _atleta.nomeEscola,
        pai: _atleta.pai,
        mae: _atleta.mae,
        indicacao: _atleta.indicacao,
        federado: _atleta.federado,
        federacao: _atleta.federacao,
        dtCadastro: _atleta.dtCadastro,
        posicao: {
          id: this.posicao.id,
          nome: this.posicao.nome
        },
        dtNascimento: dataNascimento
      };
      this.$http.put(
        `https://my-json-server.typicode.com/rafafcasado/peneirasccp/atletas/${_atleta.id}`,
        _atletaEditar
      );
      this.$router.push("/atletas");
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