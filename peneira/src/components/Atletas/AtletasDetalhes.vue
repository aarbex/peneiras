<template>
  <div>
    <Nav></Nav>

    <v-row class="mx-5" flex bottom>
      <v-col cols="12" sm="6" md="2">
        <img center width="120" height="160" :src="atleta.foto" alt />
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
        <v-text-field v-model="atleta.logradouro" label="Endereço (Rua / Avenida)" readonly filled></v-text-field>
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
        <v-text-field v-model="atleta.localidade" label="Cidade" readonly filled></v-text-field>
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
        <v-select
          v-if="atleta.id"
          name="posicao"
          v-model="atleta.posicaoID"
          :items="posicoes"
          prepend-inner-icon="mdi-soccer-field"
          item-text="nome"
          item-value="id"
          label="posicao"
          readonly
          filled
        ></v-select>
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
              @click="carregaAtleta(atleta)"
              color="primary"
              class="ms-5"
              text
              dark
              v-on="on"
            >Editar</v-btn>
          </template>
          <v-card>
            <v-toolbar dark color="primary">Editar Atleta</v-toolbar>
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
                      v-model="nome"
                      label="Nome do Atleta"
                      prepend-inner-icon="mdi-account-badge-horizontal"
                      class="text-capitalized"
                      hint="* Preenchimento Obrigatório"
                      persistent-hint
                      required
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="9">
                    <v-text-field v-model="email" prepend-inner-icon="mdi-email" label="E-mail"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-menu
                      ref="menu2"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :return-value.sync="dtNascimento"
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="dtNascimento"
                          label="Data de Nascimento"
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
                          @click=" dtNascimento = formatDate(date2);$refs.menu2.save(dtNascimento)"
                        >OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-mask="cpfMask"
                      v-model="cpf"
                      label="CPF"
                      prepend-inner-icon="mdi-account-badge"
                      required
                      filled
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-mask="rgMask"
                      v-model="rg"
                      prepend-inner-icon="mdi-account-badge"
                      label="RG"
                      hint="* Preenchimento Obrigatório"
                      persistent-hint
                      required
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      name="cep"
                      prepend-inner-icon="mdi-home-account"
                      v-model="cep"
                      label="CEP"
                      append-icon="mdi-magnify"
                      hint="* Preenchimento Obrigatório"
                      persistent-hint
                      required
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="7">
                    <v-text-field
                      name="rua"
                      prepend-inner-icon="mdi-home-account"
                      v-model="endereco.logradouro"
                      label="Endereço (Rua / Avenida)"
                      value
                      hint="* Preenchimento Obrigatório"
                      persistent-hint
                      required
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="2">
                    <v-text-field
                      name="num"
                      prepend-inner-icon="mdi-home-account"
                      v-model="num"
                      label="Número"
                      value
                      hint="* Preenchimento Obrigatório"
                      persistent-hint
                      required
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      name="complemento"
                      prepend-inner-icon="mdi-home-account"
                      v-model="complemento"
                      label="Complemento"
                      value
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      name="bairro"
                      prepend-inner-icon="mdi-home-account"
                      v-model="endereco.bairro"
                      label="Bairro"
                      value
                      hint="* Preenchimento Obrigatório"
                      persistent-hint
                      required
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="9">
                    <v-text-field
                      name="cidade"
                      prepend-inner-icon="mdi-home-account"
                      v-model="endereco.localidade"
                      label="Cidade"
                      value
                      hint="* Preenchimento Obrigatório"
                      persistent-hint
                      required
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      name="uf"
                      prepend-inner-icon="mdi-home-account"
                      v-model="endereco.uf"
                      label="UF"
                      value
                      hint="* Preenchimento Obrigatório"
                      persistent-hint
                      required
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      name="celular"
                      prepend-inner-icon="mdi-cellphone-iphone"
                      v-model="celular"
                      label="Telefone Celular"
                      value
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      name="telefone"
                      prepend-inner-icon="mdi-phone"
                      v-model="tel"
                      label="Telefone Fixo"
                      value
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      name="escolaridade"
                      v-model="escolaridade"
                      :items="escolaridades"
                      label="Escolaridade"
                      prepend-inner-icon="mdi-school"
                      hint="* Preenchimento Obrigatório"
                      persistent-hint
                      required
                      :rules="[rules.required]"
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      name="escola"
                      prepend-inner-icon="mdi-school"
                      v-model="nomeEscola"
                      label="Escola"
                      value
                      hint="* Preenchimento Obrigatório"
                      persistent-hint
                      required
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      name="pai"
                      prepend-inner-icon="mdi-face"
                      v-model="pai"
                      label="Pai"
                      value
                      hint="* Preenchimento Obrigatório"
                      persistent-hint
                      required
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      name="mae"
                      prepend-inner-icon="mdi-face-woman"
                      v-model="mae"
                      label="Mãe"
                      value
                      hint="* Preenchimento Obrigatório"
                      persistent-hint
                      required
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      name="posicao"
                      v-model="posicaoID"
                      :items="posicoes"
                      prepend-inner-icon="mdi-soccer-field"
                      item-text="nome"
                      item-value="id"
                      label="Posição"
                      hint="* Preenchimento Obrigatório"
                      persistent-hint
                      required
                      :rules="[rules.required]"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      name="indicacao"
                      prepend-inner-icon="mdi-account-tie"
                      v-model="indicacao"
                      label="Indicação"
                      value
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="2">
                    <v-checkbox
                      v-model="alojamento"
                      label="Necessita alojamento?"
                      hide-details
                      class="shrink mr-2 mt-0"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" sm="6" md="2">
                    <v-checkbox
                      v-model="federado"
                      label="Atleta Federado?"
                      hide-details
                      class="shrink mr-2 mt-0"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" sm="3" md="8">
                    <v-text-field
                      :disabled="!atleta.federado"
                      v-model="federacao"
                      prepend-inner-icon="mdi-soccer"
                      label="Qual Federação?"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="black" text @click="dialog1 = false">Cancelar</v-btn>
              <v-btn
                v-if="atleta.id"
                color="blue darken-1"
                text
                @click="editarAtleta(atleta)"
              >Salvar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialog3" max-width="290">
          <v-card>
            <v-card-title class="headline">Atenção!</v-card-title>

            <v-card-text justify="center">Há campos obrigatórios que não foram preenchidos!!</v-card-text>

            <v-card-actions>
              <div class="flex-grow-1"></div>

              <v-btn color="black" text @click="dialog3 = false">Fechar</v-btn>
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
      nome: "",
      foto: "",
      email: "",
      cpf: "",
      rg: "",
      dtNascimento: "",
      logradouro: "",
      num: "",
      complemento: "",
      bairro: "",
      cep: "",
      cidade: "",
      uf: "",
      celular: "",
      tel: "",
      escolaridade: "",
      nomeEscola: "",
      pai: "",
      mae: "",
      posicaoID: "",
      indicacao: "",
      alojamento: "",
      federado: "",
      federacao: "",
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
      fotoTeste:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgKEBAQEAgJCAgJCAoICAkJBxsICQgWIB0iIiAdHx8kKDQsJCYxJx8fLTItMSw3Q0NDIys/RDMsNygtLisBCgoKDg0OGhAQFy0dFxkrLS0tKy0tKystLSstKysrLS0tLSstLTcrKystLS0tKy0tKy0rLSstLSstLS0rLTctK//AABEIAMgAyAMBIgACEQEDEQH/xAAcAAAABwEBAAAAAAAAAAAAAAAAAQIEBQYHAwj/xAA+EAABBAECAwYDAwoFBQAAAAABAAIDEQQFIQYSMRMiQVFhcQcycyNygRQkM0JSkaGxwdEVQ2JjgjQ1U+Hw/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAKBEAAgIBAwMEAgMBAAAAAAAAAAECESEDEjEEIkETMmGBI1EzQkMU/9oADAMBAAIRAxEAPwDKuDm3lxfetbaGLFODnD8ri+8Atza3YewUs0jwcQxLDUukaCqEgJQQpGAkMCUAklzW1ZAs0LNWinm7Nt1ze25QOzrsElssbrAeCW9QDZCo3EHF+RjmmjHkaS4FjiWvb7qlQ8R50E4mbIY3cwLmcxcx3ulQt9G2kIgCqJp/EH+KvAObNp0gjLuaOf7KQ+QCJ/FuTpsvZyzMz2AkF18shH9E6JcjQwNvwTV7Vx0LWsPUWAseGycvM6JzrcE8exCVDeRuEEotSaVEBFBHSCQCmhRfFRrFl+m5SrFEcYGsWX6bkAzCH9T7lJRu6n3KJUQH18vPpQSgB5fwSEtqTAOh+yDv0rqgjFe6CAJ7hWEDKho3yvA6Va28dB7BYVwtI78rh3/zADtS3ZvQfdCT5LjwJQR0jDUFAAXQNUfrOr4enM55XgE7Rxg9+Qqg6r8Q86UlsMbcSOiA93fkKBWW7i7V8bCjszNOU0tfDDduPus41vivUMruNlGNDJsWMdu73KhNRzZJiXPlfJK5xLnyHmcSmIDpCPPx8AnRDkOXPmDiC7vAcrt+akkt5ty+/lI2s9UtsIFAEvLjbnAXSEoDegoGgbNlMQmHLfBfK7bnB3FgpWK1s7++/lYA57nE+ibysF+J3s3sXIy6rAHKCbI8UCH2m6jl4L2Twy9m+KRwb+y70IWj6H8QI8ktE8bIe0Ia58Z7sR8z6LJXGrF+NpTZSKrY3sfJKikz0bQcAQbaQCCNwUhzVlPDPG+bjNEb39uyMUxsnUjytaVpWq42cwOaQ17m85j5rIQOxyUSW4LmQgBbSoTjV1Ykn3CplpUDxy+sST7hSH4MRKJH/dEqIAltSEpqAFgokQKCVATHDY5cuH6rQt4Z0H3QsC4fJ/KYfrNW/wAQ7rfutS8lrgIBNdYzBiQufYElcsYJ3JT5oWX/ABI1fnmbE2a2RgiVoFBv4oGyB4o1J2VKT2juz6taX87goGScEAD1PTcpUkpN+O99EcGO95FDxomrtNECey5z5Dr0TiDBe6hRA9la9C4YfkEF8bwymgE92wrdicKY0fhe1d4bhS5JFKDZmmNpb3XuQdwPDmXR2kSnq3foPNazDoWOwD7Jtj0XU6JCf1B0obKPUL9IxsaHlO3DDsaurK5y6Jlsu4zVEmx1W1Q6fDFQ5GmhQ2SMnTceTrG3zJrdP1AekYPPiSs6tI/BcCw+S2fN4cxX9Im/utQWbwpj0dqdvWye8n02Zq2x/wDdFauDdZdDI1l94TNfGSevmP3JhqukOxydrbZHsooOfA5rm9xzSHMcPBWnfBLTTyehybAPmAVyKjOEtaZqmM2T5ZWAQzsv5SFKPQMSq1x6+sR/sQrE51Kp/EF/5q71U2VWDIkEEFZkBKCSjCADtBEAggCV0IEZEX1mr0Dji2N+41ee9FP5xF5du30K9CY3yN+41SXHgY8QZf5HjyScxa5kbuWhzElYVnyPkkJdIZnOdZe47Fa98RmSOwyQ4tjbI10oHSQeRWMPIc4nnoUSDWwKYpHRwaapvM0GttrKufBOiCf7RzKYDte4KqemxFxDa+d4abNUti4dwmRRtDegYCfIqZukOCtkviwtYAAK2AHonbGBc42fyTmJiwOrgTyo27rvyNSeUDoKRQWjhKy03cwp65vquUjQgBmY0xzIr/opVwTTIDUMEUfWsMOu23e3ToqFrGE6I9NrWr6lCHg7b+CqGuYRew926BNV0VQdMjUVoX8KdT7KWTGcQGzt7WInqSFpciwPDmkw5mSDnBhma48ruRxFrdoZ2zRseDbJY2yN3vqFsYRESlU74gS/m5HqrbM6lRuPZLir1UN5Nq7WzOEEEFqcwEYRIwgAWjRIIAk9ILe3i+s1eg8X9Gz6bV540yu2i3/zmfzXofCH2TPptUeTVe0q/wATDOcMhhqPnBnI8ljLqb62Ba3Tj2IP0/I35QyNsg9aKwkA/wBlRmyR06ZrZGd3m+WhW5K2zRDUbelljSQDsFiuksZ2jSSeoI26LYOGy5zWiyRygnyCz1DTS5LDECu4SBslBZHQ1YsPaFzfKErsj5JL4D5IyPajl2vp/FGSCkPiI/olRAlIGJIv+iY5bSpJrAuU8YKqgTK1lhROVCHA+oI91Zc3Gb/Cwq5nUy+8PRKhMzXXGBkjh/qsDwWt8HzGXBgOwIh5O6NtllPEW8hPrutN4CyO10+Lb9GXxdKuit/Byrkkst1KiccPuP8AFXXPf1VE41dbB7rG+866/EyjoIILpOECFoIIACCCCAHmmbSx/WZ/Nei8A/ZR/TavOem/pY/rM/mvRWB+ij+m1S+TWPtZA/EbKdFgSACxK5sLz4NFrEaI9Rd+pW78Y6a3OxJGcr3vYO2jaw7khYe6MxuIc1zHtJa5rhyuaU7M3+ya4X0mbOkAb3WtcHPf4NC2HS8RuKwNBs1RNdVSvhlE3lkd+tYaduqvckjWAk+AWOo80b6SVWPA8Df8SkO1LGj6ytvoRfRVTP1bIyCY4g4Bp5XOA6rjFo2fKNiCSLNjqiMS5TouA17ABozNH4ro3WcF2wlYSTtR2Kz/ACOFtXu+aKut9pRSsTSc2Og6ZpcDQp90rpIyts0a2SXRBr1u1yoNP81F6O2ZgIJNGjV2pOZr6uvAJOi1aEZErW+Ph+KgNW4gZjggbuHqu+q5jIgbdy7earJwYsw2ZHBriSKO5QhN0RGrcX5rr5WhjdwXdVX5NazJOrr/AA6rQ4uGtEaAZCZOhIcaaVFa7h6QxpMTIwGgkhm9JtInLM+z5O1BPjYJ9Fpvw9YxuAyn258j5HM5r5FnWdi8pJApkjSQp74dzSMnDLPZyQPtt7Ep3gmKbZddRVE4zPcHur5qKofGnyD3WP8Ac6v8mUtBBBdJwgQQQQAEEEEAOtP/AEsf1mfzXorBP2Uf0mrzthd2Rh/3GlehNOdcMZ/2mqfJdpRo6MZIXk8/d7oDK2KpHxM4fYKymRAFlMzGgVfk5X6Ajfa/tGH1SeIDBOzsyznc9jo+zDLseqyTpnVONxSRQfhsAGyV05m/grvLjdqK8CN/NUzgWMwSTxkFpimLaI3V9hIUzfcRprtIoY2PiC+TcWdhuU3ZrskruzigklkBALIxQZ7lTM8LH9Vyx8WFhsMHW9hykKoTzkJRx8lE451/VcB/ZEwse5rHNAJe5wKj9Bfn5LRKZuUmYx1dWr7r2iYudRljbM6OxGXfMAmeNpLI6ayJrGNNhobTQtJzj4J0oyWWx/o8ksXKHuDw9tgg3SnZ5xy7eWyjMfE5aJNloobVScnf2qgsbNtqbM243zJo54+bmOMJWulDepCufD0OJOxji7sIXRlwa1tP/Equ8c4oLbLeYAkHZc+Dc5/ZGMvcWRmozdlvorjKiJxGPxE0/UO3YMV08uKYu8Wy0Ab8VX36fmRBodI500gIcL5gFp7wH9X2D07tlcjpmN83Lb6+Z3ecU3qWZrToouXpr+yt1c0bKA8Qm/BW2VDXlM137lPcQN7Nrq2FEUojgGLmySavs2SO9lKLi9t3+i56iqBxr8o91oGoC1n3G3Qe6Vd4bvxtFNQQQXQcoEEEYQAOiCIoIAcwHvt9JGlegtHcHQRVv9k3osN4axI8nIjY4d2SQBa5qWof4QWRAc7eyBHopcqKWm5ccliicGEHwBs+q74YbN2jzuQ3lb6Kp6TxC3LlEbh2fOCGOJ2JVmEUjAeQGN5bZANhyycldo7YxqNPkrbMF+PmTvsdjktZI0frNPip6CSwo/KvmaTs7l5XDyTnDJH79lLIhgko2WieK8f4o4z/AGXeODn96tNKzZJeRiQSu0MZ8t/Nd5oWx7k+/ouBymg03ysooGlWA5aZ1O/ihC0u3AvxCaE9qSSfHeypPFcwN2IJ6HdFCaor/EmEJGHmG3KVneh5hwszsyfspXhhvotY1uIvY7cDuk9eixfWJYi8lp+2ifYIO9ppEyfBr35LtfL16UFwkicBsfBdeGMx2ZixPc2nmMNd4WnGSwC/xRRUXgo/E7O4fYqO+HMPfnf4BrYx5KY4rc0Md90qq8P6g/HjcG7F0xc71QnRhOLk6Re8+qJ6Cis540fzAeItTOfr00reX5dqJCh9TiEuOXnct6I3XJMXpNRdlQRIz/6RLc5gIygESAAggggCxcHf9XD59s2loPHlmdl/+BqzrhM1mQ/WatD44dzTN+g0LPU9rOjp/wCRfZW43uYQ4GnNILSNiFovCutuzhyuIE0TeV2/z+qzpd8LLnxXiSN/I9vTyK50z0Jws0rWoOXlf5mj6LliHzVVm4sysgxteyNsfaNMhaNyrPhOv1229VZxzTiyRjPLt49U+x5a6pg3+oC6zODWk30HmqRcJWhtqubV779B5osCKm8zvnfv91MsTGdkyF7r7JhqNvg5S7W7daHj4UiipTXCI/Jia+xbmm6PKatchIYR3e4bsUdinskmKDvIL6kXabzzYLgAX1R2WiSHciua/q+oua6KJlOkaQ6ZxtrR6KoaXoQL7kJJ5uZ3+paLlS6YwG3jnqhtdKv5OThgktkFnYeCDCUZXZZ9GyY42NY1tNY0ABSGSS4X5i1XNIPOA4Ott0N1PQEyNG2zQQT5rOhqZQ+MpSAR0ske6q+lA8rvqEKycaODpOUfqkl3qoLTmUz70jnJS4HpO5hTNTjMZ+ZOK5yhO9RbWA5GlyadRiBnxQRlEF0HnAQRlEgAIIIIAnuF9sqI/wC61X7i51zN+i1UfQYmjIiLTt2jSd1deKSDKPpNWM32s7NCDU19kGXDzQ52+aUWt8knkb5LC0d73HOSQCve1fOG8sTRtPXbkd6FUV7W7beKsHC+SI3lnQO77VcWjl1oSqzQI2/3CE8Reytr6FIxpLA9t07a9teato5oSGEUbmtpu1C66Ku6nqOpxStZIzssBxPaSw7yq3BgB9CFyysNk4ogGga26oTybQp8kPp8um1Gex7STnIdzyc5Ke5msaNitd2uKIQ5/dHYc7imORoleg8CNiEz1LS3vbUjjMygRb+alqjX/njLiRE8TcX6LCAIdN7XKBaakh5InD3VfxHyZzQZMeKBvbukpg5XOHkpvI0aEA9ywRXeAdSjY4niQNa2wXV02Q2Zvp/TdyeC86LBGyIARtA5bbQ6KWlcyCI+BLSfZR+F9kwAn5W17plrmo0yrrukLLkynK2UbiXI5nvP673lrVwiY1jQL+VoCh+I894eOU05rubzpSGk5rMtlkATM2kHn6omsWPp5d1eTu/dPdXbWnn8E3NeSea//wBuP4JaVWadVu2ZM0KMIkpoXQcARRIFBAAQRhBAEtw5I/8AKYt9u0bfkr9xE65R6RtVP0HH7OePu784Vt4g/SD6YWOrwdvSe5EZaJBECuY9MJ3Ue67wTOieHDqxwPuuD/D3S3JkNWqNH0nNbMxpBsEAqVY8f3VH4XyC1p8ezfuPRWuDJBBrx630XQnaPJnHbJoesfZIvbqF3jePP0UayQE9d/4J5fMNj0F+qbVijPI+IDh4KMzcdm526VXS0ZllGwO3j5pMrXeJ2ry6ISZqpVwyLGHG+7oG+h6LjFpsTX3yjY2Nk8yoXi6NbWEx/KXxiyfQ+FpNMTk3ywaplCJu21AnqqVqurCQOPN3GAg79UrijWSAQH7uJa3zVOnyCW0T3QS52/zKkjByyNdQk7R3NvbhZ9EnT8t+O8OB2unDwcE3e8uN/u9EGhXWKEpNO0XqGVkrQ5ptrhY9E+4k20/8WqlaVqLsY0bdC47jxarfxHPHJp7C14exxbRBtZQhtkderqrU0vkztKSUorY4hKCCCADQQQQBZNDyCZowTvzhWvWz9pv+wFSeHj+cR3+2FddaP2n/AACx1ODu6RO1XyR1hESB4IyjC5rR6VS/Zzc4Ejba12dypNdFxz8hsLSeYB1ENF7lUs0RKTim2TfBsvPLOeeo2GHHDPBxN2rS5rojYvkO5rwVF+HrJ8gTtjYZZ48jHy3Rg99zBYdX71psUTZG9L22sUQt32nkOT1LfkjnTHqOnU79E9xMsECt/MXumWTivj3A28QmBcQbDzE+976FWjN4LQ2Zp3sCwDv1C5zz+AIo9VWX5uYOgZIN6Idy2kDLzjueyj8O9JaoW4ss7mkdfAgqna/qDIg7vVV1v0Qz9Symg/bR9KPKbVF1jLfK4gymY30YO6EUG4Y52SZnEk7bhqjp5ObYdAbPqlTyHp+B32C4V/ZCQgNFrsG0jDaQKYBUuhyJgzkEr+xJsx81tSUTkAcSykHJxQ8vBJLL9UAN0F0MfkkEEIAFoIiggCZ4f3nj+8FddYH2n/EIILn1eGel0fj7GNIOLWiyQ0AWSTQQQXOlZ6E5bVZE5usNG0Ytw25yO6FEZE0kllzi9x8SeiCC7oQSR4Wrrz1OWX/4Cx82dO7wiwXV5bkLY9Q0uyZIwA42ZI+jXoILTanHJz7nGWCJlha8Gx6HaiFEZemB19wO8fVBBct0ddJjF2hPPTnZ5d7ZKZwzK7c5Ja2rO2wQQVadyeWRqJRWER8/Deny895T5mRNLsmXtOzxoB5krPuJdU0xtwYUIbjtPLLluFS5Xt5BBBdLSWEcsW5PJVyEcQs+26CClGrOxRIIIYkBEen4IIJDF/2QCNBABIiwFBBAHJ8YAPXpsiQQQB//2Q==",
      menu: false,
      menu2: false,
      dialog: false,
      dialog1: false,
      dialog3: false,
      cpfMask: "###.###.###-##",
      rgMask: "##.###.###-X",
      dataMask: "##/##/####",
      celMask: "(##) #####-####",
      telMask: "(##) ####-####",
      cepMask: "##.###-###",
      rules: {
        required: value => !!value || "Preenchimento obrigatório.",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "E-mail inválido.";
        }
      }
    };
  },

  created() {
    if (this.id) {
      this.$http
        .get("atletas/" + this.id, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
            "Content-Type": "application/json"
          }
        })
        .then(res => res.json())
        .then(atleta => (this.atleta = atleta));
    }

    this.$http
      .get("posicoes", {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(posicoes => {
        this.posicoes = posicoes;
        //.map(x => ({ text: x.nome, value: x.id }));
      });
    this.carregaAtleta(this.atleta);
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
      this.posicao = this.posicoes.filter(
        x => x.id == this.atleta.posicaoID
      )[0];
      let _atletaEditar = {
        nome: this.nome,
        email: this.email,
        cpf: this.cpf,
        rg: this.rg,
        logradouro: this.endereco.logradouro,
        num: this.num,
        complemento: this.complemento,
        bairro: this.endereco.bairro,
        cep: this.cep,
        localidade: this.endereco.localidade,
        uf: this.endereco.uf,
        celular: this.celular,
        tel: this.tel,
        escolaridade: this.escolaridade,
        nomeEscola: this.nomeEscola,
        pai: this.pai,
        mae: this.mae,
        indicacao: this.indicacao,
        federado: this.federado,
        federacao: this.federacao,
        alojamento: this.alojamento,
        dtCadastro: this.dtCadastro,
        posicaoID: this.posicao.id,
        dtNascimento: this.dtNascimento
      };
      if (
        this.nome.length == 0 ||
        this.email.length == 0 ||
        this.dtNascimento.length == 0 ||
        this.cpf.length == 0 ||
        this.rg.length == 0 ||
        this.cep.length == 0 ||
        this.endereco.logradouro.length == 0 ||
        this.endereco.bairro.length == 0 ||
        this.endereco.localidade.length == 0 ||
        this.endereco.uf.length == 0 ||
        this.num.length == 0 ||
        this.escolaridade.length == 0 ||
        this.nomeEscola.length == 0 ||
        this.pai.length == 0 ||
        this.mae.length == 0 ||
        this.posicaoID.length == 0
      ) {
        this.dialog3 = true;
      } else {
        this.$http.put(`atletas/${_atleta.id}`, _atletaEditar, {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("token"),
            "Content-Type": "application/json"
          }
        });
        window.location.href =
          window.location.origin + "/atleta/detalhe/" + _atleta.id;
      }
    },
    carregaAtleta(atleta) {
      (this.nome = atleta.nome),
        (this.foto = atleta.foto),
        (this.email = atleta.email),
        (this.cpf = atleta.cpf),
        (this.rg = atleta.rg),
        (this.dtNascimento = atleta.dtNascimento),
        (this.endereco.logradouro = atleta.logradouro),
        (this.num = atleta.num),
        (this.complemento = atleta.complemento),
        (this.endereco.bairro = atleta.bairro),
        (this.cep = atleta.cep),
        (this.endereco.localidade = atleta.localidade),
        (this.endereco.uf = atleta.uf),
        (this.celular = atleta.celular),
        (this.tel = atleta.tel),
        (this.escolaridade = atleta.escolaridade),
        (this.nomeEscola = atleta.nomeEscola),
        (this.pai = atleta.pai),
        (this.mae = atleta.mae),
        (this.posicaoID = atleta.posicaoID),
        (this.indicacao = atleta.indicacao),
        (this.alojamento = atleta.alojamento),
        (this.federado = atleta.federado),
        (this.federacao = atleta.federacao),
        (this.dtCadastro = atleta.dtCadastro);
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