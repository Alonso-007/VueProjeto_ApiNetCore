import Alunos from    './components/Aluno/Alunos';
import Professor from './components/professor/Professor';
import Sobre from     './components/Sobre/Sobre';
import AlunoDetalhe from './components/Aluno/AlunoDetalhe';

import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/professores",
    name: "Professores",
    component: Professor,
  },
  {
    path: "/alunos/:profId?",
    name: "Alunos",
    component: Alunos
  },
  {
    path: "/alunoDetalhe/:id",
    name: "AlunoDetalhe",
    component: AlunoDetalhe
  },
  /*{
    path: "/todosalunos",
    name: "TodosAlunos",
    component: Alunos,
  },*/
  {
    path: "/sobre",
    name: "Sobre",
    component: Sobre,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;