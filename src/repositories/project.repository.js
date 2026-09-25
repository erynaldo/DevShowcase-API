const prisma = require('../config/prisma');

const include = {
  profile: true,
  projectTechnologies: { include: { technology: true } }
};

const withTechnologyAlias = project => ({
  ...project,
  technologies: project.projectTechnologies.map(({ technology }) => technology)
});

module.exports = {
  create: data => prisma.project.create({ data }),
  findAll: async () => (await prisma.project.findMany({ include, orderBy: { createdAt: 'desc' } })).map(withTechnologyAlias),
  findById: async id => {
    const project = await prisma.project.findUnique({ where: { id: Number(id) }, include });
    return project ? withTechnologyAlias(project) : null;
  }
};
