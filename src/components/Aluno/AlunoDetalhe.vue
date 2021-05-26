<template>
  <div>
    <Titulo :texto="'Aluno: ' + aluno.nome" :btnVoltar="!visualizando">
      <button v-show="visualizando" class="btn btnEditar" @click="editar()">Editar</button>
    </Titulo>
    <table>
      <tbody>
        <tr>
          <td class="colPequeno">Matrícula: </td>
          <td>
            <label>{{ aluno.id }}</label>
          </td>
        </tr>
        <tr>
          <td class="colPequeno">Nome: </td>
          <td>
            <label v-if="visualizando">{{ aluno.nome }}</label>
            <input v-else v-model="aluno.nome" type="text" />
          </td>
        </tr>
        <tr>
          <td class="colPequeno">Sobrenome: </td>
          <td>
            <label v-if="visualizando">{{ aluno.sobrenome }}</label>
            <input v-else v-model="aluno.sobrenome" type="text" />
          </td>
        </tr>
        <tr>
          <td class="colPequeno">Data Nascimento: </td>
          <td>
            <label v-if="visualizando">{{ aluno.dataNasc }}</label>
            <input v-else v-model="aluno.dataNasc" type="text" />
          </td>
        </tr>
        <tr>
          <td class="colPequeno">Professor: </td>
          <td>
            <label v-if="visualizando">{{ aluno.professor.nome }}</label>
            <select v-else v-model="aluno.professor">
              <option v-for="(professor, index) in professores" :key="index" v-bind:value="professor">
                {{professor.nome}}
              </option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>

    <div style="margin-top: 10px">
      <div v-if="!visualizando">
        <button class="btn btnSalvar" @click="Salvar()">Salvar</button>
        <button class="btn btnCancelar" @click="Cancelar()">Cancelar</button>
      </div>
    </div>

  </div>
</template>

<script>
import Titulo from "../_share/Titulo";

export default {
  components: {
    Titulo,
  },
  data() {
    return {
      aluno: {
        id: 0,
        nome: '',
        sobrenome: '',
        dataNasc: '',
        professor: {
          id: 0,
          nome: ''
        }
      },
      id: this.$route.params.id,
      professores: [],
      visualizando: true
    };
  },
  created() {
    this.$axios
      .get("http://localhost:3000/alunos/" + this.id)
      .then(aluno => {
        //this.aluno = aluno.data;
        this.aluno.id = aluno.data.id;
        this.aluno.nome = aluno.data.nome;
        this.aluno.sobrenome = aluno.data.sobrenome;
        this.aluno.dataNasc = aluno.data.dataNasc;
        this.aluno.professor.id = aluno.data.professor.id;
        this.aluno.professor.nome = aluno.data.professor.nome;
      });

      this.$axios
        .get("http://localhost:3000/professores")
        .then(professores => this.professores = professores.data);
  },
  methods: {
    editar() {
      this.visualizando = !this.visualizando;
    },
    Salvar() {
      let _alunoEditar = {
        id: this.aluno.id,
        nome: this.aluno.nome,
        sobrenome: this.aluno.sobrenome,
        dataNasc: this.aluno.dataNasc,
        professor: this.aluno.professor
      };

      this.$axios
        .put("http://localhost:3000/alunos/" + _alunoEditar.id, _alunoEditar)
        .then(alu => console.log(alu.data));

      this.visualizando = !this.visualizando;
    },
    Cancelar(){
      this.visualizando = !this.visualizando;
    }
  },
};
</script>

<style scoped>

.btnEditar {
  float: right;
  background-color: rgb(76, 186, 249);
}

.btnSalvar {
  float: right;
  background-color: rgb(79, 196, 68);
}

.btnCancelar {
  float: left;
  background-color: rgb(249, 186, 92);
}

.colPequeno {
  width: 20%;
}

input, select {
  margin: 0px;
  padding: 5px 10px;
  font-size: 0.9em;
  font-family: Montserrat;
  border: 1px solid silver;
  border-radius: 5px;
  background-color: rgb(245, 245, 245);
  width: 95%;
}

select {
  height: 38px;
  width: 100%;
}

</style>