const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');

// Generic CRUD factory to keep controllers small and consistent across resources.
// publicFilter: fn(req) -> mongo filter applied on public GET-all/GET-one routes (e.g. only published items)
const crudFactory = (Model, { publicFilter } = {}) => ({
  getAll: asyncHandler(async (req, res) => {
    const filter = publicFilter ? publicFilter(req) : {};
    const items = await Model.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: items.length, data: items });
  }),

  getOne: asyncHandler(async (req, res) => {
    const filter = publicFilter ? publicFilter(req) : {};
    const query = { _id: req.params.id, ...filter };
    const item = await Model.findOne(req.params.id.match(/^[0-9a-fA-F]{24}$/) ? query : { slug: req.params.id, ...filter });
    if (!item) throw new ApiError(404, 'Not found');
    res.json({ success: true, data: item });
  }),

  create: asyncHandler(async (req, res) => {
    const item = await Model.create(req.body);
    res.status(201).json({ success: true, data: item });
  }),

  update: asyncHandler(async (req, res) => {
    const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) throw new ApiError(404, 'Not found');
    res.json({ success: true, data: item });
  }),

  remove: asyncHandler(async (req, res) => {
    const item = await Model.findByIdAndDelete(req.params.id);
    if (!item) throw new ApiError(404, 'Not found');
    res.json({ success: true, data: {} });
  }),
});

module.exports = crudFactory;
