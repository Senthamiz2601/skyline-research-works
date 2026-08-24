import React, { useEffect, useMemo, useState } from 'react';
import { articlesApi } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import './ArticlesAdmin.css';

const categories = ['All', 'Research', 'Publication', 'Technology', 'Career'];

const emptyForm = {
  title: '',
  category: 'Research',
  excerpt: '',
  content: '',
  coverImage: '',
  author: 'Skyline Research Works',
  tags: '',
  published: false,
};

export default function ArticlesAdmin() {
  const [articles, setArticles] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState(emptyForm);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

 /* =========================================
   LOAD ARTICLES
========================================= */

const loadArticles = async () => {
  try {
    setLoading(true);
    setError('');

    const response = await articlesApi.getAll();

    setArticles(
      Array.isArray(response?.data)
        ? response.data
        : []
    );
  } catch (err) {
    setError(err.message || 'Unable to load articles.');
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  loadArticles();
}, []);

  /* =========================================
     FILTER ARTICLES
  ========================================= */

  const filteredArticles = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesSearch =
        !searchValue ||
        article.title?.toLowerCase().includes(searchValue) ||
        article.excerpt?.toLowerCase().includes(searchValue) ||
        article.author?.toLowerCase().includes(searchValue);

      const matchesCategory =
        category === 'All' ||
        article.category === category;

      const matchesStatus =
        status === 'All' ||
        (status === 'Published' && article.published) ||
        (status === 'Draft' && !article.published);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [articles, search, category, status]);

  /* =========================================
     FORM HANDLERS
  ========================================= */

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : value,
    }));

    setError('');
  };

  /* =========================================
     IMAGE HANDLING
  ========================================= */

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB.');
      return;
    }

    setError('');

    setImageFile(file);

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');

    setForm((prev) => ({
      ...prev,
      coverImage: '',
    }));
  };

  /* =========================================
     CREATE FORM
  ========================================= */

  const openCreateForm = () => {
    setEditingId(null);

    setForm({
      ...emptyForm,
    });

    setImageFile(null);
    setImagePreview('');

    setShowForm(true);
    setError('');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  /* =========================================
     EDIT FORM
  ========================================= */

  const openEditForm = (article) => {
    setEditingId(article._id);

    setForm({
      title: article.title || '',
      category: article.category || 'Research',
      excerpt: article.excerpt || '',
      content: article.content || '',
      coverImage: article.coverImage || '',
      author:
        article.author ||
        'Skyline Research Works',
      tags: Array.isArray(article.tags)
        ? article.tags.join(', ')
        : '',
      published: Boolean(article.published),
    });

    setImageFile(null);

    setImagePreview(
      article.coverImage || ''
    );

    setShowForm(true);
    setError('');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  /* =========================================
     CLOSE FORM
  ========================================= */

  const closeForm = () => {
    if (saving) return;

    setShowForm(false);
    setEditingId(null);

    setForm({
      ...emptyForm,
    });

    setImageFile(null);
    setImagePreview('');

    setError('');
  };

  /* =========================================
     VALIDATION
  ========================================= */

  const validateForm = () => {
    if (!form.title.trim()) {
      return 'Article title is required.';
    }

    if (!form.excerpt.trim()) {
      return 'Article excerpt is required.';
    }

    if (!form.content.trim()) {
      return 'Article content is required.';
    }

    if (!form.category) {
      return 'Please select a category.';
    }

    return '';
  };

  /* =========================================
     CREATE / UPDATE
  ========================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSaving(true);
      setError('');

      /*
       * NOTE:
       * imageFile is currently only used for preview.
       *
       * Once backend image upload is connected,
       * this is where FormData / Cloudinary upload
       * will be handled.
       */

      const payload = {
        title: form.title.trim(),

        category: form.category,

        excerpt: form.excerpt.trim(),

        content: form.content.trim(),

        /*
         * Keep existing URL when editing.
         * New image upload will be connected
         * in the backend upload step.
         */
        coverImage: form.coverImage.trim(),

        author:
          form.author.trim() ||
          'Skyline Research Works',

        tags: form.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),

        published: Boolean(form.published),
      };

      if (editingId) {
        await articlesApi.update(
          editingId,
          payload
        );
      } else {
        await articlesApi.create(payload);
      }

      await loadArticles();

      closeForm();
    } catch (err) {
      setError(
        err.message ||
        'Unable to save article.'
      );
    } finally {
      setSaving(false);
    }
  };

  /* =========================================
     DELETE ARTICLE
  ========================================= */

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this article? This action cannot be undone.'
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError('');

      await articlesApi.remove(id);

      setArticles((prev) =>
        prev.filter(
          (article) =>
            article._id !== id
        )
      );
    } catch (err) {
      setError(
        err.message ||
        'Unable to delete article.'
      );
    } finally {
      setDeletingId(null);
    }
  };

  /* =========================================
     STATISTICS
  ========================================= */

  const publishedCount =
    articles.filter(
      (article) => article.published
    ).length;

  const draftCount =
    articles.filter(
      (article) => !article.published
    ).length;

  /* =========================================
     DATE FORMAT
  ========================================= */

  const formatDate = (article) => {
    const dateValue =
      article.publishedAt ||
      article.createdAt;

    if (!dateValue) return '';

    return new Date(
      dateValue
    ).toLocaleDateString(
      'en-IN',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }
    );
  };

  /* =========================================
     RENDER
  ========================================= */

  return (
    <div className="articles-admin">

      {/* =====================================
          HEADER
      ===================================== */}

      <header className="articles-admin__header">

        <div>
          <span className="articles-admin__eyebrow">
            KNOWLEDGE HUB
          </span>

          <h1>
            Articles
          </h1>

          <p>
            Create, manage and publish
            research, technology,
            publication and career insights.
          </p>
        </div>

        <button
          type="button"
          className="articles-admin__add"
          onClick={openCreateForm}
        >
          <span>+</span>
          Create Article
        </button>

      </header>


      {/* =====================================
          STATS
      ===================================== */}

      <section className="articles-admin__stats">

        <div className="articles-admin__stat">
          <span>
            Total Articles
          </span>

          <strong>
            {articles.length}
          </strong>
        </div>

        <div className="articles-admin__stat">
          <span>
            Published
          </span>

          <strong>
            {publishedCount}
          </strong>
        </div>

        <div className="articles-admin__stat">
          <span>
            Drafts
          </span>

          <strong>
            {draftCount}
          </strong>
        </div>

      </section>


      {/* =====================================
          ERROR
      ===================================== */}

      {error && (
        <div className="articles-admin__error">
          {error}
        </div>
      )}


      {/* =====================================
          CREATE / EDITOR
      ===================================== */}

      {showForm && (

        <section className="article-editor">

          <div className="article-editor__header">

            <div>

              <span className="articles-admin__eyebrow">
                {editingId
                  ? 'EDIT ARTICLE'
                  : 'NEW ARTICLE'}
              </span>

              <h2>
                {editingId
                  ? 'Update Article'
                  : 'Create New Article'}
              </h2>

              <p>
                Add useful and engaging
                content to your Knowledge Hub.
              </p>

            </div>

            <button
              type="button"
              className="article-editor__close"
              onClick={closeForm}
              aria-label="Close article editor"
            >
              ×
            </button>

          </div>


          {/* FORM */}

          <form onSubmit={handleSubmit}>

            <div className="article-form__grid">

              {/* TITLE */}

              <div className="article-form__field article-form__field--full">

                <label htmlFor="title">
                  Article Title
                </label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter article title"
                  maxLength={150}
                />

              </div>


              {/* CATEGORY */}

              <div className="article-form__field">

                <label htmlFor="category">
                  Category
                </label>

                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >

                  {categories
                    .filter(
                      (item) =>
                        item !== 'All'
                    )
                    .map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}

                </select>

              </div>


              {/* AUTHOR */}

              <div className="article-form__field">

                <label htmlFor="author">
                  Author
                </label>

                <input
                  id="author"
                  name="author"
                  type="text"
                  value={form.author}
                  onChange={handleChange}
                  placeholder="Author name"
                />

              </div>


              {/* COVER IMAGE */}

              <div className="article-form__field article-form__field--full">

                <label>
                  Cover Image
                </label>

                <div className="article-image-upload">

                  {!imagePreview ? (

                    <label
                      htmlFor="article-cover-image"
                      className="article-image-upload__dropzone"
                    >

                      <div className="article-image-upload__icon">
                        ↑
                      </div>

                      <strong>
                        Upload Cover Image
                      </strong>

                      <span>
                        JPG, PNG or WEBP · Maximum 5MB
                      </span>

                      <input
                        id="article-cover-image"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={
                          handleImageChange
                        }
                        hidden
                      />

                    </label>

                  ) : (

                    <div className="article-image-upload__preview">

                      <img
                        src={imagePreview}
                        alt="Article cover preview"
                      />

                      <div className="article-image-upload__overlay">

                        <label
                          htmlFor="article-cover-image-change"
                          className="article-image-upload__change"
                        >
                          Change Image
                        </label>

                        <button
                          type="button"
                          className="article-image-upload__remove"
                          onClick={
                            removeImage
                          }
                        >
                          Remove
                        </button>

                      </div>

                      <input
                        id="article-cover-image-change"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={
                          handleImageChange
                        }
                        hidden
                      />

                    </div>

                  )}

                </div>

                <small>
                  Use a clear landscape
                  image that represents
                  the article topic.
                </small>

              </div>


              {/* EXCERPT */}

              <div className="article-form__field article-form__field--full">

                <label htmlFor="excerpt">
                  Short Excerpt
                </label>

                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={form.excerpt}
                  onChange={handleChange}
                  placeholder="Write a short summary of the article..."
                  rows={4}
                  maxLength={300}
                />

                <small>
                  A short summary shown on
                  Knowledge Hub cards.
                </small>

              </div>


              {/* CONTENT */}

              <div className="article-form__field article-form__field--full">

                <label htmlFor="content">
                  Article Content
                </label>

                <textarea
                  id="content"
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  placeholder="Write the complete article content here..."
                  rows={16}
                />

                <small>
                  Write the complete article
                  content. Use paragraphs
                  for better readability.
                </small>

              </div>


              {/* TAGS */}

              <div className="article-form__field article-form__field--full">

                <label htmlFor="tags">
                  Tags
                </label>

                <input
                  id="tags"
                  name="tags"
                  type="text"
                  value={form.tags}
                  onChange={handleChange}
                  placeholder="Research, AI, Students, Technology"
                />

                <small>
                  Separate multiple tags
                  using commas.
                </small>

              </div>


              {/* PUBLISH */}

              <div className="article-editor__publish">

                <label className="article-editor__toggle">

                  <input
                    type="checkbox"
                    name="published"
                    checked={form.published}
                    onChange={handleChange}
                  />

                  <span className="article-editor__toggle-ui"></span>

                  <span>

                    <strong>
                      Publish this article
                    </strong>

                    <small>
                      Make this article visible
                      on the public Knowledge Hub.
                    </small>

                  </span>

                </label>

              </div>

            </div>


            {/* FORM ACTIONS */}

            <div className="article-form__actions">

              <button
                type="button"
                className="article-form__cancel"
                onClick={closeForm}
                disabled={saving}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="article-form__save"
                disabled={saving}
              >
                {saving
                  ? 'Saving...'
                  : editingId
                    ? 'Update Article'
                    : form.published
                      ? 'Publish Article'
                      : 'Save Draft'}
              </button>

            </div>

          </form>

        </section>

      )}


      {/* =====================================
          TOOLBAR
      ===================================== */}

      {!showForm && (

        <div className="articles-admin__toolbar">

          <div className="articles-admin__search">

            <span>
              ⌕
            </span>

            <input
              type="search"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search articles..."
            />

          </div>


          <div className="articles-admin__filters">

            {categories.map((item) => (

              <button
                key={item}
                type="button"
                className={
                  category === item
                    ? 'articles-admin__filter active'
                    : 'articles-admin__filter'
                }
                onClick={() =>
                  setCategory(item)
                }
              >
                {item}
              </button>

            ))}

          </div>


          <select
            className="articles-admin__status-filter"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >

            <option value="All">
              All Status
            </option>

            <option value="Published">
              Published
            </option>

            <option value="Draft">
              Draft
            </option>

          </select>

        </div>

      )}


      {/* =====================================
          LOADING
      ===================================== */}

      {loading ? (

        <LoadingSpinner
          label="Loading articles..."
        />

      ) : filteredArticles.length === 0 ? (

        /* ===================================
           EMPTY STATE
        =================================== */

        <div className="articles-admin__empty">

          <div className="articles-admin__empty-content">

            <div className="articles-admin__empty-icon">
              ✦
            </div>

            <h3>
              {articles.length === 0
                ? 'No articles yet'
                : 'No matching articles'}
            </h3>

            <p>
              {articles.length === 0
                ? 'Create your first Knowledge Hub article and start sharing useful insights.'
                : 'Try changing your search, category or status filter.'}
            </p>

            {articles.length === 0 && (

              <button
                type="button"
                className="articles-admin__add"
                onClick={openCreateForm}
              >
                <span>+</span>
                Create First Article
              </button>

            )}

          </div>

        </div>

      ) : (

        /* ===================================
           ARTICLE GRID
        =================================== */

        <div className="admin-articles-grid">

          {filteredArticles.map(
            (article) => {

              const date =
                formatDate(article);

              return (

                <article
                  key={article._id}
                  className="admin-article-card"
                >

                  {/* IMAGE */}

                  <div className="admin-article-card__image">

                    {article.coverImage ? (

                      <img
                        src={article.coverImage}
                        alt={article.title}
                        loading="lazy"
                      />

                    ) : (

                      <div className="admin-article-card__image--placeholder">

                        <span>
                          KNOWLEDGE HUB
                        </span>

                      </div>

                    )}

                    <span
                      className={
                        article.published
                          ? 'admin-article-card__status'
                          : 'admin-article-card__status draft'
                      }
                    >
                      {article.published
                        ? 'Published'
                        : 'Draft'}
                    </span>

                  </div>


                  {/* BODY */}

                  <div className="admin-article-card__body">

                    <span className="admin-article-card__category">
                      {article.category}
                    </span>

                    <h3>
                      {article.title}
                    </h3>

                    <p>
                      {article.excerpt}
                    </p>


                    {/* META */}

                    <div className="admin-article-card__meta">

                      <span>
                        {article.author ||
                          'Skyline Research Works'}
                      </span>

                      <span>
                        {date}
                      </span>

                    </div>


                    {/* TAGS */}

                    {Array.isArray(
                      article.tags
                    ) &&
                      article.tags.length > 0 && (

                        <div className="admin-article-card__tags">

                          {article.tags
                            .slice(0, 3)
                            .map((tag) => (

                              <span key={tag}>
                                #{tag}
                              </span>

                            ))}

                        </div>

                      )}


                    {/* ACTIONS */}

                    <div className="admin-article-card__actions">

                      <button
                        type="button"
                        className="admin-article-card__edit"
                        onClick={() =>
                          openEditForm(article)
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="admin-article-card__delete"
                        onClick={() =>
                          handleDelete(
                            article._id
                          )
                        }
                        disabled={
                          deletingId ===
                          article._id
                        }
                      >
                        {deletingId ===
                        article._id
                          ? 'Deleting...'
                          : 'Delete'}
                      </button>

                    </div>

                  </div>

                </article>

              );
            }
          )}

        </div>

      )}

    </div>
  );
}