const mongoose = require('mongoose');

const appliedApplicantSchema = new mongoose.Schema({
    jobTitle: { type: String, required: true },
    applicants: [{
        name: { type: String, required: true },
        jobId: { type: String, required: true }, // Store jobId as string
        email: { type: String, required: true },
        cv: { type: String, required: true },
        shortlisted: { type: Boolean, required: false ,default:false},
        selected: { type: Boolean, required: false,default:false },
    }]
});

const AppliedApplicant = mongoose.model('AppliedApplicant', appliedApplicantSchema);

module.exports = AppliedApplicant;
