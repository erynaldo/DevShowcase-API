const service = require('../services/feedback.service');
const { toFeedbackOutput } = require('../dtos/feedback.dto');

exports.create = async (req, res, next) => {
  try {
    res.status(201).json(toFeedbackOutput(await service.create(req.body)));
  } catch (e) { next(e); }
};

exports.list = async (req, res, next) => {
  try {
    const projetoId = req.query.projetoId ? Number(req.query.projetoId) : undefined;
    res.json((await service.list(projetoId)).map(toFeedbackOutput));
  } catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
  try {
    const feedback = await service.updateById(req.params.id, req.body);
    res.json(toFeedbackOutput(feedback));
  } catch (e) { next(e); }
};

exports.destroy = async (req, res, next) => {
  try {
    const deletedCount = await service.destroyById(req.params.id);
    if (!deletedCount) return res.status(404).json({ message: 'Feedback não encontrado' });
    res.status(200).json({ message: 'Feedback excluído com sucesso' });
  } catch (e) { next(e); }
};

exports.createForProject = async (req, res, next) => {
  try {
    const feedback = await service.create({ ...req.body, projetoId: Number(req.params.id) });
    res.status(201).json(toFeedbackOutput(feedback));
  } catch (e) { next(e); }
};