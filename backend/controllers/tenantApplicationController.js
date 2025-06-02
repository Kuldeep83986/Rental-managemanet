const TenantApplication = require('../models/tenantApplication');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Setup multer for document uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'uploads/documents';
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

const submitApplication = async (req, res) => {
  try {
    const { personalInfo, references, employmentHistory } = req.body;
    const documents = req.files ? req.files.map(file => ({
      type: file.mimetype,
      url: file.path
    })) : [];

    const application = new TenantApplication({
      user: req.user.id,
      personalInfo: JSON.parse(personalInfo),
      references: JSON.parse(references),
      employmentHistory: JSON.parse(employmentHistory),
      documents: documents,
      backgroundCheckStatus: 'pending'
    });

    await application.save();
    res.status(201).json({ message: 'Application submitted successfully', application });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getApplications = async (req, res) => {
  try {
    const applications = await TenantApplication.find().populate('user', 'username email');
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  submitApplication,
  getApplications,
  upload
};
