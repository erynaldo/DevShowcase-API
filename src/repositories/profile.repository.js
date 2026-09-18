const prisma = require('../config/prisma');

module.exports = {
  create: data => prisma.profile.create({ data }),
  findAll: () => prisma.profile.findMany({ orderBy: { id: 'asc' } }),
  findByUsuario: usuario => prisma.profile.findUnique({ where: { usuario } }),
  findById: id => prisma.profile.findUnique({ where: { id: Number(id) }, include: { projects: true } }),
  destroyById: async id => (await prisma.profile.deleteMany({ where: { id: Number(id) } })).count
};
