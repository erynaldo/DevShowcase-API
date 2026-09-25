const prisma = require('../config/prisma');
const projectRepo = require('../repositories/project.repository');
const profileRepo = require('../repositories/profile.repository');
const technologyRepo = require('../repositories/technology.repository');

module.exports = {
  create: async data => {
    const profile = await profileRepo.findById(data.profileId);
    if (!profile) {
      const error = new Error('Perfil não encontrado');
      error.status = 404;
      throw error;
    }
    const ids = data.technologyIds || [];
    const technologies = await technologyRepo.findByIds(ids);
    if (technologies.length !== ids.length) {
      const error = new Error('Um dos IDs de tecnologia fornecidos não corresponde a uma tecnologia existente');
      error.status = 404;
      throw error;
    }
    const project = await prisma.$transaction(async transaction => {
      const createdProject = await transaction.project.create({
        data: {
          profileId: data.profileId, titulo: data.titulo, descricao: data.descricao,
          url_repositorio: data.url_repositorio, url_demonstracao: data.url_demonstracao
        }
      });
      if (technologies.length) {
        await transaction.projectTechnology.createMany({
          data: technologies.map(technology => ({ id_projeto: createdProject.id, id_tecnologia: technology.id }))
        });
      }
      return createdProject;
    });
    return projectRepo.findById(project.id);
  },
  list: () => projectRepo.findAll(),
  getById: id => projectRepo.findById(id)
};
