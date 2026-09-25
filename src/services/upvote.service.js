const projectRepo = require('../repositories/project.repository');
const upvoteRepo = require('../repositories/upvote.repository');

module.exports = {
  increment: async projectId => {
    const project = await projectRepo.findById(projectId);
    if (!project) {
      const error = new Error('Projeto não encontrado');
      error.status = 404;
      throw error;
    }
    return upvoteRepo.increment(projectId);
  }
};
