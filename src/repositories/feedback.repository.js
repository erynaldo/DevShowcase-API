const prisma = require('../config/prisma');

module.exports = {
  create: data => prisma.feedback.create({ data }),
  findAll: projetoId => prisma.feedback.findMany({
    where: projetoId ? { projetoId: Number(projetoId) } : undefined,
    orderBy: { createdAt: 'desc' }
  }),
  findById: id => prisma.feedback.findUnique({ where: { id: Number(id) } }),
  updateById: (id, data) => prisma.feedback.update({ where: { id: Number(id) }, data }),
  destroyById: async id => (await prisma.feedback.deleteMany({ where: { id: Number(id) } })).count
};