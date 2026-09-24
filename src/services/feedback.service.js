const prisma = require('../config/prisma');
const feedbackRepo = require('../repositories/feedback.repository');
const projectRepo = require('../repositories/project.repository');

const projectNotFound = () => {
  const error = new Error('Projeto não encontrado');
  error.status = 404;
  return error;
};

module.exports = {
  create: async (projetoId, data) => {
    const project = await projectRepo.findById(projetoId);
    if (!project) throw projectNotFound();

    return prisma.$transaction(async transaction => {
      const feedback = await feedbackRepo.create({
        projetoId: Number(projetoId),
        autor: data.autor,
        nota: data.nota,
        comentario: data.comentario
      }, transaction);

      const { _avg, _count } = await feedbackRepo.aggregateByProjectId(projetoId, transaction);
      const notaMedia = Number((_avg.nota ?? 0).toFixed(2));

      await transaction.project.update({
        where: { id: Number(projetoId) },
        data: { notaMedia }
      });

      return { feedback, notaMedia, totalFeedbacks: _count._all };
    });
  }
};
