const repo = require('../repositories/technology.repository');
module.exports = {
  create: data => repo.create(data),
  list: () => repo.findAll(),
  getById: id => repo.findById(id),
  destroyById: id => repo.destroyById(id)
};
