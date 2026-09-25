const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.feedback.deleteMany();
  await prisma.projectTechnology.deleteMany();
  await prisma.project.deleteMany();
  await prisma.technology.deleteMany();
  await prisma.profile.deleteMany();

  await prisma.profile.createMany({ data: [
    { id: 1, nome: 'Ana Silva', usuario: 'anasilva', funcao: 'Cientista de dados' },
    { id: 2, nome: 'Carlos Sousa', usuario: 'carlossousa', funcao: 'Engenheiro de software' },
    { id: 3, nome: 'Erinaldo Cardoso', usuario: 'erinaldocardoso', funcao: 'Desenvolvedor full-stack' },
    { id: 4, nome: 'Maria Santos', usuario: 'mariasantos', funcao: 'Engenheira de IA' }
  ] });
  await prisma.technology.createMany({ data: [
    'Node.js', 'Python', 'PostgreSQL', 'MySQL', 'JavaScript', 'TypeScript', 'React', 'Sequelize', 'Hibernate', 'Prisma'
  ].map((nome, index) => ({ id: index + 1, nome })) });
  await prisma.project.createMany({ data: [
    { id: 1, profileId: 1, titulo: 'DevShowcase API', descricao: 'API RESTFul para portfólio', url_repositorio: 'https://github.com/example/devshowcase-api', url_demonstracao: 'https://example.com/api' },
    { id: 2, profileId: 2, titulo: 'GestorTarefas', descricao: 'Gerenciador de tarefas', url_repositorio: 'https://github.com/example/task-manager', url_demonstracao: 'https://example.com/tasks' },
    { id: 3, profileId: 3, titulo: 'AutomacaoEmail', descricao: 'Sistema de automação de envio de emails', url_repositorio: 'https://github.com/example/email-automation', url_demonstracao: 'https://example.com/messages' }
  ] });
  await prisma.projectTechnology.createMany({ data: [
    [1, 1], [1, 3], [1, 5], [2, 2], [2, 10], [3, 1], [3, 6], [3, 8]
  ].map(([id_projeto, id_tecnologia]) => ({ id_projeto, id_tecnologia })) });
  await prisma.feedback.createMany({ data: [
    { id: 1, projetoId: 1, autor: 'Marina Costa', comentario: 'Excelente projeto e documentação!' },
    { id: 2, projetoId: 1, autor: 'João Lima', comentario: 'Arquitetura moderna e escalável.' },
    { id: 3, projetoId: 2, autor: 'Guilherme Dantas', comentario: 'Muito bom! O sistema é muito eficiente.' },
    { id: 4, projetoId: 3, autor: 'Livia Fernandes', comentario: 'Nota 10 para o projeto. Tem o código limpo e bem estruturado.' }
  ] });

  for (const table of ['profiles', 'technologies', 'projects', 'feedbacks']) {
    await prisma.$executeRawUnsafe(
      `SELECT setval(pg_get_serial_sequence('${table}', 'id'), COALESCE((SELECT MAX(id) FROM "${table}"), 1), true)`
    );
  }
}

main()
  .catch(error => { console.error(error); process.exitCode = 1; })
  .finally(() => prisma.$disconnect());