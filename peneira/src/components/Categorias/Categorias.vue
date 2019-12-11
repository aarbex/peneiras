<template>
  <div>
    <Nav />
    <v-row class="my-5">
      <h2 class="mx-auto">Categorias</h2>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="categorias"
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
            label="Pesquisar em categorias cadastradas"
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
            <v-list-item @click="dialog = true; categoria = item; carregaCategoria(item)">
              <v-list-item-title>Editar</v-list-item-title>
            </v-list-item>
            <v-list-item @click="dialog1 = true; categoria = item">
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
    <v-dialog v-model="dialog" width="80%" persistent>
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
        <v-toolbar v-if="categoria.id" dark color="primary">Editar Avaliação</v-toolbar>
        <v-toolbar v-else dark color="primary">Cadastrar Avaliação</v-toolbar>
        <v-card-text>
          <v-container>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-if="categoria.id"
                  v-model="nome"
                  label="Nome da Categoria"
                  prepend-inner-icon="mdi-soccer"
                  autofocus
                  class="text-capitalized"
                  hint="* Preenchimento Obrigatório"
                  persistent-hint
                  required
                  :rules="[rules.required]"
                  @keyup.enter="verificaCategoriaEditar(categoria)"
                ></v-text-field>
                <v-text-field
                  v-else
                  v-model="nome"
                  label="Nome do Categoria"
                  prepend-inner-icon="mdi-soccer"
                  autofocus
                  class="text-capitalized"
                  hint="* Preenchimento Obrigatório"
                  persistent-hint
                  required
                  :rules="[rules.required]"
                  @keyup.enter="verificaCategoria()"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="black" text @click="limparFormulario(); dialog = false">Cancelar</v-btn>
          <v-btn
            v-if="categoria.id"
            color="blue darken-1"
            text
            @click="verificaCategoriaEditar(categoria)"
          >Salvar</v-btn>
          <v-btn v-else color="blue darken-1" text @click="verificaCategoria()">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog1" max-width="290">
      <v-card>
        <v-card-title class="headline">Atenção!</v-card-title>

        <v-card-text justify="center">Deseja realmente excluir a Categoria {{categoria.nome}}?</v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn color="black" text @click="dialog1 = false">Cancelar</v-btn>
          <v-btn color="primary" text @click="removerCategoria(categoria); dialog1=false">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog2" max-width="290">
      <v-card>
        <v-card-title class="headline">Atenção!</v-card-title>

        <v-card-text justify="center">A categoria "{{this.categoriaVerificada.nome}}" já está cadastrada!</v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn color="black" text @click="dialog2 = false">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog3" max-width="290" persistent>
      <v-card>
        <v-card-title class="headline">Atenção!</v-card-title>

        <v-card-text justify="center">A categoria não pôde ser excluída pois está vinculada à uma ou mais avaliações!</v-card-text>

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
      categorias: [],
      categoriaID:"",
      avaliacoes: [],
      categoria: {},
      avaliacaoVinculada:"",
      categoriaVerificada: "",
      dtCadastro: "",
      date: new Date().toISOString().substr(0, 10),
      usuario: JSON.parse(window.localStorage.getItem("usuario")),
      id: this.$route.params.id
    };
  },
  computed: {
    headers() {
      return [
        {
          text: "Categoria",
          value: "nome",
          align: "center"
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
    this.$http
      .get("categorias", {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(categorias => (this.categorias = categorias.filter(x => x.dtExclusao == null)));
      this.$http
      .get("avaliacoes", {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(avaliacoes => (this.avaliacoes = avaliacoes.filter(x => x.dtExclusao == null)));
  },  

  methods: {
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
    capital_letter(str) 
    {
      str = str.split(" ");

      for (var i = 0, x = str.length; i < x; i++) {
          str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

      return str.join(" ");
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    verificaCategoriaExclusao(){      
      this.avaliacaoVinculada = this.avaliacoes.filter(x => x.categoriaID === this.categoriaID)[0];      
    },

    removerCategoria(_categoria) {
      this.categoriaID = _categoria.id;
      let _categoriaEditar = {
        id: _categoria.id,
        nome: _categoria.nome,
        dtCadastro: _categoria.dtCadastro,
        dtExclusao: this.formatDate(this.date),
        usuarioExclusao: this.usuario.nome
      };
      this.verificaCategoriaExclusao();
      if(!this.avaliacaoVinculada){this.$http.put(`categorias/${_categoriaEditar.id}`, _categoriaEditar, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
            "Content-Type": "application/json"
          }
        }).then(res => {if(res.status == 200){          
          window.location.href = window.location.origin + "/categorias"
        }});
      }
      else{        
        this.dialog3 = true;
      }
    },
    addCategoria() {
      this.dtCadastro = this.formatDate(this.date);
      let _categoria = {
        nome: this.capital_letter(this.nome),
        dtCadastro: this.dtCadastro
      };
      if (this.nome.length > 0) {
        this.$http
          .post("categorias", _categoria, {
            headers: {
              Authorization: "Bearer " + window.localStorage.getItem("token"),
              "Content-Type": "application/json"
            }
          })
          .then(res => {if(res.status == 200){
          res.json();
          window.location.href = window.location.origin + "/categorias"
        }});
      }
    },

    editarCategoria(_categoria) {
      let _categoriaEditar = {
        id: _categoria.id,
        nome: this.capital_letter(this.nome),
        dtCadastro: this.dtCadastro
      };
      if (this.nome.length > 0) {
        this.$http.put(`categorias/${_categoriaEditar.id}`, _categoriaEditar, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
            "Content-Type": "application/json"
          }
        }).then(res => {if(res.status == 200){          
          window.location.href = window.location.origin + "/categorias"
        }});
      }
    },
    verificaCategoria() {
      this.categoriaVerificada = this.categorias.filter(
        x => x.nome === this.capital_letter(this.nome)
      )[0];
      if (this.categoriaVerificada) {
        this.dialog2 = true;
      } else {
        this.addCategoria();
        this.categoriaVerificada = "";
      }
    },
    verificaCategoriaEditar(categoria) {
      this.categoriaVerificada = this.categorias.filter(
        x => x.nome === this.capital_letter(this.nome)
      )[0];
      if (this.categoriaVerificada && this.categoriaVerificada.id != categoria.id) {
        this.dialog2 = true;
      } else {
        this.editarCategoria(categoria);
        this.categoriaVerificada = "";
      }
    },
    carregaCategoria(categoria) {
      this.nome = categoria.nome;
      this.dtCadastro = categoria.dtCadastro;
    },
    limparFormulario() {
      this.nome = "";
      this.dtCadastro = "";
      this.categoria = {};
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