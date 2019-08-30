<template>
  <div>
    <Nav></Nav>
    <h1>Avaliação</h1>
              <div v-if="this.id" class="div-add">
      <router-link to="/atleta/detalhes/" + avaliacao.atleta.id>
        <v-btn class="mx-2" dark Small color="primary">VER DETALHES DO ATLETA</v-btn>
      </router-link>
    </div>
    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <div style="width: 20%;">
        <v-text-field
          v-if="this.id"
          v-mask="cpfMask"
          v-model="atleta.cpf"
          label="CPF do Atleta"
          required
        ></v-text-field>
        <v-text-field v-else v-model="cpf" v-mask="cpfMask" label="CPF do Atleta" required></v-text-field>
      </div>
      <div style="width: 4%; margin-right:4%; display: flex">
        <v-icon style="vertical-align:middle">mdi-magnify</v-icon>
      </div>
      <div style="width: 76%">
        <v-text-field
          v-if="this.id"
          v-model="avaliacao.atleta.nome"
          label="Nome do Atleta"
          required
        ></v-text-field>
        <v-text-field v-else v-model="atleta.nome" label="Nome do Atleta" required></v-text-field>
      </div>
    </div>

    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <div style="width: 15%; margin-right:4%">
        <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date1"
              label="Data de Nascimento"
              prepend-icon="mdi-calendar-month"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date1" no-title scrollable>
            <div class="flex-grow-1"></div>
            <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu1.save(date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </div>
      <div style="width: 37%; margin-right:4%">
        <v-select
          v-if="this.id"
          name="posicao"
          v-model="avaliacao.atleta.posicao"
          :items="posicoes"
          item-text="nome"
          item-value="id"
          label="posicao"
          required
        ></v-select>
        <v-select
          v-else
          v-model="atleta.posicao"
          :items="posicoes"
          item-text="nome"
          item-value="posicao"
          label="Posição"
          name="posicao"
          required
        ></v-select>
      </div>
      <div style="width: 40%">
        <v-text-field v-if="this.id" v-model="atleta.indicacao" label="Indicação"></v-text-field>
        <v-text-field v-else v-model="indicacao" label="Indicação" required></v-text-field>
      </div>
    </div>

    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <div style="width: 48%; margin-right:4%">
        <v-select
          v-if="this.id"
          name="categoria"
          v-model="avaliacao.categoria"
          :items="categorias"
          item-text="nome"
          item-value="id"
          label="categoria"
          required
        ></v-select>
        <v-select
          v-else
          v-model="atleta.categoria"
          :items="categorias"
          item-text="nome"
          item-value="categoria"
          label="Categoria"
          name="categoria"
          required
        ></v-select>
      </div>
      <div style="width: 48%;">
        <v-select
          v-if="this.id"
          name="posicao"
          v-model="avaliacao.treinador"
          :items="treinadores"
          item-text="nome"
          item-value="id"
          label="treinador"
          required
        ></v-select>
        <v-select
          v-else
          v-model="treinador"
          :items="treinadores"
          item-text="nome"
          item-value="id"
          label="Treinador"
          name="treinador"
          required
        ></v-select>
      </div>
    </div>
    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <div style="width: 20%; margin-right:4%">
        <v-menu
          ref="menu2"
          v-model="menu2"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date2"
              label="Data de Início"
              prepend-icon="mdi-calendar-month"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date2" no-title scrollable>
            <div class="flex-grow-1"></div>
            <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu2.save(date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </div>
      <div style="width: 20%; margin-right:4%">
        <v-menu
          ref="menu3"
          v-model="menu3"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date3"
              label="Data de Dispensa"
              prepend-icon="mdi-calendar-month"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date3" no-title scrollable>
            <div class="flex-grow-1"></div>
            <v-btn text color="primary" @click="menu3 = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu3.save(date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </div>
      <div style="width: 20%; margin-right:4%">
        <v-text-field v-if="this.id" v-mask="notaMask" v-model="avaliacao.nota.indicacao" label="Nota"></v-text-field>
        <v-text-field v-else v-mask="notaMask" v-model="nota" label="Nota" required></v-text-field>
      </div>
      <div style="width: 32%;">
        <v-text-field v-model="avaliacao.cadastradoPor" label="Cadastrado por:" readonly filled></v-text-field>
        
      </div>
      </div>
      <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <v-textarea
          name="observacao"
          label="Observação"
          value=""
        ></v-textarea>
    </div>    

    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <div style="width: 100%; margin: 0 auto; margin-bottom: 20px; text-align: center;">
        <v-btn v-if="this.id" class="mr-4" @click="editarAtleta(atleta)" color="success">Editar</v-btn>
        <v-btn v-else class="mr-4" @click="addAtleta()" color="success">Salvar</v-btn>
        <router-link to="/atletas" tag="button">
          <v-btn color="error">Cancelar</v-btn>
        </router-link>
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
      nome: "",
      cpf: "",
      dtNascimento: "",
      indicacao: "",
      dtCadastro: "",
      posicao: {},
      posicoes: [],
      avaliacoes:[],
      avaliacao:{},
      id: this.$route.params.id,
      cpfMask: "###.###.###-##",
      dataMask: "##/##/####",
      notaMask: "#,##",
      atleta:{},
      date1: new Date().toISOString().substr(0, 10),
      date2: new Date().toISOString().substr(0, 10),
      date3: new Date().toISOString().substr(0, 10),
      menu1: false,
      menu2: false,
      menu3: false
    };
  },

  created() {
    if (this.id) {
      this.$http
        .get("http://localhost:3000/avaliacoes/" + this.id)
        .then(res => res.json())
        .then(atleta => (this.atleta = atleta));
    }

    this.$http
      .get("http://localhost:3000/status")
      .then(res => res.json())
      .then(posicoes => {
        this.posicoes = posicoes;
        //.map(x => ({ text: x.nome, value: x.id }));
      });
  },

  beforeMount() {
    if (this.id) {
      this.$http
        .get("http://localhost:3000/atletas/" + this.id)
        .then(res => res.json())
        .then(atleta => (this.atleta = atleta));
    }
  },

  methods: {
    addAtleta() {
      let now = new Date();
      this.dtCadastro =
        now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
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
        indicacao: this.indicacao,
        federado: this.federado,
        federacao: this.federacao,
        dtCadastro: this.dtCadastro
      };
      this.$http
        .post("http://localhost:3000/atletas", _atleta)
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
          (this.pai = ""),
          (this.mae = ""),
          (this.indicacao = ""),
          (this.federado = ""),
          (this.federacao = ""),
          (this.dtCadastro = ""),
          this.$router.push("/atletas")
        );
    },

    editarAtleta(_atleta) {
      let now = new Date();
      this.dtCadastro =
        now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
      let _atletaEditar = {
        id: _atletaEditar.id,
        nome: _atletaEditar.nome,
        email: _atletaEditar.email,
        cpf: _atletaEditar.cpf,
        rg: _atletaEditar.rg,
        endereco: _atletaEditar.endereco,
        num: _atletaEditar.num,
        bairro: _atletaEditar.bairro,
        cep: _atletaEditar.cep,
        cidade: _atletaEditar.cidade,
        uf: _atletaEditar.uf,
        celular: _atletaEditar.celular,
        tel: _atletaEditar.tel,
        escolaridade: _atletaEditar.escolaridade,
        nomeEscola: _atletaEditar.nomeEscola,
        pai: _atletaEditar.pai,
        mae: _atletaEditar.mae,
        indicacao: _atletaEditar.indicacao,
        federado: _atletaEditar.federado,
        federacao: _atletaEditar.federacao,
        dtCadastro: _atletaEditar.dtCadastro,
        posicao: _atleta.posicao
      };
      this.$http.put(
        `http://localhost:3000/atletas/${_atleta.id}`,
        _atletaEditar
      );
      this.$router.push("/atletas");
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