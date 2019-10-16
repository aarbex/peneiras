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
        sort-by="dtInicio"
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
              <v-list-item>
                <v-list-item-title @click="dialog = true; avaliacao = item">Editar</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title @click="dialog1 = true; avaliacao = item">Excluir</v-list-item-title>
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
                  v-mask="cpfMask"
                  v-model="avaliacao.cpf"
                  label="CPF do Atleta"
                  required
                  append-icon="mdi-magnify"
                  prepend-inner-icon="mdi-account-badge"
                  filled
                  readonly
                ></v-text-field>
                <v-text-field
                  v-else
                  v-model="cpf"
                  v-mask="cpfMask"
                  label="CPF do Atleta"
                  append-icon="mdi-magnify"
                  prepend-inner-icon="mdi-account-badge"
                  required
                  @click:append="carregarAtletaPorCPF()"
                  @blur="carregarAtletaPorCPF()"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="9">
                <v-combobox
                  v-if="avaliacao.id"
                  v-model="avaliacao.nome"
                  :items="atletas"
                  item-text="nome"
                  item-value="id"
                  label="Nome do Atleta"
                  prepend-inner-icon="mdi-account-badge-horizontal"
                  filled
                  readonly
                ></v-combobox>
                <v-combobox
                  v-else
                  v-model="atleta.nome"
                  :items="atletas"
                  item-text="nome"
                  item-value="id"
                  label="Nome do Atleta"
                  prepend-inner-icon="mdi-account-badge-horizontal"
                  @change="carregarAtletaPorNome(atleta.nome)"
                  auto-select-first
                ></v-combobox>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  v-if="avaliacao.id"
                  name="categoria"
                  v-model="avaliacao.categoria.id"
                  :items="categorias"
                  item-text="nome"
                  item-value="id"
                  label="Categoria"
                  prepend-inner-icon="mdi-soccer"
                  required
                ></v-select>
                <v-select
                  v-else
                  v-model="categoria.id"
                  :items="categorias"
                  item-text="nome"
                  item-value="id"
                  label="Categoria"
                  name="categoria"
                  prepend-inner-icon="mdi-soccer"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  v-if="avaliacao.id"
                  name="treinador"
                  v-model="avaliacao.treinador.id"
                  :items="treinadores"
                  item-text="nome"
                  item-value="id"
                  label="Treinador"
                  prepend-inner-icon="mdi-account-edit"
                  required
                ></v-select>
                <v-select
                  v-else
                  v-model="treinador.id"
                  :items="treinadores"
                  item-text="nome"
                  item-value="id"
                  label="Treinador"
                  name="treinador"
                  prepend-inner-icon="mdi-account-edit"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  v-if="avaliacao.id"
                  name="status"
                  v-model="avaliacao.status.id"
                  :items="statusList"
                  item-text="nome"
                  item-value="id"
                  label="Status"
                  prepend-inner-icon="mdi-progress-check"
                  required
                ></v-select>
                <v-select
                  v-else
                  v-model="status.id"
                  :items="statusList"
                  item-text="nome"
                  item-value="id"
                  label="Status"
                  name="status"
                  prepend-inner-icon="mdi-progress-check"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-menu
                  ref="menu2"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :return-value.sync="avaliacao.dtInicio"
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="avaliacao.dtInicio"
                      label="Data de Início"
                      prepend-inner-icon="mdi-calendar-month"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date2" no-title scrollable locale="pt-BR">
                    <div class="flex-grow-1"></div>
                    <v-btn text color="primary" @click="menu2 = false ">Cancel</v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click=" avaliacao.dtInicio = formatDate(date2);$refs.menu2.save(avaliacao.dtInicio)"
                    >OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-menu
                  ref="menu3"
                  v-model="menu3"
                  :close-on-content-click="false"
                  :return-value.sync="avaliacao.dtDispensa"
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="avaliacao.dtDispensa"
                      label="Data de Dispensa"
                      prepend-inner-icon="mdi-calendar-month"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date3" no-title scrollable locale="pt-BR">
                    <div class="flex-grow-1"></div>
                    <v-btn text color="primary" @click="menu3 = false ">Cancel</v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click=" avaliacao.dtDispensa = formatDate(date3);$refs.menu3.save(avaliacao.dtDispensa)"
                    >OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-if="avaliacao.id"
                  v-mask="notaMask"
                  v-model="avaliacao.nota"
                  prepend-inner-icon="mdi-thumbs-up-down"
                  label="Nota"
                ></v-text-field>
                <v-text-field
                  v-else
                  v-mask="notaMask"
                  v-model="nota"
                  prepend-inner-icon="mdi-thumbs-up-down"
                  label="Nota"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="avaliacao.cadastradoPor"
                  label="Cadastrado por:"
                  readonly
                  prepend-inner-icon="mdi-account"
                  filled
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-if="avaliacao.id"
                  name="observacao"
                  v-model="avaliacao.observacao"
                  label="Observação"
                  prepend-inner-icon="mdi-note-text"
                  value
                ></v-textarea>
                <v-textarea
                  v-else
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
            @click="editarAvaliacao(avaliacao)"
          >Salvar</v-btn>
          <v-btn v-else color="blue darken-1" text @click="addAvaliacao()">Salvar</v-btn>
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
      nome: "",
      cpf: "",
      dtNascimento: "",
      indicacao: "",
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
      nota: "",
      id: this.$route.params.id,
      cpfMask: "###.###.###-##",
      dataMask: "##/##/####",
      notaMask: "#,##",
      date: new Date().toISOString().substr(0, 10),
      date2: new Date().toISOString().substr(0, 10),
      date3: new Date().toISOString().substr(0, 10),
      dateFormatted: "",
      dateFormatted2: "",
      dateFormatted3: "",
      menu2: false,
      menu3: false,
      dialog: false,
      dialog1: false
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
        { text: "CPF", value: "cpf" },
        { text: "Categoria", value: "categoria.nome" },
        { text: "Treinador", value: "treinador.nome" },
        { text: "Posição", value: "posicao" },
        { text: "Data Início", value: "dtInicio" },
        { text: "Data Dispensa", value: "dtDispensa" },
        { text: "Status", value: "status.nome" },
        { text: "Nota", value: "nota" },
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
      .get("https://my-json-server.typicode.com/rafafcasado/peneirasccp/status")
      .then(res => res.json())
      .then(status => {
        this.statusList = status;
        //.map(x => ({ text: x.nome, value: x.id }));
      });

    this.$http
      .get(
        "https://my-json-server.typicode.com/rafafcasado/peneirasccp/categorias"
      )
      .then(res => res.json())
      .then(categorias => {
        this.categorias = categorias;
        //.map(x => ({ text: x.nome, value: x.id }));
      });

    this.$http
      .get(
        "https://my-json-server.typicode.com/rafafcasado/peneirasccp/treinadores"
      )
      .then(res => res.json())
      .then(treinadores => {
        this.treinadores = treinadores;
        //.map(x => ({ text: x.nome, value: x.id }));
      });
  },

  beforeMount() {
    this.$http
      .get(
        "https://my-json-server.typicode.com/rafafcasado/peneirasccp/avaliacoes/"
      )
      .then(res => res.json())
      .then(avaliacoes => (this.avaliacoes = avaliacoes));
  },

  methods: {
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
    adicionarOuEditar(avaliacao) {
      if (avaliacao.id) {
        this.addAvaliacao();
      } else {
        this.editarAvaliacao(avaliacao);
      }
    },
    removerAvaliacao(avaliacao) {
      this.$http
        .delete(
          `https://my-json-server.typicode.com/rafafcasado/peneirasccp/avaliacoes/${avaliacao.id}`
        )
        .then(() => {
          let indice = this.avaliacoes.indexOf(avaliacao);
          this.avaliacoes.splice(indice, 1);
          //this.avaliacoes = this.avaliacoes.filter(u => u.id != avaliacao.id);
          this.dialog1 = false;
        });
    },
    addAvaliacao() {
      let now = new Date();
      this.dtCadastro =
        now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
      this.categoria = this.categorias.filter(
        x => x.id == this.categoria.id
      )[0];
      this.treinador = this.treinadores.filter(
        x => x.id == this.treinador.id
      )[0];
      this.status = this.statusList.filter(x => x.id == this.status.id)[0];
      if (this.date2) {
        let dataInicio = new Date(this.date2);
        this.dtInicio =
          dataInicio.getDate() +
          "/" +
          (dataInicio.getMonth() + 1) +
          "/" +
          dataInicio.getFullYear();
      }
      if (this.date3) {
        let dataDispensa = new Date(this.date3);
        this.dtDispensa =
          dataDispensa.getDate() +
          "/" +
          (dataDispensa.getMonth() + 1) +
          "/" +
          dataDispensa.getFullYear();
      }
      let _avaliacao = {
        nome: this.nome,
        cpf: this.cpf,
        nota: this.nota,
        treinador: {
          id: this.treinador.id,
          nome: this.treinador.nome
        },
        categoria: {
          id: this.categoria.id,
          nome: this.categoria.nome
        },
        status: {
          id: this.status.id,
          nome: this.status.nome
        },
        dtInicio: this.dtInicio,
        dtDispensa: this.dtDispensa,
        dtCadastro: this.dtCadastro,
        cadastradoPor: this.cadastradoPor,
        observacao: this.observacao
      };
      this.$http
        .post(
          "https://my-json-server.typicode.com/rafafcasado/peneirasccp/avaliacoes",
          _avaliacao
        )
        .then(res => res.json())
        .then(
          (this.nome = ""),
          (this.cpf = ""),
          (this.nota = ""),
          (this.treinador = ""),
          (this.categoria = ""),
          (this.dtInicio = ""),
          (this.dtDispensa = ""),
          (this.dtCadastro = ""),
          (this.cadastradoPor = ""),
          (this.status = ""),
          (this.dialog = false),
          this.$router.push("/avaliacoes")
        );
    },

    editarAvaliacao(_avaliacao) {
      this.categoria = this.categorias.filter(
        x => x.id == _avaliacao.categoria.id
      )[0];
      this.treinador = this.treinadores.filter(
        x => x.id == _avaliacao.treinador.id
      )[0];
      this.status = this.statusList.filter(
        x => x.id == _avaliacao.status.id
      )[0];
      if (this.date2) {
        let dataInicio = new Date(this.date2);
        this.dtInicio =
          dataInicio.getDate() +
          1 +
          "/" +
          (dataInicio.getMonth() + 1) +
          "/" +
          dataInicio.getFullYear();
      }
      if (this.date3) {
        let dataDispensa = new Date(this.date3);
        this.dtDispensa =
          dataDispensa.getDate() +
          1 +
          "/" +
          (dataDispensa.getMonth() + 1) +
          "/" +
          dataDispensa.getFullYear();
      }
      let _avaliacaoEditar = {
        nome: _avaliacao.nome,
        cpf: _avaliacao.cpf,
        treinador: {
          id: this.treinador.id,
          nome: this.treinador.nome
        },
        categoria: {
          id: this.categoria.id,
          nome: this.categoria.nome
        },
        nota: _avaliacao.nota,
        dtNascimento: _avaliacao.dtNascimento,
        dtInicio: _avaliacao.dtInicio,
        dtDispensa: _avaliacao.dtDispensa,
        posicao: _avaliacao.posicao,
        status: {
          id: this.status.id,
          nome: this.status.nome
        }
      };
      this.$http.put(
        `https://my-json-server.typicode.com/rafafcasado/peneirasccp/avaliacoes/${_avaliacao.id}`,
        _avaliacaoEditar
      );
      this.$router.push("/avaliacoes");
    },
    carregarAtletaPorCPF() {
      this.$http
        .get(
          "https://my-json-server.typicode.com/rafafcasado/peneirasccp/atletas"
        )
        .then(res => res.json())
        .then(atletas => (this.atletas = atletas));
      this.atleta = this.atletas.filter(x => x.cpf == this.cpf)[0];
      this.nome = this.atleta.nome;
      this.posicao = this.atleta.posicao.nome;
      this.dtNascimento = this.atleta.dtNascimento;
      this.indicacao = this.atleta.indicacao;
    },
    carregarAtletaPorNome(atleta) {
      this.$http
        .get(
          "https://my-json-server.typicode.com/rafafcasado/peneirasccp/atletas"
        )
        .then(res => res.json())
        .then(atletas => (this.atletas = atletas));
      this.atleta = this.atletas.filter(x => x.nome === atleta.nome)[0];
      this.cpf = this.atleta.cpf;
      this.nome = this.atleta.nome;
      this.posicao = this.atleta.posicao.nome;
      this.dtNascimento = this.atleta.dtNascimento;
      this.indicacao = this.atleta.indicacao;
    },
    limparFormulario() {
      this.nome = "";
      this.cpf = "";
      this.nota = "";
      this.treinador = {};
      this.categoria = {};
      this.dtInicio = "";
      this.dtDispensa = "";
      this.dtCadastro = "";
      this.cadastradoPor = "";
      this.status = {};
      this.avaliacao = {};
      this.atleta = {};
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