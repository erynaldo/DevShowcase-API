const prisma = require('../config/prisma');

module.exports = {
  create: data => prisma.feedback.create({ data }),
  createAndUpdateProjectRating: async data => prisma.$transaction(async transaction => {
    const feedback = await transaction.feedback.create({ data });
    const aggregate = await transaction.feedback.aggregate({
      where: { projetoId: data.projetoId },
      _avg: { nota: true }
    });
    const notaMedia = Math.round((aggregate._avg.nota || 0) * 10) / 10;
    await transaction.project.update({
      where: { id: data.projetoId },
      data: { notaMedia, totalFeedbacks: { increment: 1 } }
    });
    return feedback;
  }, { maxWait: 10000, timeout: 15000 }),
  findAll: projetoId => prisma.feedback.findMany({
    where: projetoId ? { projetoId: Number(projetoId) } : undefined,
    orderBy: { createdAt: 'desc' }
  }),
  findById: id => prisma.feedback.findUnique({ where: { id: Number(id) } }),
  updateById: (id, data) => prisma.feedback.update({ where: { id: Number(id) }, data }),
  destroyById: async id => (await prisma.feedback.deleteMany({ where: { id: Number(id) } })).count
};