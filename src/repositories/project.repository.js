const prisma = require('../config/prisma');

const include = {
  profile: true,
  projectTechnologies: { include: { technology: true } },
  _count: { select: { feedbacks: true } }
};

const withTechnologyAlias = project => ({
  ...project,
  technologies: project.projectTechnologies.map(({ technology }) => technology),
  totalFeedbacks: project._count?.feedbacks ?? 0
});

const buildWhere = ({ tecnologia, tecnologiaId }) => {
  const where = {};
  if (tecnologiaId) {
    where.projectTechnologies = { some: { id_tecnologia: Number(tecnologiaId) } };
  } else if (tecnologia) {
    where.projectTechnologies = {
      some: { technology: { nome: { contains: tecnologia, mode: 'insensitive' } } }
    };
  }
  return where;
};

module.exports = {
  create: data => prisma.project.create({ data }),
  findAll: async () => (await prisma.project.findMany({ include, orderBy: { createdAt: 'desc' } })).map(withTechnologyAlias),
  findAndCountAll: async ({ tecnologia, tecnologiaId, page, limit }) => {
    const where = buildWhere({ tecnologia, tecnologiaId });
    const [total, projects] = await prisma.$transaction([
      prisma.project.count({ where }),
      prisma.project.findMany({
        where,
        include,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit
      })
    ]);
    return { total, projects: projects.map(withTechnologyAlias) };
  },
  findById: async id => {
    const project = await prisma.project.findUnique({ where: { id: Number(id) }, include });
    return project ? withTechnologyAlias(project) : null;
  },
  incrementUpvotes: id => prisma.project.update({
    where: { id: Number(id) },
    data: { upvotes: { increment: 1 } }
  })
};
