const mongoose = require('mongoose');
const slugify = require('slugify');

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },

    category: {
      type: String,
      required: true,
      enum: ['Research', 'Publication', 'Technology', 'Career'],
    },

    excerpt: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    coverImage: {
      type: String,
      default: '',
      trim: true,
    },

    author: {
      type: String,
      default: 'Skyline Research Works',
      trim: true,
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    published: {
      type: Boolean,
      default: false,
    },

    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);


/* =========================================
   GENERATE UNIQUE SLUG
========================================= */

articleSchema.pre('validate', async function generateSlug(next) {
  try {
    // Title இல்லையென்றால் validation அதை handle செய்யும்
    if (!this.title) {
      return next();
    }

    // New article அல்லது title change ஆனபோது மட்டும் slug generate
    if (this.isNew || this.isModified('title')) {
      const baseSlug = slugify(this.title, {
        lower: true,
        strict: true,
        trim: true,
      });

      let slug = baseSlug;
      let counter = 1;

      // Same slug already database-ல் இருக்கிறதா?
      while (
        await mongoose.models.Article.exists({
          slug: slug,
          _id: { $ne: this._id },
        })
      ) {
        slug = `${baseSlug}-${counter}`;
        counter += 1;
      }

      this.slug = slug;
    }

    next();
  } catch (error) {
    next(error);
  }
});


/* =========================================
   PUBLISHED DATE
========================================= */

articleSchema.pre('save', function setPublishedAt(next) {
  // Publish செய்யும்போது date set செய்யும்
  if (
    this.isModified('published') &&
    this.published &&
    !this.publishedAt
  ) {
    this.publishedAt = new Date();
  }

  // Published → Draft மாற்றினால் date remove
  if (
    this.isModified('published') &&
    !this.published
  ) {
    this.publishedAt = undefined;
  }

  next();
});


/* =========================================
   DATABASE INDEXES
========================================= */

articleSchema.index({
  category: 1,
  published: 1,
});

articleSchema.index({
  published: 1,
  publishedAt: -1,
});


/* =========================================
   EXPORT MODEL
========================================= */

module.exports = mongoose.model('Article', articleSchema);