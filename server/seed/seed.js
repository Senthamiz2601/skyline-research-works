// Seeds a single admin user from env vars, and a small set of demo content
// so the site is browsable immediately after `npm run seed`.
// Run with: npm run seed  (requires MONGODB_URI, SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD in .env)
require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const Service = require('../models/Service');
const FAQ = require('../models/FAQ');

const services = [
  { title: 'Research Guidance', tagline: 'Turn your research idea into a clear direction.', description: 'Expert consultation for formulating research methodologies and defining problem statements.', order: 1 },
  { title: 'Project Assistance', tagline: 'Build practical solutions from your ideas.', description: 'End-to-end technical support for bringing your software and hardware concepts to life.', order: 2 },
  { title: 'Publication Support', tagline: 'Prepare your research for meaningful publication.', description: 'Guidance on journal and conference publications, formatting, and submission.', order: 3 },
  { title: 'Internship Programs', tagline: 'Gain practical experience by working on real projects.', description: 'Hands-on internships across AI/ML, web development, data science and IoT.', order: 4 },
  { title: 'Documentation Support', tagline: 'Present your research and projects with clarity.', description: 'Professional technical documentation for research and project deliverables.', order: 5 },
  { title: 'Career & Technical Guidance', tagline: 'Build the skills and direction for your next step.', description: 'Personalized guidance on career direction and technical skill building.', order: 6 },
];

const faqs = [
  { question: 'Do you provide project assistance?', answer: 'Yes, we offer end-to-end support for software and hardware projects, from ideation to implementation.', order: 1 },
  { question: 'Do you provide research guidance?', answer: 'Yes, our team helps with topic selection, methodology design, and research documentation.', order: 2 },
  { question: 'Do you help with research publications?', answer: 'Yes, we support journal and conference publication preparation, formatting, and submission guidance.', order: 3 },
  { question: 'Do you provide internships?', answer: 'Yes, we run internship programs across AI/ML, full stack development, Python, data science and IoT.', order: 4 },
  { question: 'Can I choose my own project topic?', answer: 'Absolutely — you can bring your own idea, or we can help you choose one based on your interests.', order: 5 },
  { question: 'Do you provide technical documentation?', answer: 'Yes, we help structure and write clear technical documentation for your project or research.', order: 6 },
  { question: 'How can I contact Skyline Research Works?', answer: 'Use the contact form on our website, and our team will get back to you shortly.', order: 7 },
];

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected. Seeding...');

  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;
  if (email && password) {
    const existing = await Admin.findOne({ email });
    if (!existing) {
      await Admin.create({ name: 'Skyline Admin', email, password, role: 'superadmin' });
      console.log(`Admin created: ${email}`);
    } else {
      console.log('Admin already exists, skipping.');
    }
  } else {
    console.log('SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD not set, skipping admin creation.');
  }

  if ((await Service.deleteMany({}))) {
    await Service.insertMany(services);
    console.log('Services updated.');
  }

  if ((await FAQ.countDocuments()) === 0) {
    await FAQ.insertMany(faqs);
    console.log('FAQs seeded.');
  }

  console.log('Done.');
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
