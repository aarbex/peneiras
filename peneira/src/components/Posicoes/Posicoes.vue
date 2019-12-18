<template>
  <div>
    <Nav />
    <v-row class="my-5">
      <h2 class="mx-auto">Posições</h2>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="posicoes"
      calculate-widths
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
            label="Pesquisar em posicoes cadastradas"
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
            <v-list-item  v-if="!permissaoPosicao.excluir && !permissaoPosicao.editar">
              <v-list-item-title>Não há ações disponíveis</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="permissaoPosicao && permissaoPosicao.editar" @click="dialog = true; posicao = item;carregaPosicao(item)">
              <v-list-item-title text>Editar</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="permissaoPosicao && permissaoPosicao.excluir" @click="dialog1 = true; posicao = item">
              <v-list-item-title text>Excluir</v-list-item-title>
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
    <v-dialog v-model="dialog" width="80%" persistent>
      <template v-slot:activator="{ on }">
        <v-btn
        v-if="permissaoPosicao && permissaoPosicao.editar"
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
        <v-toolbar v-if="posicao.id" dark color="primary">Editar Avaliação</v-toolbar>
        <v-toolbar v-else dark color="primary">Cadastrar Avaliação</v-toolbar>
        <v-card-text>
          <v-container>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-if="posicao.id"
                  v-model="nome"
                  label="Nome da posição"
                  prepend-inner-icon="mdi-soccer-field"
                  autofocus
                  class="text-capitalized"
                  hint="* Preenchimento Obrigatório"
                  persistent-hint
                  required
                  :rules="[rules.required]"
                  @keyup.enter="verificaPosicaoEditar(posicao)"
                ></v-text-field>
                <v-text-field
                  v-else
                  v-model="nome"
                  label="Nome da posição"
                  prepend-inner-icon="mdi-soccer-field"
                  autofocus
                  class="text-capitalized"
                  hint="* Preenchimento Obrigatório"
                  persistent-hint
                  required
                  :rules="[rules.required]"
                  @keyup.enter="verificaPosicao()"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="black" text @click="limparFormulario(); dialog = false">Cancelar</v-btn>
          <v-btn
            v-if="posicao.id"
            color="blue darken-1"
            text
            @click="verificaPosicaoEditar(posicao)  "
          >Salvar</v-btn>
          <v-btn v-else color="blue darken-1" text @click="verificaPosicao()">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog1" max-width="290">
      <v-card>
        <v-card-title class="headline">Atenção!</v-card-title>

        <v-card-text justify="center">Deseja realmente excluir o posicao {{posicao.nome}}?</v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn color="black" text @click="dialog1 = false">Cancelar</v-btn>
          <v-btn color="primary" text @click="removerPosicao(posicao); dialog1=false">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog2" max-width="290">
      <v-card>
        <v-card-title class="headline">Atenção!</v-card-title>

        <v-card-text justify="center">A posição "{{this.posicaoVerificada.nome}}" já está cadastrada!</v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn color="black" text @click="dialog2 = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog3" max-width="290" persistent>
      <v-card>
        <v-card-title class="headline">Atenção!</v-card-title>

        <v-card-text justify="center">A posição não pôde ser excluída pois está vinculada à um ou mais usuários!</v-card-text>

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
export default {
  components: {
    Nav
  },
  data() {
    return {
      search: "",
      dialog: false,
      dialog1: false,
      dialog2: false,
      dialog3: false,
      nome: "",
      rules: {
        required: value => !!value || "Preenchimento obrigatório."
      },
      permissaoPosicao:{},
      posicoes: [],
      posicao: {},
      posicaoVerificada: "",
      dtCadastro: "",
      atletas:[],
      posicaoVinculada:"",
      posicaoID:"",
      date: new Date().toISOString().substr(0, 10),
      usuario: JSON.parse(window.localStorage.getItem("usuario")),
      id: this.$route.params.id
    };
  },
  computed: {
    headers() {
      return [
        {
          text: "Posicão",
          align: "center",
          value: "nome"
        },
        {
          text: "Data de Cadastro",
          value: "dtCadastro",
          align: "center"
        },

        {
          text: "Ações",
          value: "action",
          align: "center",
          sortable: false
        }
      ];
    }
  },

  created() {
    this.usuario = JSON.parse(window.localStorage.getItem("usuario"));
    this.carregarPermissao();
    this.$http
      .get("posicoes", {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      })
      .then(
        res => res.json().then(posicoes => (this.posicoes = posicoes.filter(x => x.dtExclusao == null))),
        res => {
          //error
          if (res.status == 401) {
            window.location.href =
              window.location.origin + "/login?msg=Sua Sessão expirou!";
          }
        }
      );
      this.$http
      .get("atletas", {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(atletas => (this.atletas = atletas.filter(x => x.dtExclusao == null)));
  },

  methods: {
    capital_letter(str) 
    {
      str = str.split(" ");

      for (var i = 0, x = str.length; i < x; i++) {
          str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

      return str.join(" ");
    },
    carregarPermissao(){      
      this.permissaoPosicao = this.usuario.permissoes.filter(x => x.entidade == "Posição")[0];         
    },
    filterOnlyCapsText(value, search) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        (value
          .toString()          
          .indexOf(search) !== -1 ||
        value
          .toString() 
          .toLowerCase()         
          .indexOf(search) !== -1 ||
        value
          .toString() 
          .toUpperCase()         
          .indexOf(search) !== -1)
      );
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    verificaPosicao() {
      this.posicaoVerificada = this.posicoes.filter(
        x => x.nome === this.capital_letter(this.nome)
      )[0];
      if (this.posicaoVerificada) {
        this.dialog2 = true;
      } else {
        this.addPosicao();
        this.posicaoVerificada = "";
      }
    },
    verificaPosicaoEditar(posicao) {
      this.posicaoVerificada = this.posicoes.filter(
        x => x.nome === this.capital_letter(this.nome)
      )[0];
      if (this.posicaoVerificada && this.posicaoVerificada.id != posicao.id) {
        this.dialog2 = true;
      } else {
        this.editarPosicao(posicao);
        this.posicaoVerificada = "";
      }
    },
    verificaPosicaoExclusao(){      
      this.posicaoVinculada = this.atletas.filter(x => x.posicaoID === this.posicaoID)[0];      
    },
    removerPosicao(_posicao) {
      /*this.$http
        .delete(`posicoes/${posicao.id}`, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
            "Content-Type": "application/json"
          }
        })
        .then(
          () => {
            let indice = this.posicoes.indexOf(posicao);
            this.posicoes.splice(indice, 1);
            //this.posicoes = this.posicoes.filter(p => p.id != posicao.id);
            this.dialog1 = false;
          },
          res => {
            //error
            if (res.status == 401) {
              window.location.href =
                window.location.origin + "/login?msg=Sua Sessão expirou!";
            }
          }
        );*/
      this.posicaoID = _posicao.id;
      let _posicaoEditar = {
        id: _posicao.id,
        nome: _posicao.nome,
        dtCadastro: _posicao.dtCadastro,
        dtExclusao: this.formatDate(this.date),
        usuarioExclusao: this.usuario.nome
      };
      this.verificaPosicaoExclusao();
      if(!this.posicaoVinculada){this.$http
          .put(`posicoes/${_posicaoEditar.id}`, _posicaoEditar, {
            headers: {
              Authorization: "Bearer " + window.localStorage.getItem("token"),
              "Content-Type": "application/json"
            }
          })
          .then(res => {if(res.status == 200){
          window.location.href = window.location.origin + "/posicoes"
        }});
        }
        else{this.dialog3 = true;}
    },
    addPosicao() {
      this.dtCadastro = this.formatDate(this.date);
      let _posicao = {
        nome: this.capital_letter(this.nome),
        dtCadastro: this.dtCadastro
      };
      if (this.nome.length > 0) {
        this.$http
          .post("posicoes", _posicao, {
            headers: {
              Authorization: "Bearer " + window.localStorage.getItem("token"),
              "Content-Type": "application/json"
            }
          })
          .then(res => {if(res.status == 200){
          res.json();
          window.location.href = window.location.origin + "/posicoes"
        }});
      }
    },

    editarPosicao(_posicao) {
      let _posicaoEditar = {
        id: _posicao.id,
        nome: this.capital_letter(this.nome),
        dtCadastro: this.dtCadastro
      };
      if (this.nome.length > 0) {
        this.$http
          .put(`posicoes/${_posicaoEditar.id}`, _posicaoEditar, {
            headers: {
              Authorization: "Bearer " + window.localStorage.getItem("token"),
              "Content-Type": "application/json"
            }
          })
          .then(res => {if(res.status == 200){
          window.location.href = window.location.origin + "/posicoes"
        }});
      }
    },
    carregaPosicao(posicao) {
      (this.nome = posicao.nome), (this.dtCadastro = posicao.dtCadastro);
    },
    limparFormulario() {
      this.nome = "";
      this.dtCadastro = "";
      this.posicao = {};
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
  padding: 20px 0px;
}
table {
  padding: 20px opx;
  margin: 0 auto;
}
.div-add {
  margin: 0 auto;
  text-align: right;
  padding-bottom: 10px;
  width: 70%;
}
.actionButtons {
  margin: 0 3px;
}
</style>