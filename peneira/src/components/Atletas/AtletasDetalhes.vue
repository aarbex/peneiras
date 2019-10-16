<template>
  <div>
    <Nav></Nav>

    <v-row class="mx-5" flex bottom>
      <v-col cols="12" sm="6" md="2">
        <img
          center
          width="120"
          height="160"
          src="http://kb-w.com/wp-content/uploads/2019/08/3x4-Placeholder.jpg"
          alt
        />
      </v-col>
      <v-col cols-12 sm="6" md="10">
        <p class="display-2 mt-5">{{atleta.nome}}</p>
      </v-col>
      <v-col cols="12" sm="6" md="10">
        <v-text-field v-model="atleta.email" label="E-mail" filled readonly></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-text-field v-model="atleta.dtNascimento" label="Data de Nascimento" filled readonly></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field v-model="atleta.cpf" label="CPF" filled readonly></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field v-model="atleta.rg" label="RG" filled readonly></v-text-field>
      </v-col>

      <v-col cols="12" sm="6" md="10">
        <v-text-field v-model="atleta.endereco" label="Endereço (Rua / Avenida)" readonly filled></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-text-field v-model="atleta.num" label="Número" readonly filled></v-text-field>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-text-field v-model="atleta.bairro" label="Bairro" readonly filled></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-text-field v-model="atleta.cep" label="CEP" readonly filled></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-text-field v-model="atleta.cidade" label="Cidade" readonly filled></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-text-field v-model="atleta.uf" label="UF" readonly filled></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field v-model="atleta.celular" label="Telefone Celular" readonly filled></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field v-model="atleta.tel" label="Telefone Fixo" readonly filled></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field v-model="atleta.escolaridade" label="Escolaridade" readonly filled></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field label="Nome da Escola" v-model="atleta.nomeEscola" filled readonly></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field v-model="atleta.pai" label="Nome do Pai" readonly filled></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field v-model="atleta.mae" label="Nome da Mãe" readonly filled></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field v-model="atleta.posicao.nome" label="Posição" readonly filled></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field v-model="atleta.indicacao" label="Indicação" readonly filled></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-checkbox
          v-model="atleta.alojamento"
          label="Necessita Alojamento?"
          hide-details
          readonly
          filled
          class="shrink mr-2 mt-0"
        ></v-checkbox>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-checkbox
          v-model="atleta.federado"
          label="Atleta Federado?"
          hide-details
          readonly
          filled
          class="shrink mr-2 mt-2"
        ></v-checkbox>
      </v-col>
      <v-col cols="12" sm="6" md="8">
        <v-text-field
          :disabled="!atleta.federado"
          filled
          v-model="atleta.federacao"
          label="Qual Federação?"
          readonly
        ></v-text-field>
      </v-col>
    </v-row>
    <div style="padding-right: 20px; padding-left: 20px; display: flex; ">
      <div style="width: 100%; margin: 0 auto; margin-bottom: 20px; text-align: center;">
        <router-link to="/atletas" tag="button">
          <v-btn text style="margin: 5px" color="black">Voltar</v-btn>
        </router-link>
        <v-dialog v-model="dialog1" width="80%">
          <template v-slot:activator="{ on }">
            <v-btn
              color="primary"
              class="ms-5"
              text
              dark
              v-on="on"
              @click="limparFormulario()"
            >Editar</v-btn>
          </template>
          <v-card>
            <v-toolbar v-if="atleta.id" dark color="primary">Editar Atleta</v-toolbar>
            <v-card-text>
              <v-container>
                <v-row align="baseline" dense>
                  <v-col cols="12" sm="6" md="2">
                    <picture-input
                      ref="pictureInput"
                      @change="onChange"
                      width="90"
                      height="120"
                      accept="image/jpeg, image/png"
                      size="10"
                      buttonClass="btn"
                      :zindex="0"
                      :customStrings="{
                    drag: 'Arraste ou clique aqui para selecionar uma foto',
                    tap: 'Clique aqui para selecionar uma foto',
                    change: 'Alterar Foto'      }"
                    ></picture-input>
                  </v-col>
                  <v-col cols="12" sm="6" md="10">
                    <v-text-field
                      v-if="atleta.id"
                      v-model="atleta.nome"
                      :items="atletas"
                      item-text="nome"
                      item-value="id"
                      label="Nome do Atleta"
                      prepend-inner-icon="mdi-account-badge-horizontal"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="9">
                    <v-text-field
                      v-if="atleta.id"
                      v-model="atleta.email"
                      prepend-inner-icon="mdi-email"
                      label="E-mail"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-menu
                      ref="menu2"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :return-value.sync="atleta.dtNascimento"
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="atleta.dtNascimento"
                          label="Data de Nascimento"
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
                          @click=" dtNascimento = formatDate(date2);$refs.menu2.save(dtNascimento)"
                        >OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-if="atleta.id"
                      v-mask="cpfMask"
                      v-model="atleta.cpf"
                      label="CPF"
                      prepend-inner-icon="mdi-account-badge"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-if="atleta.id"
                      v-mask="rgMask"
                      v-model="atleta.rg"
                      prepend-inner-icon="mdi-account-badge"
                      label="RG"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-if="atleta.id"
                      name="cep"
                      prepend-inner-icon="mdi-home-account"
                      v-model="atleta.cep"
                      label="CEP"
                      append-icon="mdi-magnify"
                      @click:append="buscaEndereco(atleta.cep)"
                      value
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="7">
                    <v-text-field
                      v-if="atleta.id"
                      name="rua"
                      prepend-inner-icon="mdi-home-account"
                      v-model="atleta.endereco"
                      label="Endereço (Rua / Avenida)"
                      value
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="2">
                    <v-text-field
                      v-if="atleta.id"
                      name="num"
                      prepend-inner-icon="mdi-home-account"
                      v-model="atleta.num"
                      label="Número"
                      value
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-if="atleta.id"
                      name="complemento"
                      prepend-inner-icon="mdi-home-account"
                      v-model="atleta.complemento"
                      label="Complemento"
                      value
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-if="atleta.id"
                      name="bairro"
                      prepend-inner-icon="mdi-home-account"
                      v-model="atleta.bairro"
                      label="Bairro"
                      value
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="9">
                    <v-text-field
                      v-if="atleta.id"
                      name="cidade"
                      prepend-inner-icon="mdi-home-account"
                      v-model="atleta.cidade"
                      label="Cidade"
                      value
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      v-if="atleta.id"
                      name="uf"
                      prepend-inner-icon="mdi-home-account"
                      v-model="atleta.uf"
                      label="UF"
                      value
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-if="atleta.id"
                      name="celular"
                      prepend-inner-icon="mdi-cellphone-iphone"
                      v-model="atleta.celular"
                      label="Telefone Celular"
                      value
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-if="atleta.id"
                      name="telefone"
                      prepend-inner-icon="mdi-phone"
                      v-model="atleta.tel"
                      label="Telefone Fixo"
                      value
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      v-if="atleta.id"
                      name="escolaridade"
                      v-model="atleta.escolaridade"
                      :items="escolaridades"
                      label="Escolaridade"
                      prepend-inner-icon="mdi-school"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-if="atleta.id"
                      name="escola"
                      prepend-inner-icon="mdi-school"
                      v-model="atleta.nomeEscola"
                      label="Escola"
                      value
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-if="atleta.id"
                      name="pai"
                      prepend-inner-icon="mdi-face"
                      v-model="atleta.pai"
                      label="Pai"
                      value
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-if="atleta.id"
                      name="mae"
                      prepend-inner-icon="mdi-face-woman"
                      v-model="atleta.mae"
                      label="Mãe"
                      value
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      v-if="atleta.id"
                      name="posicao"
                      v-model="atleta.posicao.id"
                      :items="posicoes"
                      prepend-inner-icon="mdi-soccer-field"
                      item-text="nome"
                      item-value="id"
                      label="posicao"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-if="atleta.id"
                      name="indicacao"
                      prepend-inner-icon="mdi-account-tie"
                      v-model="atleta.indicacao"
                      label="Indicação"
                      value
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="2">
                    <v-checkbox
                      v-if="atleta.id"
                      v-model="atleta.alojamento"
                      label="Necessita alojamento?"
                      hide-details
                      class="shrink mr-2 mt-0"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" sm="6" md="2">
                    <v-checkbox
                      v-if="atleta.id"
                      v-model="atleta.federado"
                      label="Atleta Federado?"
                      hide-details
                      class="shrink mr-2 mt-0"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" sm="3" md="8">
                    <v-text-field
                      :disabled="!atleta.federado"
                      v-if="atleta.id"
                      v-model="atleta.federacao"
                      prepend-inner-icon="mdi-soccer"
                      label="Qual Federação?"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="black" text @click="limparFormulario(); dialog1 = false">Cancelar</v-btn>
              <v-btn
                v-if="atleta.id"
                color="blue darken-1"
                text
                @click="editarAtleta(atleta)"
              >Salvar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "../Nav/Nav";
import PictureInput from "vue-picture-input";
import { mask } from "vue-the-mask";
export default {
  components: {
    Nav,
    PictureInput
  },
  directives: {
    mask
  },
  data() {
    return {
      foto: "",
      alojamento: false,
      dtCadastro: "",
      endereco: {},
      atleta: {},
      atletas: [],
      posicao: {},
      posicoes: [],
      id: this.$route.params.id,
      escolaridades: [
        "Ensino Fundamental - Incompleto",
        "Ensino Fundamental - Completo",
        "Ensino Médio - Incompleto",
        "Ensino Médio - Completo",
        "Ensino Superior - Incompleto",
        "Ensino Superior - Completo",
        "Pós-graduação (Lato senso) - Incompleto",
        "Pós-graduação (Lato senso) - Completo",
        "Pós-graduação (Stricto sensu, nível mestrado) - Incompleto",
        "Pós-graduação (Stricto sensu, nível mestrado) - Completo",
        "Pós-graduação (Stricto sensu, nível doutor) - Incompleto",
        "Pós-graduação (Stricto sensu, nível doutor) - Completo"
      ],
      date: new Date().toLocaleString().substr(0, 10),
      date2: new Date().toISOString().substr(0, 10),
      menu: false,
      menu2: false,
      dialog: false,
      dialog1: false,
      cpfMask: "###.###.###-##",
      rgMask: "##.###.###-#",
      dataMask: "##/##/####",
      celMask: "(##) #####-####",
      telMask: "(##) ####-####",
      cepMask: "##.###-###",
      rules: [
        value =>
          !value ||
          value.size < 2000000 ||
          "O tamanho da foto deve ser menor do que 2MB!"
      ]
    };
  },

  created() {
    if (this.id) {
      this.$http
        .get(
          "https://my-json-server.typicode.com/rafafcasado/peneirasccp/atletas/" +
            this.id
        )
        .then(res => res.json())
        .then(atleta => (this.atleta = atleta));
    }

    this.$http
      .get(
        "https://my-json-server.typicode.com/rafafcasado/peneirasccp/posicoes"
      )
      .then(res => res.json())
      .then(posicoes => {
        this.posicoes = posicoes;
        //.map(x => ({ text: x.nome, value: x.id }));
      });
  },

  beforeMount() {
    if (this.id) {
      this.$http
        .get(
          "https://my-json-server.typicode.com/rafafcasado/peneirasccp/atletas/" +
            this.id
        )
        .then(res => res.json())
        .then(atleta => (this.atleta = atleta));
    }
  },

  methods: {
    onChange(image) {
      if (image) {
        this.foto = image;
      }
    },

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
    buscaEndereco(cep) {
      this.$http
        .get("https://viacep.com.br/ws/" + cep + "/json/")
        .then(res => res.json())
        .then(endereco => (this.endereco = endereco));
    },
    limparFormulario() {
      (this.foto = ""), (this.dtCadastro = ""), (this.atleta = {});
    },

    editarAtleta(_atleta) {
      this.posicao = this.posicoes.filter(x => x.id == _atleta.posicao.id)[0];
      let _atletaEditar = {
        nome: _atleta.nome,
        email: _atleta.email,
        cpf: _atleta.cpf,
        rg: _atleta.rg,
        endereco: _atleta.endereco,
        num: _atleta.num,
        bairro: _atleta.bairro,
        cep: _atleta.cep,
        cidade: _atleta.cidade,
        uf: _atleta.uf,
        celular: _atleta.celular,
        tel: _atleta.tel,
        escolaridade: _atleta.escolaridade,
        nomeEscola: _atleta.nomeEscola,
        pai: _atleta.pai,
        mae: _atleta.mae,
        indicacao: _atleta.indicacao,
        federado: _atleta.federado,
        federacao: _atleta.federacao,
        dtCadastro: _atleta.dtCadastro,
        posicao: {
          id: this.posicao.id,
          nome: this.posicao.nome
        },
        dtNascimento: this.dataNascimento
      };
      this.$http.put(
        `https://my-json-server.typicode.com/rafafcasado/peneirasccp/atletas/${_atleta.id}`,
        _atletaEditar
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.foto {
  text-align: left;
  display: flex;
  margin-left: 20px;
  width: 100%;
}
.div-main {
  display: flex;
  width: 100%;
  padding-top: 20px;
}

.td-foto {
  width: 20%;
}
</style>