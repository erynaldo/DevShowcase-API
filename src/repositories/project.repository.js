const prisma = require('../config/prisma');

const include = {
  profile: true,
  projectTechnologies: { include: { technology: true } }
};

const withTechnologyAlias = project => ({
  ...project,
  technologies: project.projectTechnologies.map(({ technology }) => technology)
});

const technologyWhere = technology => Number.isInteger(Number(technology))
  ? { projectTechnologies: { some: { technology: { id: Number(technology) } } } }
  : { projectTechnologies: { some: { technology: { nome: { equals: String(technology).trim(), mode: 'insensitive' } } } } };

module.exports = {
  create: data => prisma.project.create({ data }),
  findAll: async ({ page, limit } = {}) => {
    const pagination = page && limit ? { skip: (page - 1) * limit, take: limit } : {};
    const [projects, total] = await prisma.$transaction([
      prisma.project.findMany({ include, orderBy: { createdAt: 'desc' }, ...pagination }),
      prisma.project.count()
    ]);
    return { projects: projects.map(withTechnologyAlias), total };
  },
  findByTechnology: async technology => {
    const projects = await prisma.project.findMany({
      where: technologyWhere(technology),
      include,
      orderBy: { createdAt: 'desc' }
    });
    return projects.map(withTechnologyAlias);
  },
  findById: async id => {
    const project = await prisma.project.findUnique({ where: { id: Number(id) }, include });
    return project ? withTechnologyAlias(project) : null;
  }
};
