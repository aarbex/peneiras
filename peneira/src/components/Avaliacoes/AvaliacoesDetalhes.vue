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
          label="Posicao"
          required
          readonly
          filled
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="5">
        <v-text-field v-model="avaliacao.indicacao" readonly filled label="Indicação"></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          name="categoria"
          v-model="avaliacao.categoria.nome"
          label="Categoria"
          required
          readonly
          filled
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          name="treinador"
          v-model="avaliacao.treinador.nome"
          label="Treinador"
          required
          readonly
          filled
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          name="posicao"
          v-model="avaliacao.status.nome"
          label="Status"
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
        <v-dialog v-model="dialog" width="80%">
          <template v-slot:activator="{ on }">
            <v-btn
              text
              color="primary"
              class="ms-5"
              dark
              v-on="on"
              @click="limparFormulario()"
            >Editar</v-btn>
          </template>
          <v-card>
            <v-toolbar v-if="this.id" dark color="primary">Editar Avaliação</v-toolbar>
            <v-card-text>
              <v-container>
                <v-row dense>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-mask="cpfMask"
                      v-model="avaliacao.cpf"
                      label="CPF do Atleta"
                      required
                      append-icon="mdi-magnify"
                      prepend-inner-icon="mdi-account-badge"
                      filled
                      readonly
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="9">
                    <v-combobox
                      v-model="avaliacao.nome"
                      :items="atletas"
                      item-text="nome"
                      item-value="id"
                      label="Nome do Atleta"
                      prepend-inner-icon="mdi-account-badge-horizontal"
                      filled
                      readonly
                    ></v-combobox>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      name="categoria"
                      v-model="avaliacao.categoria.id"
                      :items="categorias"
                      item-text="nome"
                      item-value="id"
                      label="Categoria"
                      prepend-inner-icon="mdi-soccer"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      name="treinador"
                      v-model="avaliacao.treinador.id"
                      :items="treinadores"
                      item-text="nome"
                      item-value="id"
                      label="Treinador"
                      prepend-inner-icon="mdi-account-edit"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      name="status"
                      v-model="avaliacao.status.id"
                      :items="statusList"
                      item-text="nome"
                      item-value="id"
                      label="Status"
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
                      v-mask="notaMask"
                      v-model="avaliacao.nota"
                      prepend-inner-icon="mdi-thumbs-up-down"
                      label="Nota"
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
                      name="observacao"
                      v-model="avaliacao.observacao"
                      label="Observação"
                      prepend-inner-icon="mdi-note-text"
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
      </div>
    </div>
  </div>
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
      avaliacoes: [],
      avaliacao: {},
      atletas: [],
      atleta: {},
      posicoes: [],
      statusList: [],
      status: {},
      categorias: [],
      categoria: {},
      treinadores: [],
      treinador: {},
      cpfMask: "###.###.###-##",
      dataMask: "##/##/####",
      notaMask: "#,##",
      dtDispensa: "13/09/2019",
      date: new Date().toISOString().substr(0, 10),
      date2: new Date().toISOString().substr(0, 10),
      date3: new Date().toISOString().substr(0, 10),
      menu2: false,
      menu3: false,
      dialog: false,
      dialog1: false,
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

  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
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
      this.$router.push("/avaliacoes/" + this.id);
    },
    limparFormulario() {
      this.treinador = {};
      this.categoria = {};
      this.status = {};
      this.avaliacao = {};
      this.atleta = {};
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