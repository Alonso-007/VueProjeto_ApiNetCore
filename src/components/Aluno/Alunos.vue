<template>
  <div>
    <titulo texto="Aluno" />
    <div>
      <input
        type="text"
        placeholder="Nome do Aluno"
        v-model="nome"
        @keyup.enter="addAlunos()"
      />
      <button class="btn btnInput" @click="addAlunos()">Adicionar</button>
    </div>

    <table>
      <thead>
        <th>Mat</th>
        <th>Nome</th>
        <th>Opções</th>
      </thead>
      <tbody v-if="alunos.length">
        <tr v-for="(aluno, index) in alunos" :key="index">
          <!-- <td>{{index + 1}}</td>  -->
          <td>{{ aluno.id }}</td>
          <td>{{ aluno.nome }} {{ aluno.sobrenome }}</td>
          <td>
            <button class="btn btn_Danger" @click="remover(aluno)">
              Remover
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot v-else>
        Nenhum aluno encontrado
      </tfoot>
    </table>
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
      titulo: "Aluno",
      nome: "",
      alunos: [
        /*{id: 1, nome: "Aluno 1", sobrenome: 'Xavier'},
        {id: 2, nome: "Aluno 2", sobrenome: 'Amaral'},
        {id: 3, nome: "Aluno 3", sobrenome: 'Henrique'}*/
      ],
    };
  },
  created() {
    this.$axios
      .get("http://localhost:3000/alunos")
      .then((alunos) => (this.alunos = alunos.data));
  },
  props: {},
  methods: {
    addAlunos() {
      let _aluno = {
        nome: this.nome,
        sobrenome: "",
      };

      this.$axios
        .post("http://localhost:3000/alunos", _aluno)
        //.then(response => console.log(response.data.id));
        .then((response) => {
          _aluno.id = response.data.id;
          this.alunos.push(_aluno);
          this.nome = "";
        });

      console.log(_aluno);
      //this.alunos.forEach(aluno => { console.log(aluno);  });
    },
    remover(aluno) {
      this.$axios
        .delete(`http://localhost:3000/alunos/${aluno.id}`)
        .then((response) => {
          console.log(response);
          let indice = this.alunos.indexOf(aluno);
          this.alunos.splice(indice, 1);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  /*width: calc(100% - 150px);*/
  border: 0;
  padding: 20px;
  font-size: 1.3em;
  color: #687f7f;
  display: inline;
}

.btnInput {
  /*width: 150px;*/
  border: 0px;
  padding: 20px;
  font-size: 1.3em;
  display: inline;
  background-color: rgb(116, 115, 115);
}

.btnInput:hover {
  padding: 20px;
  margin: 0px;
  border: 0;
}
</style>