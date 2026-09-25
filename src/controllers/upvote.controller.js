const service = require('../services/upvote.service');
const { toUpvoteOutput } = require('../dtos/upvote.dto');

exports.increment = async (req, res, next) => {
  try {
    res.json(toUpvoteOutput(await service.increment(req.params.id)));
  } catch (error) {
    next(error);
  }
};
