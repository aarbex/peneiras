<template>
  <div>
    <Nav />
    <v-row class="my-5">
      <h2 class="mx-auto">Atletas</h2>
    </v-row>
    <div>
      <v-data-table
        :headers="headers"
        :items="atletas"
        sort-by="nome"
        item-key="id"
        class="elevation-1 px-5"
        :search="search"
        :custom-filter="filterOnlyCapsText"
        mobile-breakpoint="0"
      >
        <template v-slot:top>
          <v-col cols="12">
            <v-text-field
              v-model="search"
              label="Pesquisar em atletas cadastrados"
              prepend-inner-icon="mdi-magnify"
              filled
              clearable
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
                  <v-item-list-title xSmall>Detalhes</v-item-list-title>
                </v-list-item>
              </router-link>
              <v-list-item @click="dialog = true; atleta = item; carregaAtleta(item)">
                <v-item-list-title>Editar</v-item-list-title>
              </v-list-item>
              <v-list-item @click="dialog1 = true; atleta = item">
                <v-item-list-title>Excluir</v-item-list-title>
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
          v-on="on"
          @click="limparFormulario()"
        >
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-icon dark v-on="on">mdi-plus</v-icon>
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
            <v-row align="baseline" dense>
              <v-col cols="12" sm="6" md="2">
                <picture-input
                  ref="foto"
                  :prefill="foto"
                  @change="onChange"
                  width="90"
                  height="120"
                  size="10"
                  buttonClass="btn"
                  :zindex="0"
                  :customStrings="{
                    drag: 'Arraste ou clique aqui para selecionar uma foto',
                    tap: 'Clique aqui para selecionar uma foto',
                    change: 'Alterar Foto'      }"
                ></picture-input>
              </v-col>
              <v-col cols="12" sm="6" md="10">
                <v-text-field
                  v-model="nome"
                  hint="* Preenchimento Obrigatório"
                  persistent-hint
                  prepend-inner-icon="mdi-account-badge-horizontal"
                  label="Nome do Atleta"
                  auto-select-first
                  class="text-capitalized"
                  required
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="9">
                <v-text-field
                  v-model="email"
                  prepend-inner-icon="mdi-email"
                  label="E-mail"
                  hint="* Preenchimento Obrigatório"
                  persistent-hint
                  required
                  :rules="[rules.required, rules.email]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-menu
                  ref="menu2"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :return-value.sync="dtNascimento"
                  transition="scale-transition"
                  offset-y
                  v-mask="dataMask"
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="dtNascimento"
                      label="Data de Nascimento"
                      prepend-inner-icon="mdi-calendar-month"
                      v-on="on"
                      hint="* Preenchimento Obrigatório"
                      persistent-hint
                      required
                      :rules="[rules.required]"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date2" no-title scrollable locale="pt-BR">
                    <div class="flex-grow-1"></div>
                    <v-btn text color="primary" @click="menu2 = false ">Cancel</v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click=" dtNascimento = formatDate(date2);$refs.menu2.save(dtNascimento)"
                    >OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-if="atleta.id"
                  v-model="cpf"
                  prepend-inner-icon="mdi-account-badge"
                  v-mask="cpfMask"
                  label="CPF"
                  required
                  filled
                  readonly
                ></v-text-field>
                <v-text-field
                  v-else
                  v-model="cpf"
                  prepend-inner-icon="mdi-account-badge"
                  v-mask="cpfMask"
                  label="CPF"
                  hint="* Preenchimento Obrigatório"
                  persistent-hint
                  @blur="verificaAtletaCPF()"
                  required
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="rg"
                  prepend-inner-icon="mdi-account-badge"
                  v-mask="rgMask"
                  label="RG"
                  hint="* Preenchimento Obrigatório"
                  persistent-hint
                  required
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  name="cep"
                  v-model="cep"
                  prepend-inner-icon="mdi-home-account"
                  append-icon="mdi-magnify"
                  label="CEP"
                  @click:append="buscaEndereco(cep)"
                  @blur="buscaEndereco(cep)"
                  v-mask="cepMask"
                  value
                  hint="* Preenchimento Obrigatório"
                  persistent-hint
                  required
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="7">
                <v-text-field
                  name="rua"
                  v-model="endereco.logradouro"
                  prepend-inner-icon="mdi-home-account"
                  label="Endereço (Rua / Avenida)"
                  value
                  hint="* Preenchimento Obrigatório"
                  persistent-hint
                  required
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="2">
                <v-text-field
                  name="num"
                  v-model="num"
                  prepend-inner-icon="mdi-home-account"
                  label="Número"
                  value
                  hint="* Preenchimento Obrigatório"
                  persistent-hint
                  required
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  name="complemento"
                  prepend-inner-icon="mdi-home-account"
                  v-model="complemento"
                  label="Complemento"
                  value
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  name="bairro"
                  prepend-inner-icon="mdi-home-account"
                  v-model="endereco.bairro"
                  label="Bairro"
                  value
                  hint="* Preenchimento Obrigatório"
                  persistent-hint
                  required
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="9">
                <v-text-field
                  name="cidade"
                  prepend-inner-icon="mdi-home-account"
                  v-model="endereco.localidade"
                  label="Cidade"
                  value
                  hint="* Preenchimento Obrigatório"
                  persistent-hint
                  required
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  name="uf"
                  prepend-inner-icon="mdi-home-account"
                  v-model="endereco.uf"
                  label="UF"
                  value
                  hint="* Preenchimento Obrigatório"
                  persistent-hint
                  required
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  name="celular"
                  prepend-inner-icon="mdi-cellphone-iphone"
                  v-model="celular"
                  v-mask="celMask"
                  label="Telefone Celular"
                  value
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  name="telefone"
                  prepend-inner-icon="mdi-phone"
                  v-model="tel"
                  v-mask="telMask"
                  label="Telefone Fixo"
                  value
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  name="escolaridade"
                  v-model="escolaridade"
                  :items="escolaridades"
                  label="Escolaridade"
                  prepend-inner-icon="mdi-school"
                  hint="* Preenchimento Obrigatório"
                  persistent-hint
                  required
                  :rules="[rules.required]"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  name="escola"
                  prepend-inner-icon="mdi-school"
                  v-model="nomeEscola"
                  label="Escola"
                  class="text-capitalized"
                  hint="* Preenchimento Obrigatório"
                  persistent-hint
                  value
                  required
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  name="pai"
                  prepend-inner-icon="mdi-face"
                  v-model="pai"
                  label="Pai"
                  class="text-capitalized"
                  hint="* Preenchimento Obrigatório"
                  persistent-hint
                  value
                  required
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  name="mae"
                  prepend-inner-icon="mdi-face-woman"
                  v-model="mae"
                  label="Mãe"
                  class="text-capitalized"
                  value
                  hint="* Preenchimento Obrigatório"
                  persistent-hint
                  required
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  v-model="posicaoID"
                  :items="posicoes"
                  item-text="nome"
                  item-value="id"
                  prepend-inner-icon="mdi-soccer-field"
                  label="Posição"
                  name="posicao"
                  hint="* Preenchimento Obrigatório"
                  persistent-hint
                  required
                  :rules="[rules.required]"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  name="indicacao"
                  prepend-inner-icon="mdi-account-tie"
                  v-model="indicacao"
                  label="Indicação"
                  class="text-capitalized"
                  value
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="2">
                <v-checkbox
                  v-model="alojamento"
                  label="Necessita alojamento?"
                  hide-details
                  class="shrink mr-2 mt-0"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="6" md="2">
                <v-checkbox
                  v-model="federado"
                  label="Atleta Federado?"
                  hide-details
                  class="shrink mr-2 mt-0"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="3" md="8">
                <v-text-field
                  :disabled="!federado"
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
          <v-btn v-if="atleta.id" color="blue darken-1" text @click="editarAtleta(atleta)">Salvar</v-btn>
          <v-btn v-else color="blue darken-1" text @click="verificaAtleta()">Salvar</v-btn>
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
    <v-dialog v-model="dialog2" max-width="290">
      <v-card>
        <v-card-title class="headline">Atenção!</v-card-title>

        <v-card-text justify="center">Já existe um atleta cadastrado com o CPF "{{this.cpf}}"!</v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn color="black" text @click="dialog2 = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog3" max-width="290">
      <v-card>
        <v-card-title class="headline">Atenção!</v-card-title>

        <v-card-text justify="center">Há campos obrigatórios que não foram preenchidos!!</v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn color="black" text @click="dialog3 = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="flex-grow-1 mx-auto" align="center">
      <small class="mx-5">Sport Club Corinthians Paulista © 2019</small>
      <br />
      <small class="mx-5">Todos os direitos reservados</small>
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
      foto: "",
      email: "",
      cpf: "",
      rg: "",
      dtNascimento: "",
      logradouro: "",
      num: "",
      complemento: "",
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
      posicaoID: "",
      indicacao: "",
      alojamento: "",
      federado: "",
      federacao: "",
      dtCadastro: "",
      endereco: {},
      atleta: {},
      atletas: [],
      atletaVerificado: "",
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
      date: new Date().toISOString().substr(0, 10),
      date2: new Date().toISOString().substr(0, 10),
      search: "",
      menu: false,
      menu2: false,
      dialog: false,
      dialog1: false,
      dialog2: false,
      dialog3: false,
      cpfMask: "###.###.###-##",
      rgMask: "##.###.###-X",
      dataMask: "##/##/####",
      celMask: "(##) #####-####",
      telMask: "(##) ####-####",
      cepMask: "#####-###",
      fileSelected: "",
      rules: {
        required: value => !!value || "Preenchimento obrigatório.",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "E-mail inválido.";
        }
      }
    };
  },
  computed: {
    headers() {
      return [
        {
          text: "Atleta",
          align: "center",
          value: "nome"
        },
        { text: "E-mail", value: "email" },
        { text: "CPF", value: "cpf" },
        { text: "Data de Nascimento", value: "dtNascimento" },
        { text: "Posição", value: "posicao" },
        { text: "Data de Cadastro", value: "dtCadastro" },
        { text: "Ações", value: "action", align: "center", sortable: false }
      ];
    }
  },

  created() {
    this.$http
      .get("atletas", {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(atletas => (this.atletas = atletas));

    this.$http
      .get("posicoes", {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(posicoes => (this.posicoes = posicoes));
  },
  beforeMount() {
    this.$http
      .get("atletas", {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(atletas => (this.atletas = atletas));
  },

  methods: {
    onChange(image) {
      if (image) {
        this.foto = image;
      } else {
        alert("Imagem não suportada!");
      }
    },

    verificaAtletaCPF() {
      this.atletaVerificado = this.atletas.filter(x => x.cpf === this.cpf)[0];
      if (this.atletaVerificado) {
        this.dialog2 = true;
      }
    },

    verificaAtleta() {
      this.atletaVerificado = this.atletas.filter(x => x.cpf === this.cpf)[0];
      if (this.atletaVerificado) {
        this.dialog2 = true;
      } else {
        this.addAtleta();
        this.atletaVerificado = "";
      }
    },

    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
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
        (this.logradouro = ""),
        (this.num = ""),
        (this.complemento = ""),
        (this.bairro = ""),
        (this.cep = ""),
        (this.localidade = ""),
        (this.uf = ""),
        (this.celular = ""),
        (this.tel = ""),
        (this.escolaridade = ""),
        (this.nomeEscola = ""),
        (this.pai = ""),
        (this.mae = ""),
        (this.indicacao = ""),
        (this.alojamento = ""),
        (this.federado = ""),
        (this.federacao = ""),
        (this.dtCadastro = ""),
        (this.atleta = {});
    },
    addAtleta() {
      this.dtCadastro = this.formatDate(this.date);
      let _atleta = {
        foto: this.foto,
        nome: this.nome,
        email: this.email,
        cpf: this.cpf,
        rg: this.rg,
        logradouro: this.endereco.logradouro,
        num: this.num,
        complemento: this.complemento,
        bairro: this.endereco.bairro,
        cep: this.endereco.cep,
        localidade: this.endereco.localidade,
        uf: this.endereco.uf,
        celular: this.celular,
        tel: this.tel,
        escolaridade: this.escolaridade,
        nomeEscola: this.nomeEscola,
        pai: this.pai,
        mae: this.mae,
        posicaoID: this.posicaoID,
        indicacao: this.indicacao,
        alojamento: this.alojamento,
        federado: this.federado,
        federacao: this.federacao,
        dtCadastro: this.dtCadastro,
        dtNascimento: this.dtNascimento
      };
      if (
        this.nome.length == 0 ||
        this.email.length == 0 ||
        this.dtNascimento.length == 0 ||
        this.cpf.length == 0 ||
        this.rg.length == 0 ||
        this.cep.length == 0 ||
        this.endereco.logradouro.length == 0 ||
        this.endereco.bairro.length == 0 ||
        this.endereco.localidade.length == 0 ||
        this.endereco.uf.length == 0 ||
        this.num.length == 0 ||
        this.escolaridade.length == 0 ||
        this.nomeEscola.length == 0 ||
        this.pai.length == 0 ||
        this.mae.length == 0 ||
        this.posicaoID.length == 0
      ) {
        this.dialog3 = true;
      } else {
        this.$http
          .post("atletas", _atleta, {
            headers: {
              Authorization: "Bearer " + window.localStorage.getItem("token"),
              "Content-Type": "application/json"
            }
          })
          .then(res => res.json());
        window.location.href = window.location.origin + "/atletas";
      }
    },

    editarAtleta(_atleta) {
      //this.cep = _atleta.cep;
      //this.buscaEndereco(this.cep);
      let _atletaEditar = {
        foto: this.foto,
        nome: this.nome,
        email: this.email,
        cpf: this.cpf,
        rg: this.rg,
        logradouro: this.endereco.logradouro,
        num: this.num,
        complemento: this.complemento,
        bairro: this.endereco.bairro,
        cep: this.cep,
        localidade: this.endereco.localidade,
        uf: this.endereco.uf,
        celular: this.celular,
        tel: this.tel,
        escolaridade: this.escolaridade,
        nomeEscola: this.nomeEscola,
        pai: this.pai,
        mae: this.mae,
        indicacao: this.indicacao,
        federado: this.federado,
        federacao: this.federacao,
        alojamento: this.alojamento,
        dtCadastro: this.dtCadastro,
        posicaoID: this.posicaoID,
        dtNascimento: this.dtNascimento
      };
      if (
        this.nome.length == 0 ||
        this.email.length == 0 ||
        this.dtNascimento.length == 0 ||
        this.cpf.length == 0 ||
        this.rg.length == 0 ||
        this.cep.length == 0 ||
        this.endereco.logradouro.length == 0 ||
        this.endereco.bairro.length == 0 ||
        this.endereco.localidade.length == 0 ||
        this.endereco.uf.length == 0 ||
        this.num.length == 0 ||
        this.escolaridade.length == 0 ||
        this.nomeEscola.length == 0 ||
        this.pai.length == 0 ||
        this.mae.length == 0 ||
        this.posicaoID.length == 0
      ) {
        this.dialog3 = true;
      } else {
        this.$http.put(`atletas/${_atleta.id}`, _atletaEditar, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
            "Content-Type": "application/json"
          }
        });
        window.location.href = window.location.origin + "/atletas";
      }
    },
    carregaAtleta(atleta) {
      (this.nome = atleta.nome),
        (this.foto = atleta.foto),
        (this.email = atleta.email),
        (this.cpf = atleta.cpf),
        (this.rg = atleta.rg),
        (this.dtNascimento = atleta.dtNascimento),
        (this.endereco.logradouro = atleta.logradouro),
        (this.num = atleta.num),
        (this.complemento = atleta.complemento),
        (this.endereco.bairro = atleta.bairro),
        (this.cep = atleta.cep),
        (this.endereco.localidade = atleta.localidade),
        (this.endereco.uf = atleta.uf),
        (this.celular = atleta.celular),
        (this.tel = atleta.tel),
        (this.escolaridade = atleta.escolaridade),
        (this.nomeEscola = atleta.nomeEscola),
        (this.pai = atleta.pai),
        (this.mae = atleta.mae),
        (this.posicaoID = atleta.posicaoID),
        (this.indicacao = atleta.indicacao),
        (this.alojamento = atleta.alojamento),
        (this.federado = atleta.federado),
        (this.federacao = atleta.federacao),
        (this.dtCadastro = atleta.dtCadastro);
    },
    removerAtleta(atleta) {
      this.$http
        .delete(`atletas/${atleta.id}`, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
            "Content-Type": "application/json"
          }
        })
        .then(() => {
          let indice = this.atletas.indexOf(atleta);
          this.atletas.splice(indice, 1);
          //this.atletas = this.atletas.filter(u => u.id != atleta.id);
          this.dialog1 = false;
        });
    }
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
.text-capitalized input {
  text-transform: capitalize;
}
</style>