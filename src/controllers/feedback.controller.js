const service = require('../services/feedback.service');
const { toFeedbackOutput } = require('../dtos/feedback.dto');

exports.create = async (req, res, next) => {
  try {
    const { feedback, notaMedia, totalFeedbacks } = await service.create(req.params.id, req.body);
    res.status(201).json({
      ...toFeedbackOutput(feedback),
      projeto: { id: feedback.projetoId, notaMedia, totalFeedbacks }
    });
  } catch (e) { next(e); }
};
