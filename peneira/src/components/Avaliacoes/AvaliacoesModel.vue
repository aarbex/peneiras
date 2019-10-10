<template>
  <div>
    <Nav></Nav>
    <h1>Avaliação</h1>
    <div v-if="this.id" class="div-add">
      <router-link to="`/atleta/detalhe/ ${avaliacao.atleta.id}`">
        <v-btn class="mx-2" dark Small color="primary">VER DETALHES DO ATLETA</v-btn>
      </router-link>
    </div>
    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <div style="width: 18%;">
        <v-text-field
          v-if="this.id"
          v-mask="cpfMask"
          v-model="avaliacao.cpf"
          label="CPF do Atleta"
          required
        ></v-text-field>
        <v-text-field v-else v-model="cpf" v-mask="cpfMask" label="CPF do Atleta" required></v-text-field>
      </div>
      <div style="width: 4%; margin-right:2%; display: flex">
        <v-icon
          @click="carregarAtletaPorCPF()"
          @keyup.enter="carregarAtletaPorCPF()"
          style="vertical-align:middle"
        >mdi-magnify</v-icon>
      </div>
      <div style="width: 80%">
        <v-combobox
          v-if="this.id"
          v-model="avaliacao.nome"
          :items="atletas"
          item-text="nome"
          item-value="id"
          label="Nome do Atleta"
          @change="carregarAtletaPorNome(atleta.nome)"
        ></v-combobox>
        <v-combobox
          v-else
          v-model="atleta.nome"
          :items="atletas"
          item-text="nome"
          item-value="id"
          label="Nome do Atleta"
          @change="carregarAtletaPorNome(atleta.nome)"
          auto-select-first
        ></v-combobox>
      </div>
    </div>

    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <div style="width: 20%; margin-right:4%">
        <v-text-field
          prepend-icon="mdi-calendar-month"
          v-if="this.id"
          v-model="avaliacao.dtNascimento"
          label="Data de Nascimento"
          filled
          readonly
        ></v-text-field>
        <v-text-field
          prepend-icon="mdi-calendar-month"
          v-else
          v-model="dtNascimento"
          label="Data de Nascimento"
          filled
          readonly
        ></v-text-field>
      </div>
      <div style="width: 30%; margin-right:4%">
        <div>
          <v-text-field v-if="this.id" v-model="avaliacao.posicao" label="Posição" filled readonly></v-text-field>
          <v-text-field v-else v-model="posicao" label="Posição" filled readonly></v-text-field>
        </div>
      </div>
      <div style="width: 47%">
        <v-text-field
          v-if="this.id"
          v-model="avaliacao.indicacao"
          label="Indicação"
          filled
          readonly
        ></v-text-field>
        <v-text-field v-else v-model="indicacao" label="Indicação" filled readonly></v-text-field>
      </div>
    </div>

    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <div style="width: 30%; margin-right:4%">
        <v-select
          v-if="this.id"
          name="categoria"
          v-model="avaliacao.categoria.id"
          :items="categorias"
          item-text="nome"
          item-value="id"
          label="categoria"
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
          required
        ></v-select>
      </div>
      <div style="width: 38%; margin-right:4%">
        <v-select
          v-if="this.id"
          name="treinador"
          v-model="avaliacao.treinador.id"
          :items="treinadores"
          item-text="nome"
          item-value="id"
          label="treinador"
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
          required
        ></v-select>
      </div>
      <div style="width: 24%">
        <v-select
          v-if="this.id"
          name="status"
          v-model="avaliacao.status.id"
          :items="statusList"
          item-text="nome"
          item-value="id"
          label="Status"
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
              prepend-icon="mdi-calendar-month"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date2" no-title scrollable>
            <div class="flex-grow-1"></div>
            <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu2.save(date2)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </div>
      <div style="width: 20%; margin-right:4%">
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
              prepend-icon="mdi-calendar-month"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date3" no-title scrollable>
            <div class="flex-grow-1"></div>
            <v-btn text color="primary" @click="menu3 = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu3.save(date3)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </div>
      <div style="width: 20%; margin-right:4%">
        <v-text-field v-if="this.id" v-mask="notaMask" v-model="avaliacao.nota" label="Nota"></v-text-field>
        <v-text-field v-else v-mask="notaMask" v-model="nota" label="Nota" required></v-text-field>
      </div>
      <div style="width: 32%;">
        <v-text-field v-model="avaliacao.cadastradoPor" label="Cadastrado por:" readonly filled></v-text-field>
      </div>
    </div>
    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <v-textarea name="observacao" label="Observação" value></v-textarea>
    </div>

    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <div style="width: 100%; margin: 0 auto; margin-bottom: 20px; text-align: center;">
        <v-btn
          v-if="this.id"
          class="mr-4"
          @click="editarAvaliacao(avaliacao)"
          color="primary"
        >Editar</v-btn>
        <v-btn v-else class="mr-4" @click="addAvaliacao()" color="primary">Salvar</v-btn>
        <router-link to="/avaliacoes" tag="button">
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
      date2: "",
      date3: "",
      menu2: false,
      menu3: false
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

  methods: {
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
        dtNascimento: this.dtNascimento,
        posicao: this.posicao,
        indicacao: this.indicacao,
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
          (this.dtNascimento = ""),
          (this.indicacao = ""),
          (this.posicao = ""),
          (this.nota = ""),
          (this.treinador = ""),
          (this.categoria = ""),
          (this.dtInicio = ""),
          (this.dtDispensa = ""),
          (this.dtCadastro = ""),
          (this.cadastradoPor = ""),
          (this.status = ""),
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
        indicacao: _avaliacao.indicacao,
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