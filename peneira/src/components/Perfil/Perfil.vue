<template>
  <v-container>
    <Nav></Nav>
    <h1>Perfis de Usuário</h1>

    <div class="div-add">
      <v-dialog v-model="dialog1" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn class="mx-2 btn" fab dark xSmall v-on="on" color="primary">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-icon medium dark v-on="on">mdi-plus</v-icon>
              </template>
              <span>Adicionar</span>
            </v-tooltip>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Cadastrar Perfil</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Nome do Perfil*"
                    required
                    v-model="nome"
                    @keyup.enter="addPerfil()"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog1 = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="addPerfil()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-simple-table class="text-center" style="width: 70%; margin: 0 auto">
      <thead class="text-center">
        <th>ID</th>
        <th class="text-center">Nome</th>
        <th class="text-center">Data Cadastro</th>
        <th class="text-center">Ações</th>
      </thead>
      <tbody v-if="perfis.length">
        <tr v-for="(perfil) in perfis" :key="perfil.id">
          <td>{{perfil.id}}</td>
          <td>{{perfil.nome}}</td>
          <td>{{perfil.dtCadastro}}</td>
          <td style="width:32%">
            <router-link to="/permissoes" tag="v-btn">
              <v-btn class="actionButtons" fab dark xSmall color="black">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-icon medium dark v-on="on">mdi-account-check</v-icon>
                  </template>
                  <span>Permissões</span>
                </v-tooltip>
              </v-btn>
            </router-link>
            <v-dialog v-model="dialog3" max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn class="mx-2 btn" fab dark xSmall v-on="on" color="primary">
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-icon medium dark v-on="on">mdi-pencil</v-icon>
                    </template>
                    <span>Editar</span>
                  </v-tooltip>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Editar Perfil</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          @keyup.enter="editarPerfil(perfil)"
                          label="Nome do Perfil*"
                          required
                          v-model="perfil.nome"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeEdit()">Fechar</v-btn>
                  <v-btn color="blue darken-1" text @click="editarPerfil(perfil)">Salvar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-btn class="actionButtons" fab dark xSmall @click="dialog2=true" color="error">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon medium dark v-on="on">mdi-trash-can</v-icon>
                </template>
                <span>Excluir</span>
              </v-tooltip>
              <v-dialog v-model="dialog2" max-width="290">
                <v-card>
                  <v-card-title class="headline">Atenção!!!</v-card-title>

                  <v-card-text>Deseja realmente excluir o perfil {{perfil.nome}}?</v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="error" text @click="dialog2 = false">Cancelar</v-btn>

                    <v-btn color="success" text @click="removerPerfil(perfil)">Confirmar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-container>
</template>

<script>
import Nav from "../Nav/Nav";

export default {
  data: () => ({
    valid: true,
    dialog1: false,
    dialog2: false,
    dialog3: false,
    nome: "",
    nameRules: [v => !!v || "O nome do Perfil é obrigatório!"],
    perfis: []
  }),
  components: {
    Nav
  },

  created() {
    this.$http
      .get("http://localhost:3000/perfis")
      .then(res => res.json())
      .then(perfil => (this.perfis = perfil));
  },

  methods: {
    addPerfil() {
      let _perfil = {
        nome: this.nome,
        dtCadastro: "12/08/2019"
      };
      if (this.nome.length > 0) {
        this.$http
          .post("http://localhost:3000/perfis/", _perfil)
          .then(res => res.json())
          .then(perfil => {
            this.perfis.push(perfil);
            this.nome = "";
          });
      } else {
        this.dialog1 = false;
      }
      this.dialog1 = false;
    },

    removerPerfil(perfil) {
      this.$http
        .delete(`http://localhost:3000/perfis/${perfil.id}`)
        .then(() => {
          let indice = this.perfis.indexOf(perfil);
          this.perfis.splice(indice, 1);
          //this.perfis = this.perfis.filter(p => p.id != perfil.id);
        });
      this.dialog2 = false;
    },

    closeEdit() {
      this.dialog3 = false;
    },

    editarPerfil(_perfil) {
      let _perfilEditar = {
        id: _perfil.id,
        nome: _perfil.nome,
        dtCadastro: "12/08/2019"
      };
      this.$http.put(
        `http://localhost:3000/perfis/${_perfilEditar.id}`,
        _perfilEditar
      );
      this.closeEdit();
    }
  }
};
</script>

<style scoped>
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