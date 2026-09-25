const projectRepo = require('../repositories/project.repository');
const feedbackRepo = require('../repositories/feedback.repository');

module.exports = {
  create: async data => {
    const project = await projectRepo.findById(data.projetoId);
    if (!project) {
      const error = new Error('Id do projeto não encontrado');
      error.status = 404;
      throw error;
    }
    return feedbackRepo.createAndUpdateProjectRating({
      projetoId: data.projetoId,
      autor: data.autor,
      nota: data.nota,
      comentario: data.comentario
    });
  },
  list: projetoId => feedbackRepo.findAll(projetoId),
  updateById: async (id, data) => {
    const feedback = await feedbackRepo.findById(id);
    if (!feedback) {
      const error = new Error('Feedback não encontrado');
      error.status = 404;
      throw error;
    }
    return feedbackRepo.updateById(id, {
      ...(data.autor !== undefined && { autor: data.autor }),
      ...(data.comentario !== undefined && { comentario: data.comentario })
    });
  },
  destroyById: id => feedbackRepo.destroyById(id)
};