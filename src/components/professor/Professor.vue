<template>
  <div>
    <titulo texto="Professor" />
    <table>
      <thead>
        <th>Código</th>
        <th>Nome</th>
        <th>Alunos</th>
      </thead>
      <tbody v-if="professores.length">
        <tr v-for="(professor, index) in professores" :key="index">
          <!-- <td>{{index + 1}}</td>  -->
          <td class="colPequeno">{{ professor.id }}</td>
          <router-link :to="`/alunos/${professor.id}`" custom v-slot="{ navigate }">
            <td
              @click="navigate"
              @keypress.enter="navigate"
              role="link"
              style="cursor: pointer"
            >
              {{ professor.nome }} {{ professor.sobrenome }}
            </td>
          </router-link>
          <td class="colPequeno">{{ professor.qtdAlunos }}</td>
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
      professores: [
        /*{ id: 1, nome: "Vinicius" },
        { id: 2, nome: "Paula" },
        { id: 3, nome: "Luna" },*/
      ],
      alunos: [],
    };
  },
  created() {
    this.$axios.get("http://localhost:3000/alunos").then((alunos) => {
      this.alunos = alunos.data;
      this.carregarProfessores();
    });
  },
  props: {},
  methods: {
    pegarQtdAlunosPorProfessores() {
      this.professores.forEach((professor, indice) => {
        professor = {
          id: professor.id,
          nome: professor.nome,
          qtdAlunos: this.alunos.filter((a) => a.professor.id == professor.id)
            .length,
        };
        //console.log(professor);
        this.professores[indice] = professor;
      });
    },
    carregarProfessores() {
      this.$axios
        .get("http://localhost:3000/professores")
        .then((professores) => {
          this.professores = professores.data;
          this.pegarQtdAlunosPorProfessores();
        });
    },
  },
};
</script>

<style scoped>

.colPequeno {
  text-align: center;
  width: 15%;
}

</style>