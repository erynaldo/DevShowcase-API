const prisma = require('../config/prisma');

module.exports = {
  create: data => prisma.technology.create({ data }),
  findAll: () => prisma.technology.findMany({ orderBy: { id: 'asc' } }),
  findById: id => prisma.technology.findUnique({ where: { id: Number(id) } }),
  findByIds: ids => prisma.technology.findMany({ where: { id: { in: ids.map(Number) } } }),
  destroyById: async id => (await prisma.technology.deleteMany({ where: { id: Number(id) } })).count
};
