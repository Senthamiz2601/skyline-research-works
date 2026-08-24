const mongoose = require('mongoose');
const Article = require('../models/Article');
const asyncHandler = require('../utils/asyncHandler');

// =========================================
// GET ALL ARTICLES
// =========================================

const getAll = asyncHandler(async (req, res) => {
  const filter = req.admin ? {} : { published: true };

  if (
    req.query.category &&
    req.query.category !== 'All'
  ) {
    filter.category = req.query.category;
  }

  const articles = await Article.find(filter).sort({
    publishedAt: -1,
    createdAt: -1,
  });

  res.json({
    success: true,
    count: articles.length,
    data: articles,
  });
});

// =========================================
// GET SINGLE ARTICLE
// =========================================

const getOne = asyncHandler(async (req, res) => {
  const identifier = req.params.id;

  let article;

  // MongoDB ObjectId என்றால் _id மூலம் search
  if (mongoose.Types.ObjectId.isValid(identifier)) {
    const query = {
      _id: identifier,
    };

    if (!req.admin) {
      query.published = true;
    }

    article = await Article.findOne(query);
  } else {
    // இல்லையென்றால் slug மூலம் search
    const query = {
      slug: identifier,
    };

    if (!req.admin) {
      query.published = true;
    }

    article = await Article.findOne(query);
  }

  if (!article) {
    return res.status(404).json({
      success: false,
      message: 'Article not found.',
    });
  }

  res.json({
    success: true,
    data: article,
  });
});

// =========================================
// GET RELATED ARTICLES
// =========================================

const getRelated = asyncHandler(async (req, res) => {
  const current = await Article.findOne({
    slug: req.params.slug,
    published: true,
  });

  if (!current) {
    return res.json({
      success: true,
      data: [],
    });
  }

  const related = await Article.find({
    category: current.category,
    slug: { $ne: current.slug },
    published: true,
  })
    .sort({
      publishedAt: -1,
      createdAt: -1,
    })
    .limit(3);

  res.json({
    success: true,
    count: related.length,
    data: related,
  });
});

// =========================================
// CREATE ARTICLE
// =========================================

const create = asyncHandler(async (req, res) => {
  console.log('CREATE ARTICLE REQUEST');
  console.log('BODY:', req.body);

  const {
    title,
    category,
    excerpt,
    content,
    coverImage,
    author,
    tags,
    published,
  } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Article title is required.',
    });
  }

  if (!category) {
    return res.status(400).json({
      success: false,
      message: 'Article category is required.',
    });
  }

  if (!excerpt || !excerpt.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Article excerpt is required.',
    });
  }

  if (!content || !content.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Article content is required.',
    });
  }

  const article = new Article({
    title: title.trim(),
    category,
    excerpt: excerpt.trim(),
    content: content.trim(),
    coverImage: coverImage || '',
    author: author?.trim() || 'Skyline Research Works',
    tags: Array.isArray(tags) ? tags : [],
    published: Boolean(published),
  });

  console.log('ARTICLE BEFORE SAVE:', article);


  try {
    await article.save();

    console.log('ARTICLE SAVED:', article._id);

    return res.status(201).json({
      success: true,
      message: 'Article created successfully.',
      data: article,
    });
  } catch (error) {
    console.error('ARTICLE SAVE ERROR:', error);

    return res.status(500).json({
      success: false,
      message: error.message || 'Unable to save article.',
    });
  }
});

// =========================================
// UPDATE ARTICLE
// =========================================

const update = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    return res.status(404).json({
      success: false,
      message: 'Article not found.',
    });
  }

  const {
    title,
    category,
    excerpt,
    content,
    coverImage,
    author,
    tags,
    published,
  } = req.body;

  if (title !== undefined) {
    article.title = title.trim();
  }

  if (category !== undefined) {
    article.category = category;
  }

  if (excerpt !== undefined) {
    article.excerpt = excerpt.trim();
  }

  if (content !== undefined) {
    article.content = content.trim();
  }

  if (coverImage !== undefined) {
    article.coverImage = coverImage;
  }

  if (author !== undefined) {
    article.author =
      author.trim() || 'Skyline Research Works';
  }

  if (tags !== undefined) {
    article.tags = Array.isArray(tags) ? tags : [];
  }

  if (published !== undefined) {
    article.published = Boolean(published);
  }

  await article.save();

  res.json({
    success: true,
    message: 'Article updated successfully.',
    data: article,
  });
});

// =========================================
// DELETE ARTICLE
// =========================================

const remove = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    return res.status(404).json({
      success: false,
      message: 'Article not found.',
    });
  }

  await article.deleteOne();

  res.json({
    success: true,
    message: 'Article deleted successfully.',
  });
});

// =========================================
// EXPORT
// =========================================

module.exports = {
  getAll,
  getOne,
  getRelated,
  create,
  update,
  remove,
};