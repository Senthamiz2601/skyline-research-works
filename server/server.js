require('dotenv').config();

const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const projectRoutes = require('./routes/project.routes');
const serviceRoutes = require('./routes/service.routes');
const articleRoutes = require('./routes/article.routes');
const internshipRoutes = require('./routes/internship.routes');
const testimonialRoutes = require('./routes/testimonial.routes');
const faqRoutes = require('./routes/faq.routes');
const enquiryRoutes = require('./routes/enquiry.routes');
const authRoutes = require('./routes/auth.routes');
const statsRoutes = require('./routes/stats.routes');

connectDB();

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

// Basic rate limiting on write-heavy public endpoints (e.g. enquiry submissions)
const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: 'Too many requests, please try again later.' },
});

app.get('/api/health', (req, res) => res.json({ success: true, message: 'Skyline Research Works API is running' }));

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/enquiries', enquiryLimiter, enquiryRoutes);
app.use('/api/stats', statsRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
