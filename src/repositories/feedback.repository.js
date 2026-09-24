const prisma = require('../config/prisma');

module.exports = {
  create: (data, client = prisma) => client.feedback.create({ data }),
  findByProjectId: projetoId => prisma.feedback.findMany({
    where: { projetoId: Number(projetoId) },
    orderBy: { createdAt: 'desc' }
  }),
  aggregateByProjectId: (projetoId, client = prisma) => client.feedback.aggregate({
    where: { projetoId: Number(projetoId) },
    _avg: { nota: true },
    _count: { _all: true }
  })
};
