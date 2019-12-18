<template>
  <div>
    <Nav />
    <v-row class="my-5">
      <h2 class="mx-auto">Permissões</h2>
    </v-row>
    <v-simple-table class="ma-5">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center">Entidade</th>
          <th class="text-center">Visualizar</th>
          <th class="text-center">Adicionar</th>
          <th class="text-center">Editar</th>
          <th class="text-center">Excluir</th>
          <th class="text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in permissoes" :key="item.id">
          <td>{{ item.entidade }}</td>
          <td>{{ item.visualizar ? "Sim" : "Não" }}</td>
          <td>{{ item.adicionar ? "Sim" : "Não"}}</td>
          <td>{{ item.editar ? "Sim" : "Não"}}</td>
          <td>{{ item.excluir ? "Sim" : "Não"}}</td>
          <td><v-btn v-if="permissaoPermissao && permissaoPermissao.editar" text @click="dialog = true; permissao = item; carregaPermissao(item)">Editar</v-btn></td>
          
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <div style="width: 100%; margin: 0 auto; margin-bottom: 20px; text-align: center;">
        <router-link to="/perfis" tag="button">
          <v-btn color="black" text>Voltar</v-btn>
        </router-link>
      </div>
  </div>
    <v-dialog v-model="dialog" width="50%">
      <v-card>
        <v-toolbar dark color="primary">Editar Permissão</v-toolbar>
        <v-card-text>
          <v-container>
            <v-row dense>
              <v-col cols="12">
                <h1>{{entidade}}</h1>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-checkbox
                  v-model="visualizar"
                  label="Visualizar"
                  hide-details
                  class="shrink mr-2 mt-0"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-checkbox                  
                  v-model="adicionar"
                  label="Adicionar"
                  hide-details
                  class="shrink mr-2 mt-0"
                ></v-checkbox>
              </v-col>       
              <v-col cols="12" sm="6" md="3">
                <v-checkbox
                  v-model="editar"
                  label="Editar"
                  hide-details
                  class="shrink mr-2 mt-0"
                ></v-checkbox>
              </v-col>       
              <v-col cols="12" sm="6" md="3">
                <v-checkbox                
                  v-model="excluir"
                  label="Excluir"
                  hide-details
                  class="shrink mr-2 mt-0"
                ></v-checkbox>
              </v-col>                     
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="black" text @click="dialog = false;">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="editarPermissao(permissao)">Salvar</v-btn>
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
      dialog: false,
      nome: "",
      usuario : JSON.parse(window.localStorage.getItem("usuario")),
      permissoes: [],
      permissao: {},
      entidade:"",
      visualizar:"",
      adicionar:"",
      editar:"",
      excluir:"",
      permissaoPermissao:{},
      id: this.$route.params.id
    };
  },

  created() {
    this.usuario = JSON.parse(window.localStorage.getItem("usuario"));
    this.carregarPermissao();
    this.$http
      .get("permissoes", {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(permissoes => (this.permissoes = permissoes.filter(x => x.perfilID == this.id)));
  },
  

  methods: {    
    carregarPermissao(){      
      this.permissaoPermissao = this.usuario.permissoes.filter(x => x.entidade == "Permissão")[0];      
    },  
    editarPermissao(_permissao) {
      let _permissaoEditar = {
        id: _permissao.id,
        perfilID: _permissao.perfilID,
        entidadeID: _permissao.entidadeID,
        visualizar: this.visualizar,
        adicionar: this.adicionar,
        editar: this.editar,
        excluir: this.excluir
      };      
        this.$http.put(`permissao/${_permissao.id}`, _permissaoEditar, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
            "Content-Type": "application/json"
          }
        }).then(res => {if(res.status == 200){
          window.location.href = window.location.origin + "/permissao/" + _permissao.perfilID
        }});    
    },
    carregaPermissao(permissao) {
      this.perfilID = permissao.perfilID;
      this.entidade = permissao.entidade;
      this.visualizar = permissao.visualizar;
      this.adicionar = permissao.adicionar;
      this.editar = permissao.editar;
      this.excluir = permissao.excluir;
    },
    limparFormulario() {
      this.entidade = "";
      this.visualizar = "";
      this.adicionar = "";
      this.editar = "";
      this.excluir = "";
      this.permissao = {};
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
td{
  text-align: center;
}
th{
  text-align: center;
}
</style>