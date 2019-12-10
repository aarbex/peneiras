<template>
  <div>
    <Nav></Nav>
    <h1>Avaliação</h1>
    <v-row class="mx-5">
      <v-col cols="12" sm="6" md="3">
        <v-select
          v-if="this.id"
          name="rg"
          v-model="avaliacao.atletaID"
          :items="atletas"
          prepend-inner-icon="mdi-account-badge"
          item-text="rg"
          item-value="id"
          label="RG do Atleta"
          readonly
          filled
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="9">
        <v-select
          v-if="avaliacao.id"
          name="nome"
          v-model="avaliacao.atletaID"
          :items="atletas"
          prepend-inner-icon="mdi-account-badge-horizontal"
          item-text="nome"
          item-value="id"
          label="Nome do Atleta"
          readonly
          filled
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-select
          v-if="avaliacao.id"
          name="dtNascimento"
          v-model="avaliacao.atletaID"
          :items="atletas"
          prepend-inner-icon="mdi-calendar-month"
          item-text="dtNascimento"
          item-value="id"
          label="Data de Nascimento"
          readonly
          filled
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="5">
        <v-select
          v-if="avaliacao.id"
          name="posicao"
          v-model="avaliacao.atletaID"
          :items="atletas"
          prepend-inner-icon="mdi-soccer-field"
          item-text="posicao"
          item-value="id"
          label="Posição"
          readonly
          filled
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="5">
        <v-select
          v-if="avaliacao.id"
          name="indicacao"
          v-model="avaliacao.atletaID"
          :items="atletas"
          prepend-inner-icon="mdi-account-tie"
          item-text="indicacao"
          item-value="id"
          label="Indicação"
          readonly
          filled
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-select
          name="categoria"
          v-model="avaliacao.categoriaID"
          :items="categorias"
          item-text="nome"
          item-value="id"
          label="Categoria"
          prepend-inner-icon="mdi-soccer"
          required
          readonly
          filled
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-select
          name="treinador"
          v-model="avaliacao.treinadorID"
          :items="treinadores"
          item-text="nome"
          item-value="id"
          label="Treinador"
          prepend-inner-icon="mdi-account-edit"
          required
          readonly
          filled
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-select
          name="posicao"
          v-model="avaliacao.statusID"
          :items="statusList"
          item-text="nome"
          item-value="id"
          label="Status"
          prepend-inner-icon="mdi-progress-check"
          required
          readonly
          filled
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-text-field v-model="avaliacao.dtInicio" label="Data de Início" readonly filled></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-text-field v-model="avaliacao.dtDispensa" label="Data de Dispensa" readonly filled></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-text-field v-model="avaliacao.nota" label="Nota" readonly filled></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field v-model="avaliacao.autorizador" label="Autorizado Por" readonly filled></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
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
        <v-dialog v-model="dialog" width="80%" persistent>
          <template v-slot:activator="{ on }">
            <v-btn
              text
              color="primary"
              class="ms-5"
              dark
              @click="carregaAvaliacao(avaliacao);verificaAutorizador()"
              v-on="on"
            >Editar</v-btn>
          </template>
          <v-card>
            <v-toolbar v-if="this.id" dark color="primary">Editar Avaliação</v-toolbar>
            <v-card-text>
              <v-container>
                <v-row dense>
                  <v-col cols="12" sm="6" md="3">
                    <v-select
                      name="rg"
                      v-model="atletaID"
                      :items="atletas"
                      prepend-inner-icon="mdi-account-badge"
                      item-text="rg"
                      item-value="id"
                      label="RG do Atleta"
                      readonly
                      filled
                    ></v-select>
                  </v-col>

                  <v-col cols="12" sm="6" md="9">
                    <v-select
                      v-model="atletaID"
                      :items="atletas"
                      item-text="nome"
                      item-value="id"
                      label="Nome do Atleta"
                      prepend-inner-icon="mdi-account-badge-horizontal"
                      filled
                      readonly
                    ></v-select>
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
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      name="treinador"
                      v-model="treinadorID"
                      :items="treinadores"
                      item-text="nome"
                      item-value="id"
                      label="Treinador"
                      prepend-inner-icon="mdi-account-edit"
                      hint="* Preenchimento Obrigatório"
                      persistent-hint
                      required
                      :rules="[rules.required]"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      name="status"
                      v-model="statusID"
                      :items="statusList"
                      item-text="nome"
                      item-value="id"
                      label="Status"
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
                      full-width
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="dtInicio"
                          label="Data de Início"
                          v-mask="dataMask"
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
                      full-width
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="dtDispensa"
                          v-mask="dataMask"
                          label="Data de Dispensa"
                          prepend-inner-icon="mdi-calendar-month"
                          v-on="on"
                          @change="verificaDatas()"
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
                      hint="##,#"
                      prepend-inner-icon="mdi-thumbs-up-down"
                      label="Nota"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="cadastradoPor"
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
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      name="observacao"
                      v-model="observacao"
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
              <v-btn color="black" text @click="dialog = false">Cancelar</v-btn>
              <v-btn
                v-if="avaliacao.id"
                color="blue darken-1"
                text
                @click="verificaAvaliacaoEditar(avaliacao)"
              >Salvar</v-btn>
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
        <v-dialog v-model="dialog6" persistent max-width="290">
          <v-card>
            <v-card-title class="headline">Atenção!</v-card-title>

            <v-card-text justify="center">
              Já existe uma avaliação cadastrada para esse atleta em {{this.ano}}!
              <br />Caso deseje continuar, será necessário informar um autorizador!
            </v-card-text>

            <v-card-actions>
              <div class="flex-grow-1"></div>

              <v-btn color="black" text @click="dialog6 = false">Fechar</v-btn>
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
              <v-btn color="black" text @click="dialog7 = false">Cancelar</v-btn>
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
      atletaID: "",
      categoriaID: "",
      treinadorID: "",
      statusID: "",
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
      rgMask: "###.###.###-##",
      dataMask: "##/##/####",
      notaMask: "##,#",
      dtInicio: "",
      dtDispensa: "",
      dtCadastro: "",
      autorizar: "",
      autorizador: "",
      avaliacaoVerificada: "",
      nota: "",
      date: new Date().toISOString().substr(0, 10),
      date2: new Date().toISOString().substr(0, 10),
      date3: new Date().toISOString().substr(0, 10),
      menu2: false,
      menu3: false,
      dialog: false,
      dialog1: false,
      dialog4: false,
      dialog5: false,
      dialog6: false,
      dialog7: false,
      cadastradoPor: "",
      rules: {
        required: value => !!value || "Preenchimento obrigatório."
      },
      id: this.$route.params.id
    };
  },

  created() {
    if (this.id) {
      this.$http
        .get("avaliacoes/" + this.id, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
            "Content-Type": "application/json"
          }
        })
        .then(res => res.json())
        .then(avaliacao => (this.avaliacao = avaliacao));
    }

    this.$http
      .get("atletas", {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(atletas => {
        this.atletas = atletas;
        //.map(x => ({ text: x.nome, value: x.id }));
      });
    this.$http
      .get("avaliacoes", {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(avaliacoes => {
        this.avaliacoes = avaliacoes;
        //.map(x => ({ text: x.nome, value: x.id }));
      });

    this.$http
      .get("status", {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(status => {
        this.statusList = status;
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
        this.categorias = categorias;
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
    verificaAutorizador() {
      if (this.autorizador) {
        this.autorizar = true;
      }
    },
    verificaAvaliacaoEditar(avaliacao) {
      let ano = this.dtInicio.substring(6, 10);
      this.avaliacaoVerificada = this.avaliacoes.filter(
        x => x.atletaID == this.atletaID && x.dtInicio.substring(6, 10) == ano
      )[0];
      if (this.avaliacaoVerificada && !this.autorizar) {
        this.ano = ano;
        this.dialog7 = true;
      } else if (!this.verificaDatasSalvar()) {
        this.editarAvaliacao(avaliacao);
        this.avaliacaoVerificada = "";
      } else {
        this.dialog5 = true;
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
      } else if (!this.verificaDatasSalvar()) {
        {
          this.$http.put(`avaliacoes/${_avaliacao.id}`, _avaliacaoEditar, {
            headers: {
              Authorization: "Bearer " + window.localStorage.getItem("token"),
              "Content-Type": "application/json"
            }
          }).then(res => {if(res.status == 200){
          res.json();
          window.location.href = window.location.origin + "/avaliacao/detalhe/" + _avaliacao.id
        }});
          this.verificado = false;
          
        }
      } else {
        this.dialog5 = true;
      }
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
      this.treinador = {};
      this.categoria = {};
      this.status = {};
      this.avaliacao = {};
      this.atleta = {};
      this.atletaID = "";
      this.categoriaID = "";
      this.statusID = "";
      this.treinadorID = "";
      this.dtInicio = "";
      this.dtDispensa = "";
      this.dtCadastro = "";
      this.autorizador = "";
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