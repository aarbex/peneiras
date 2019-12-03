<template>
  <v-container fluid>
    <Nav />
    <v-row class="my-5">
      <h2 class="mx-auto">Avaliações</h2>
    </v-row>
    <v-container fluid>
      <v-data-table
        :headers="headers"
        :items="avaliacoes"
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
              label="Pesquisar em avaliações cadastradas"
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
              <router-link :to="'/avaliacao/detalhe/' + item.id" tag="button">
                <v-list-item>
                  <v-list-item-title xSmall>Detalhes</v-list-item-title>
                </v-list-item>
              </router-link>
              <v-list-item
                @click="dialog = true; avaliacao = item; carregaAvaliacao(item); verificaAutorizador()"
              >
                <v-list-item-title>Editar</v-list-item-title>
              </v-list-item>
              <v-list-item @click="dialog1 = true; avaliacao = item">
                <v-list-item-title>Excluir</v-list-item-title>
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
    </v-container>

    <div class="flex-grow-1"></div>
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
        <v-toolbar v-if="avaliacao.id" dark color="primary">Editar Avaliação</v-toolbar>
        <v-toolbar v-else dark color="primary">Cadastrar Avaliação</v-toolbar>
        <v-card-text>
          <v-container>
            <v-row dense>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  v-if="avaliacao.id"
                  v-mask="rgMask"
                  v-model="rg"
                  label="RG do Atleta"
                  required
                  append-icon="mdi-magnify"
                  prepend-inner-icon="mdi-account-badge"
                  filled
                  readonly
                ></v-text-field>
                <v-text-field
                  v-else
                  v-model="rg"
                  v-mask="rgMask"
                  label="RG do Atleta"
                  append-icon="mdi-magnify"
                  prepend-inner-icon="mdi-account-badge"
                  hint="* Preenchimento Obrigatório"
                  persistent-hint
                  required
                  :rules="[rules.required]"
                  @click:append="carregarAtletaPorRG()"
                  @blur="carregarAtletaPorRG()"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="9">
                <v-text-field
                  v-if="avaliacao.id"
                  v-model="nome"
                  :items="atletas"
                  item-text="nome"
                  item-value="id"
                  label="Nome do Atleta"
                  prepend-inner-icon="mdi-account-badge-horizontal"
                  filled
                  readonly
                ></v-text-field>
                <v-combobox
                  v-else
                  v-model="nome"
                  :items="atletas"
                  item-text="nome"
                  item-value="id"
                  label="Nome do Atleta"
                  prepend-inner-icon="mdi-account-badge-horizontal"
                  @change="carregarAtletaPorNome()"
                  readonly
                  auto-select-first
                  hint="* Preenchimento Obrigatório"
                  persistent-hint
                  required
                  :rules="[rules.required]"
                ></v-combobox>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  name="categoria"
                  v-model="categoriaID"
                  :items="categorias"
                  item-text="nome"
                  item-value="id"
                  label="Categoria"
                  prepend-inner-icon="mdi-soccer"
                  hint="* Preenchimento Obrigatório"
                  persistent-hint
                  required
                  :rules="[rules.required]"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  v-model="treinadorID"
                  :items="treinadores"
                  item-text="nome"
                  item-value="id"
                  label="Treinador"
                  name="treinador"
                  prepend-inner-icon="mdi-account-edit"
                  hint="* Preenchimento Obrigatório"
                  persistent-hint
                  required
                  :rules="[rules.required]"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  v-model="statusID"
                  :items="statusList"
                  item-text="nome"
                  item-value="id"
                  label="Status"
                  name="status"
                  prepend-inner-icon="mdi-progress-check"
                  hint="* Preenchimento Obrigatório"
                  persistent-hint
                  required
                  :rules="[rules.required]"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-menu
                  ref="menu2"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :return-value.sync="dtInicio"
                  transition="scale-transition"
                  offset-y
                  v-mask="dataMask"
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="dtInicio"
                      label="Data de Início"
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
                      @click=" dtInicio = formatDate(date2);$refs.menu2.save(dtInicio)"
                    >OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-menu
                  ref="menu3"
                  v-model="menu3"
                  :close-on-content-click="false"
                  :return-value.sync="dtDispensa"
                  transition="scale-transition"
                  offset-y
                  v-mask="dataMask"
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="dtDispensa"
                      label="Data de Dispensa"
                      prepend-inner-icon="mdi-calendar-month"
                      v-on="on"
                      @blur="verificaDatas()"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date3" no-title scrollable locale="pt-BR">
                    <div class="flex-grow-1"></div>
                    <v-btn text color="primary" @click="menu3 = false ">Cancel</v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click=" dtDispensa = formatDate(date3);$refs.menu3.save(dtDispensa); verificaDatas()"
                    >OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-mask="notaMask"
                  v-model="nota"
                  prepend-inner-icon="mdi-thumbs-up-down"
                  label="Nota"
                  hint="##,#"
                  persistent-hint
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-if="avaliacao.id"
                  v-model="cadastradoPor"
                  label="Cadastrado por:"
                  readonly
                  prepend-inner-icon="mdi-account"
                  filled
                ></v-text-field>
                <v-text-field
                  v-else
                  v-model="usuario.nome"
                  label="Cadastrado por:"
                  readonly
                  prepend-inner-icon="mdi-account"
                  filled
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-if="autorizar || autorizador"
                  v-model="autorizador"
                  prepend-inner-icon="mdi-thumbs-up-down"
                  label="Autorizado por:"
                  class="text-capitalized"
                  hint="* Preenchimento Obrigatório"
                  persistent-hint
                  required
                  :rules="[rules.required]"
                  autofocus
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  name="observacao"
                  prepend-inner-icon="mdi-note-text"
                  v-model="observacao"
                  label="Observação"
                  value
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="black" text @click="limparFormulario(); dialog = false">Cancelar</v-btn>
          <v-btn
            v-if="avaliacao.id"
            color="blue darken-1"
            text
            @click="verificaAvaliacaoEditar(avaliacao);this.verificado = true"
          >Salvar</v-btn>
          <v-btn
            v-else
            color="blue darken-1"
            text
            @click="verificaAvaliacao();this.verificado = true"
          >Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog1" max-width="290">
      <v-card>
        <v-card-title class="headline">Atenção!</v-card-title>

        <v-card-text justify="center">Deseja realmente excluir a Avaliação de {{avaliacao.nome}}?</v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn color="black" text @click="dialog1 = false">Cancelar</v-btn>
          <v-btn color="primary" text @click="removerAvaliacao(avaliacao); dialog1=false">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog2" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Atenção!</v-card-title>

        <v-card-text justify="center">
          Já existe uma avaliação cadastrada para esse atleta em {{this.ano}}!
          <br />Caso deseje continuar, será necessário informar um autorizador!
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn color="black" text @click="dialog2 = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog7" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Atenção!</v-card-title>

        <v-card-text justify="center">
          Já existe uma avaliação cadastrada para esse atleta em {{this.ano}}!
          <br />Caso deseje continuar, será necessário informar um autorizador!
          <br />Deseja continuar?
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="primary" text @click="autorizar = true; dialog7 = false">Continuar</v-btn>
          <v-btn color="black" text @click="autorizar = true;dialog7 = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog4" max-width="290">
      <v-card>
        <v-card-title class="headline">Atenção!</v-card-title>

        <v-card-text justify="center">Há campos obrigatórios que não foram preenchidos!!</v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn color="black" text @click="dialog4 = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog5" max-width="290">
      <v-card>
        <v-card-title class="headline">Atenção!</v-card-title>

        <v-card-text justify="center">A data de dispensa deve ser maior que a data de início!</v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn color="black" text @click="dialog5 = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog6" max-width="290" persistent>
      <v-card>
        <v-card-title class="headline">Atenção!</v-card-title>

        <v-card-text justify="center">RG não cadastrado em nossa base de dados!</v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn color="black" text @click="dialog6 = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="flex-grow-1 mx-auto" align="center">
      <small class="mx-5">Sport Club Corinthians Paulista © 2019</small>
      <br />
      <small class="mx-5">Todos os direitos reservados</small>
    </div>
  </v-container>
</template>

<script>
import Nav from "../Nav/Nav";

import { mask } from "vue-the-mask";

export default {
  components: {
    Nav
  },

  directives: {
    mask
  },

  data() {
    return {
      search: "",
      atletas: [],
      atleta: {},
      atletaID: "",
      nome: "",
      rg: "",
      rgValidar: "",
      dtNascimento: "",
      dtDispensa: "",
      dtInicio: "",
      indicacao: "",
      posicaoID: "",
      statusID: "",
      treinadorID: "",
      categoriaID: "",
      posicao: "",
      dtCadastro: "",
      posicoes: [],
      statusList: [],
      status: {},
      avaliacoes: [],
      avaliacao: {},
      categorias: [],
      categoria: {},
      treinadores: [],
      treinador: {},
      autorizar: false,
      autorizador: "",
      nota: "",
      observacao: "",
      usuario: JSON.parse(window.localStorage.getItem("usuario")),
      cadastradoPor: "",
      avaliacaoVerificada: "",
      verificado: false,
      id: this.$route.params.id,
      rgMask: "##.###.###-X",
      dataMask: "##/##/####",
      notaMask: "##,#",
      date: new Date().toISOString().substr(0, 10),
      date2: new Date().toISOString().substr(0, 10),
      date3: new Date().toISOString().substr(0, 10),
      hoje: new Date().toISOString().substr(0, 10),
      dateFormatted: "",
      dateFormatted2: "",
      dateFormatted3: "",
      menu2: false,
      menu3: false,
      dialog: false,
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      dialog5: false,
      dialog6: false,
      dialog7: false,
      rules: {
        required: value => !!value || "Preenchimento obrigatório."
      }
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
        { text: "RG", value: "rg" },
        { text: "Categoria", value: "categoria" },
        { text: "Treinador", value: "treinador" },
        { text: "Posição", value: "posicao" },
        { text: "Data Início", value: "dtInicio" },
        { text: "Data Dispensa", value: "dtDispensa" },
        { text: "Status", value: "status" },
        { text: "Nota", value: "nota" },
        { text: "Ações", value: "action", align: "center", sortable: false }
      ];
    }
  },

  created() {
    this.$http
      .get("avaliacoes", {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(avaliacoes => (this.avaliacoes = avaliacoes.filter(x => x.dtExclusao == null)));
    this.$http
      .get("atletas", {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(atletas => (this.atletas = atletas.filter(x => x.dtExclusao == null)));

    this.$http
      .get("status", {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(status => {
        this.statusList = status.filter(x => x.dtExclusao == null);
        //.map(x => ({ text: x.nome, value: x.id }));
      });

    this.$http
      .get("categorias", {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(categorias => {
        this.categorias = categorias.filter(x => x.dtExclusao == null);
        //.map(x => ({ text: x.nome, value: x.id }));
      });

    this.$http
      .get("treinadores", {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(treinadores => {
        this.treinadores = treinadores.filter(x => x.dtExclusao == null);
        //.map(x => ({ text: x.nome, value: x.id }));
      });
  },

  

  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    limparDataDispensa() {
      this.dtDispensa = "";
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
    verificaDatas() {
      if (this.dtDispensa.length > 0) {
        var dtInicioString = this.dtInicio.split("/");
        var dtInicioFormatada =
          dtInicioString[1] + "-" + dtInicioString[0] + "-" + dtInicioString[2];
        var dtInicio = new Date(dtInicioFormatada);
        var dtDispensaString = this.dtDispensa.split("/");
        var dtDispensaFormatada =
          dtDispensaString[1] +
          "-" +
          dtDispensaString[0] +
          "-" +
          dtDispensaString[2];
        var dtDispensa = new Date(dtDispensaFormatada);
        if (dtInicio.getTime() >= dtDispensa.getTime()) {
          this.dialog5 = true;
        }
      }
    },
    verificaDatasSalvar() {
      if (this.dtDispensa.length > 0) {
        var dtInicioString = this.dtInicio.split("/");
        var dtInicioFormatada =
          dtInicioString[1] + "-" + dtInicioString[0] + "-" + dtInicioString[2];
        var dtInicio = new Date(dtInicioFormatada);
        var dtDispensaString = this.dtDispensa.split("/");
        var dtDispensaFormatada =
          dtDispensaString[1] +
          "-" +
          dtDispensaString[0] +
          "-" +
          dtDispensaString[2];
        var dtDispensa = new Date(dtDispensaFormatada);
        if (dtInicio.getTime() >= dtDispensa.getTime()) {
          return true;
        } else {
          return false;
        }
      }
    },
    removerAvaliacao(avaliacao) {
        let _avaliacao = {
        atletaID: avaliacao.atletaID,
        treinadorID: avaliacao.treinadorID,
        categoriaID: avaliacao.categoriaID,
        nota: avaliacao.nota,
        dtNascimento: avaliacao.dtNascimento,
        dtInicio: avaliacao.dtInicio,
        dtDispensa: avaliacao.dtDispensa,
        statusID: avaliacao.statusID,
        observacao: avaliacao.observacao,
        cadastradoPor: avaliacao.cadastradoPor,
        dtCadastro: avaliacao.dtCadastro,
        autorizador: avaliacao.autorizador,
        dtExclusao: this.formatDate(this.date),
        usuarioExclusao: this.usuario.nome
      };
      this.$http.put(`avaliacoes/${avaliacao.id}`, _avaliacao, {
            headers: {
              Authorization: "Bearer " + window.localStorage.getItem("token"),
              "Content-Type": "application/json"
            }
          });          
      window.location.href = window.location.origin + "/avaliacoes";
      this.dialog1 = false;
    },
    addAvaliacao() {
      this.dtCadastro = this.formatDate(this.date);
      let _avaliacao = {
        atletaID: this.atletaID,
        nota: this.nota,
        treinadorID: this.treinadorID,
        categoriaID: this.categoriaID,
        statusID: this.statusID,
        dtInicio: this.dtInicio,
        dtDispensa: this.dtDispensa,
        dtCadastro: this.dtCadastro,
        observacao: this.observacao,
        cadastradoPor: this.usuario.nome,
        autorizador: this.autorizador
      };
      if (
        this.atleta.nome.length == 0 ||
        this.rg.length == 0 ||
        this.categoriaID.length == 0 ||
        this.treinadorID.length == 0 ||
        this.statusID.length == 0 ||
        this.dtInicio.length == 0
      ) {
        this.dialog4 = true;
      } else if (this.autorizar && !this.autorizador) {
        this.dialog4 = true;
      } else {
        this.$http
          .post("avaliacoes", _avaliacao, {
            headers: {
              Authorization: "Bearer " + window.localStorage.getItem("token"),
              "Content-Type": "application/json"
            }
          })
          .then(res => res.json());
        this.verificado = false;
        window.location.href = window.location.origin + "/avaliacoes";
      }
    },
    verificaAvaliacaoInicio() {
      if (this.verificado == false && this.dtInicio.length == 0) {
        let hoje = this.formatDate(this.hoje);
        let ano = hoje.substring(6, 10);
        this.avaliacaoVerificada = this.avaliacoes.filter(
          x => x.atletaID == this.atletaID && x.dtInicio.substring(6, 10) == ano
        )[0];
        if (this.avaliacaoVerificada) {
          this.ano = ano;
          this.dialog2 = true;
        }
      }
    },

    verificaAvaliacao() {
      let ano = this.dtInicio.substring(6, 10);
      this.avaliacaoVerificada = this.avaliacoes.filter(
        x => x.atletaID == this.atletaID && x.dtInicio.substring(6, 10) == ano
      )[0];
      if (this.avaliacaoVerificada && !this.autorizar) {
        this.ano = ano;
        this.dialog7 = true;
      } else if (!this.verificaDatasSalvar()) {
        this.addAvaliacao();
        this.avaliacaoVerificada = "";
      } else {
        this.dialog5 = true;
      }
    },
    verificaAvaliacaoEditar(avaliacao) {
      let ano = this.dtInicio.substring(6, 10);
      this.avaliacaoVerificada = this.avaliacoes.filter(
        x => x.atletaID == this.atletaID && x.dtInicio.substring(6, 10) == ano
      )[0];
      if (
        this.avaliacaoVerificada &&
        !this.autorizar &&
        this.avaliacao.id != this.avaliacaoVerificada.id
      ) {
        this.ano = ano;
        this.dialog7 = true;
      } else if (!this.verificaDatasSalvar()) {
        this.editarAvaliacao(avaliacao);
        this.avaliacaoVerificada = "";
      } else {
        this.dialog5 = true;
      }
    },
    verificaAutorizador() {
      if (this.autorizador) {
        this.autorizar = true;
      }
    },
    editarAvaliacao(_avaliacao) {
      let _avaliacaoEditar = {
        atletaID: this.atletaID,
        treinadorID: this.treinadorID,
        categoriaID: this.categoriaID,
        nota: this.nota,
        dtNascimento: this.dtNascimento,
        dtInicio: this.dtInicio,
        dtDispensa: this.dtDispensa,
        statusID: this.statusID,
        observacao: this.observacao,
        cadastradoPor: this.cadastradoPor,
        dtCadastro: this.dtCadastro,
        autorizador: this.autorizador
      };
      if (this.dtInicio.length == 0) {
        this.dialog4 = true;
      } else if (this.autorizar && !this.autorizador) {
        this.dialog4 = true;
      } else if (!this.verificaDatasSalvar()) {
        {
          this.$http.put(`avaliacoes/${_avaliacao.id}`, _avaliacaoEditar, {
            headers: {
              Authorization: "Bearer " + window.localStorage.getItem("token"),
              "Content-Type": "application/json"
            }
          });
          this.verificado = false;
          window.location.href = window.location.origin + "/avaliacoes";
        }
      } else {
        this.dialog5 = true;
      }
    },
    carregarAtletaPorRG() {
      this.$http
        .get("atletas", {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
            "Content-Type": "application/json"
          }
        })
        .then(res => res.json())
        .then(atletas => (this.atletas = atletas));
      this.atleta = this.atletas.filter(x => x.rg == this.rg)[0];
      if (this.atleta && this.atleta.dtExclusao ==  null) {
        this.atletaID = this.atleta.id;
        this.nome = this.atleta.nome;
        this.posicao = this.atleta.posicao;
        this.dtNascimento = this.atleta.dtNascimento;
        this.indicacao = this.atleta.indicacao;
        this.verificaAvaliacaoInicio();
      } else {
        this.nome = "";
        this.dialog6 = true;
      }
    },
    carregarAtletaPorNome() {
      this.$http
        .get("atletas", {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
            "Content-Type": "application/json"
          }
        })
        .then(res => res.json())
        .then(atletas => (this.atletas = atletas));
      this.atleta = this.atletas.filter(x => x.nome === this.nome)[0];
      this.atletaID = this.atleta.id;
      this.rg = this.atleta.rg;
      this.posicao = this.atleta.posicao;
      this.dtNascimento = this.atleta.dtNascimento;
      this.indicacao = this.atleta.indicacao;
      this.verificaAvaliacaoInicio();
    },
    carregaAvaliacao(avaliacao) {
      this.atletaID = avaliacao.atletaID;
      this.rg = avaliacao.rg;
      this.nome = avaliacao.nome;
      this.nota = avaliacao.nota;
      this.treinadorID = avaliacao.treinadorID;
      this.categoriaID = avaliacao.categoriaID;
      this.dtInicio = avaliacao.dtInicio;
      this.dtDispensa = avaliacao.dtDispensa;
      this.dtCadastro = avaliacao.dtCadastro;
      this.cadastradoPor = avaliacao.cadastradoPor;
      this.observacao = avaliacao.observacao;
      this.statusID = avaliacao.statusID;
      this.autorizador = avaliacao.autorizador;
    },

    limparFormulario() {
      this.atletaID = "";
      this.rg = "";
      this.nome = "";
      this.nota = "";
      this.treinadorID = "";
      this.categoriaID = "";
      this.dtInicio = "";
      this.dtDispensa = "";
      this.dtCadastro = "";
      this.observacao = "";
      this.cadastradoPor = "";
      this.statusID = "";
      this.verificado = false;
      this.avaliacao = {};
      this.atleta = {};
      this.rgValidar = "";
      this.autorizar = "";
      this.autorizador = "";
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
  width: 100%;
}
</style>