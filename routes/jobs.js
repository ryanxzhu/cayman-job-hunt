const express = require('express');
const router = express.Router();
const Job = require('../models/job');

// All jobs route
router.get('/', function(req, res) {
	res.render('jobs/index');
});

// New jobs route
router.get('/new', function(req, res) {
	res.render('jobs/new', { job: new Job(), errorMessage: '' });
});

// Create jobs route
router.post('/', function(req, res) {
	const job = new Job({
		title: req.body.title
	});
	job.save((err, newJob) => {
		if (err) {
			res.render('jobs/new', { job: job, errorMessage: 'Error creating job' });
		} else {
			console.log(newJob);
			// res.redirect(`jobs/${newJob.id}`);
			res.redirect(`jobs`);
		}
	});
});

module.exports = router;
