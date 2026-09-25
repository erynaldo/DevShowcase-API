const prisma = require('../config/prisma');

const include = {
  profile: true,
  projectTechnologies: { include: { technology: true } }
};

module.exports = {
  increment: async projectId => prisma.project.update({
    where: { id: Number(projectId) },
    data: { upvotes: { increment: 1 } },
    include
  })
};
