<template>
  <div>
    <Nav />
    <v-row class="my-5">
      <h2 class="mx-auto">Atletas</h2>
    </v-row>
    <div>
      <!--v-simple-table>
        <thead class="text-center">
          <th class="text-center">Nome</th>
          <th class="text-center">Email</th>
          <th class="text-center">CPF</th>
          <th class="text-center">Data de Nascimento</th>
          <th class="text-center">Posição</th>
          <th class="text-center">Data de Cadastro</th>
          <th class="text-center">Ações</th>
        </thead>
        <tbody v-if="atletas.length">
          <tr v-for="a in atletas" :key="a.id">
            <td class="text-center">{{a.nome}}</td>
            <td class="text-center">{{a.email}}</td>
            <td class="text-center">{{a.cpf}}</td>
            <td class="text-center">{{a.dtNascimento}}</td>
            <td class="text-center">{{a.posicao.nome}}</td>
            <td class="text-center">{{a.dtCadastro}}</td>
            <td class="text-center" style="width: 20%">
              <router-link :to="'/atleta/detalhe/' + a.id" tag="button">
                <v-btn class="mx-2" fab dark xSmall color="black">
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-icon medium dark v-on="on">mdi-eye</v-icon>
                    </template>
                    <span>Detalhes</span>
                  </v-tooltip>
                </v-btn>
              </router-link>
              <router-link :to="'/atleta/' + a.id">
                <v-btn class="mx-2" fab dark xSmall color="primary">
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-icon medium dark v-on="on">mdi-pencil</v-icon>
                    </template>
                    <span>Editar</span>
                  </v-tooltip>
                </v-btn>
              </router-link>
              <v-btn class="mx-2" fab dark xSmall color="error" @click="atleta = a;dialog1 = true">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-icon medium dark v-on="on">mdi-trash-can</v-icon>
                  </template>
                  <span>Excluir</span>
                </v-tooltip>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </!--v-simple-table>-->
      <v-data-table
        :headers="headers"
        :items="atletas"
        sort-by="dtInicio"
        item-key="id"
        class="elevation-1 px-5"
        :search="search"
        :custom-filter="filterOnlyCapsText"
      >
        <template v-slot:top>
          <v-col cols="12">
            <v-text-field
              v-model="search"
              label="Pesquisar em atletas cadastrados"
              prepend-inner-icon="mdi-magnify"
              filled
            ></v-text-field>
          </v-col>
        </template>
        <template v-slot:item.action="{ item }">
          <v-menu>
            <template v-slot:activator="{ on }">
              <v-btn light icon v-on="on">
                <v-icon primary>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list bottom>
              <router-link :to="'/atleta/detalhe/' + item.id" tag="button">
                <v-list-item>
                  <v-list-item-title xSmall>Detalhes</v-list-item-title>
                </v-list-item>
              </router-link>
              <v-list-item>
                <v-list-item-title @click="dialog = true; atleta = item">Editar</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title @click="dialog1 = true; atleta = item">Excluir</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
        <template v-slot:body.append>
          <tr>
            <td></td>

            <td colspan="4"></td>
          </tr>
        </template>
      </v-data-table>
    </div>
    <v-dialog v-model="dialog" width="80%">
      <template v-slot:activator="{ on }">
        <v-btn
          style="position: fixed; z-index: 100; right: 10pt; bottom: 1pt;"
          color="primary"
          class="ms-5 mb-5"
          fab
          dark
          small
          v-on="on"
          @click="limparFormulario()"
        >
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-icon small dark v-on="on">mdi-plus</v-icon>
            </template>
            <span>Adicionar</span>
          </v-tooltip>
        </v-btn>
      </template>
      <v-card>
        <v-toolbar v-if="atleta.id" dark color="primary">Editar Atleta</v-toolbar>
        <v-toolbar v-else dark color="primary">Cadastrar Atleta</v-toolbar>
        <v-card-text>
          <v-container>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-if="atleta.id"
                  v-model="atleta.nome"
                  :items="atletas"
                  item-text="nome"
                  item-value="id"
                  label="Nome do Atleta"
                  prepend-inner-icon="mdi-account-badge-horizontal"
                ></v-text-field>
                <v-text-field
                  v-else
                  v-model="atleta.nome"
                  :items="atletas"
                  item-text="nome"
                  item-value="id"
                  prepend-inner-icon="mdi-account-badge-horizontal"
                  label="Nome do Atleta"
                  auto-select-first
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-file-input
                  v-if="atleta.id"
                  v-model="atleta.foto"
                  :rules="rules"
                  accept="image/png, image/jpeg, image/bmp"
                  prepend-icon="mdi-camera"
                  label="Foto"
                ></v-file-input>
                <v-file-input
                  v-else
                  :rules="rules"
                  accept="image/png, image/jpeg, image/bmp"
                  prepend-icon="mdi-camera"
                  label="Foto"
                ></v-file-input>
              </v-col>
              <v-col cols="12" sm="6" md="5">
                <v-text-field
                  v-if="atleta.id"
                  v-model="atleta.email"
                  prepend-inner-icon="mdi-email"
                  label="E-mail"
                ></v-text-field>
                <v-text-field v-else v-model="email" prepend-inner-icon="mdi-email" label="E-mail"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-menu
                  ref="menu2"
                  v-model="menu2"
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
                      prepend-inner-icon="mdi-calendar-month"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date2" no-title scrollable>
                    <div class="flex-grow-1"></div>
                    <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu2.save(date2)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-if="atleta.id"
                  v-mask="cpfMask"
                  v-model="atleta.cpf"
                  label="CPF"
                  prepend-inner-icon="mdi-account-badge"
                  required
                ></v-text-field>
                <v-text-field
                  v-else
                  v-model="cpf"
                  prepend-inner-icon="mdi-account-badge"
                  v-mask="cpfMask"
                  label="CPF"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-if="atleta.id"
                  v-mask="rgMask"
                  v-model="atleta.rg"
                  prepend-inner-icon="mdi-account-badge"
                  label="RG"
                  required
                ></v-text-field>
                <v-text-field
                  v-else
                  v-model="rg"
                  prepend-inner-icon="mdi-account-badge"
                  v-mask="rgMask"
                  label="RG"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  v-if="atleta.id"
                  name="cep"
                  prepend-inner-icon="mdi-home-account"
                  v-model="atleta.cep"
                  label="CEP"
                  append-icon="mdi-magnify"
                  @click:append="buscaEndereco(atleta.cep)"
                  value
                ></v-text-field>
                <v-text-field
                  v-else
                  name="cep"
                  v-model="cep"
                  prepend-inner-icon="mdi-home-account"
                  append-icon="mdi-magnify"
                  label="CEP"
                  @click:append="buscaEndereco(cep)"
                  @blur="buscaEndereco(cep)"
                  value
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="7">
                <v-text-field
                  v-if="atleta.id"
                  name="rua"
                  prepend-inner-icon="mdi-home-account"
                  v-model="atleta.logradouro"
                  label="Endereço (Rua / Avenida)"
                  value
                ></v-text-field>
                <v-text-field
                  v-else
                  name="rua"
                  v-model="endereco.logradouro"
                  prepend-inner-icon="mdi-home-account"
                  label="Endereço (Rua / Avenida)"
                  value
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="2">
                <v-text-field
                  v-if="atleta.id"
                  name="num"
                  prepend-inner-icon="mdi-home-account"
                  v-model="atleta.num"
                  label="Número"
                  value
                ></v-text-field>
                <v-text-field
                  v-else
                  name="num"
                  v-model="num"
                  prepend-inner-icon="mdi-home-account"
                  label="Número"
                  value
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-if="atleta.id"
                  name="complemento"
                  prepend-inner-icon="mdi-home-account"
                  v-model="atleta.complemento"
                  label="Complemento"
                  value
                ></v-text-field>
                <v-text-field
                  v-else
                  name="complemento"
                  prepend-inner-icon="mdi-home-account"
                  v-model="complemento"
                  label="Complemento"
                  value
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-if="atleta.id"
                  name="bairro"
                  prepend-inner-icon="mdi-home-account"
                  v-model="atleta.bairro"
                  label="Bairro"
                  value
                ></v-text-field>
                <v-text-field
                  v-else
                  name="bairro"
                  prepend-inner-icon="mdi-home-account"
                  v-model="endereco.bairro"
                  label="Bairro"
                  value
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="9">
                <v-text-field
                  v-if="atleta.id"
                  name="cidade"
                  prepend-inner-icon="mdi-home-account"
                  v-model="atleta.localidade"
                  label="Cidade"
                  value
                ></v-text-field>
                <v-text-field
                  v-else
                  name="cidade"
                  prepend-inner-icon="mdi-home-account"
                  v-model="endereco.localidade"
                  label="Cidade"
                  value
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  v-if="atleta.id"
                  name="uf"
                  prepend-inner-icon="mdi-home-account"
                  v-model="atleta.uf"
                  label="UF"
                  value
                ></v-text-field>
                <v-text-field
                  v-else
                  name="uf"
                  prepend-inner-icon="mdi-home-account"
                  v-model="endereco.uf"
                  label="UF"
                  value
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-if="atleta.id"
                  name="celular"
                  prepend-inner-icon="mdi-cellphone-iphone"
                  v-model="atleta.celular"
                  label="Telefone Celular"
                  value
                ></v-text-field>
                <v-text-field
                  v-else
                  name="celular"
                  prepend-inner-icon="mdi-cellphone-iphone"
                  v-model="celular"
                  label="Telefone Celular"
                  value
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-if="atleta.id"
                  name="telefone"
                  prepend-inner-icon="mdi-phone"
                  v-model="atleta.tel"
                  label="Telefone Fixo"
                  value
                ></v-text-field>
                <v-text-field
                  v-else
                  name="telefone"
                  prepend-inner-icon="mdi-phone"
                  v-model="tel"
                  label="Telefone Fixo"
                  value
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-if="atleta.id"
                  name="escolaridade"
                  v-model="atleta.escolaridade"
                  :items="escolaridades"
                  label="Escolaridade"
                  prepend-inner-icon="mdi-school"
                  required
                ></v-select>
                <v-select
                  v-else
                  name="escolaridade"
                  v-model="escolaridade"
                  :items="escolaridades"
                  label="Escolaridade"
                  prepend-inner-icon="mdi-school"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-if="atleta.id"
                  name="escola"
                  prepend-inner-icon="mdi-school"
                  v-model="atleta.nomeEscola"
                  label="Escola"
                  value
                ></v-text-field>
                <v-text-field
                  v-else
                  name="escola"
                  prepend-inner-icon="mdi-school"
                  v-model="nomeEscola"
                  label="Escola"
                  value
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-if="atleta.id"
                  name="pai"
                  prepend-inner-icon="mdi-face"
                  v-model="atleta.pai"
                  label="Pai"
                  value
                ></v-text-field>
                <v-text-field
                  v-else
                  name="pai"
                  prepend-inner-icon="mdi-face"
                  v-model="pai"
                  label="Pai"
                  value
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-if="atleta.id"
                  name="mae"
                  prepend-inner-icon="mdi-face-woman"
                  v-model="atleta.mae"
                  label="Mãe"
                  value
                ></v-text-field>
                <v-text-field
                  v-else
                  name="mae"
                  prepend-inner-icon="mdi-face-woman"
                  v-model="mae"
                  label="Mãe"
                  value
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  v-if="atleta.id"
                  name="posicao"
                  v-model="atleta.posicao.id"
                  :items="posicoes"
                  prepend-inner-icon="mdi-soccer-field"
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
                  prepend-inner-icon="mdi-soccer-field"
                  label="posicao"
                  name="posicao"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-if="atleta.id"
                  name="indicacao"
                  prepend-inner-icon="mdi-account-tie"
                  v-model="atleta.indicacao"
                  label="Indicação"
                  value
                ></v-text-field>
                <v-text-field
                  v-else
                  name="indicacao"
                  prepend-inner-icon="mdi-account-tie"
                  v-model="indicacao"
                  label="Indicação"
                  value
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="2">
                <v-checkbox
                  v-if="atleta.id"
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
              </v-col>
              <v-col cols="12" sm="3" md="10">
                <v-text-field
                  :disabled="!atleta.federado"
                  v-if="atleta.id"
                  v-model="atleta.federacao"
                  prepend-inner-icon="mdi-soccer"
                  label="Qual Federação?"
                ></v-text-field>
                <v-text-field
                  :disabled="!federado"
                  v-else
                  v-model="federacao"
                  label="Qual Federação?"
                  prepend-inner-icon="mdi-soccer"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="black" text @click="limparFormulario(); dialog = false">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="adicionarOuEditar(atleta)">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog1" max-width="290">
      <v-card>
        <v-card-title class="headline mx-auto">Atenção!</v-card-title>

        <v-card-text>
          Deseja realmente excluir o atleta
          <br />
          {{atleta.nome}}?
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn color="black" text @click="dialog1 = false">Cancelar</v-btn>
          <v-btn color="primary" text @click="removerAtleta(atleta); dialog1=false">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="flex-grow-1">
      <small class="mx-5">Sport Club Corinthians Paulista © 2019 - Todos os direitos reservados</small>
    </div>
  </div>
</template>

<script>
import Nav from "../Nav/Nav";
//import PictureInput from "vue-picture-input";
import { mask } from "vue-the-mask";

export default {
  components: {
    Nav
    //PictureInput
  },
  directives: {
    mask
  },

  data() {
    return {
      nome: "",
      foto: "",
      email: "",
      cpf: "",
      rg: "",
      dtNascimento: "",
      logradouro: "",
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
      endereco: {},
      atleta: {},
      atletas: [],
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
      date: new Date().toLocaleString().substr(0, 10),
      search: "",
      menu: false,
      dialog: false,
      dialog1: false,
      cpfMask: "###.###.###-##",
      rgMask: "##.###.###-#",
      dataMask: "##/##/####",
      celMask: "(##) #####-####",
      telMask: "(##) ####-####",
      cepMask: "##.###-###",
      rules: [
        value =>
          !value ||
          value.size < 2000000 ||
          "O tamanho da foto deve ser menor do que 2MB!"
      ]
    };
  },
  computed: {
    headers() {
      return [
        {
          text: "Atleta",
          align: "left",
          value: "nome"
        },
        { text: "E-mail", value: "email" },
        { text: "CPF", value: "cpf" },
        { text: "Data de Nascimento", value: "dtNascimento" },
        { text: "Posição", value: "posicao.nome" },
        { text: "Data de Cadastro", value: "dtCadastro" },
        { text: "Ações", value: "action", align: "center", sortable: false }
      ];
    }
  },

  created() {
    this.$http
      .get(
        "https://my-json-server.typicode.com/rafafcasado/peneirasccp/atletas/"
      )
      .then(res => res.json())
      .then(atletas => (this.atletas = atletas));

    this.$http
      .get(
        "https://my-json-server.typicode.com/rafafcasado/peneirasccp/posicoes"
      )
      .then(res => res.json())
      .then(posicoes => (this.posicoes = posicoes));
  },
  beforeMount() {
    this.$http
      .get(
        "https://my-json-server.typicode.com/rafafcasado/peneirasccp/atletas/"
      )
      .then(res => res.json())
      .then(atletas => (this.atletas = atletas));
  },

  methods: {
    filterOnlyCapsText(value, search) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value
          .toString()
          .toLowerCase()
          .indexOf(search) !== -1
      );
    },
    buscaEndereco(cep) {
      this.$http
        .get("https://viacep.com.br/ws/" + cep + "/json/")
        .then(res => res.json())
        .then(endereco => (this.endereco = endereco));
    },
    limparFormulario() {
      (this.nome = ""),
        (this.foto = ""),
        (this.email = ""),
        (this.cpf = ""),
        (this.rg = ""),
        (this.dtNascimento = ""),
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
        (this.pai = ""),
        (this.mae = ""),
        (this.indicacao = ""),
        (this.federado = ""),
        (this.federacao = ""),
        (this.dtCadastro = ""),
        (this.atleta = {});
    },
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
  },
  adicionarOuEditar(atleta) {
    if (atleta.id) {
      this.addAtleta();
    } else {
      this.editarAtleta(atleta);
    }
  },
  removerAtleta(atleta) {
    this.$http
      .delete(
        `https://my-json-server.typicode.com/rafafcasado/peneirasccp/atletas/${atleta.id}`
      )
      .then(() => {
        let indice = this.atletas.indexOf(atleta);
        this.atletas.splice(indice, 1);
        //this.atletas = this.atletas.filter(u => u.id != atleta.id);
        this.dialog1 = false;
      });
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