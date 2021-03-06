const JobUtils = require('../utils/JobUtils');
const Job = require('../model/Job');
const Profile = require('../model/Profile');

module.exports = {
    create(req, res) {
        return res.render('job')
    },
    save(req, res) {

        const lastId = Job.get()[Job.get().length - 1]?.id || 0

        Job.get().push({
            id: lastId + 1,
            name: req.body.name,
            'daily-hours': req.body['daily-hours'],
            'total-hours': req.body['total-hours'],
            created_at: Date.now()
        })
        return res.redirect('/')
    },
    show(req, res) {

        const jobId = req.params.id

        const job = Job.get().find(job => Number(job.id) === Number(jobId))

        job.budget = JobUtils.calculateBudget(job, Profile.get()["value-hour"])

        return res.render('job-edit', { job })
    },
    update(req, res) {
        const jobId = req.params.id

        const job = Job.get().find(job => Number(job.id) === Number(jobId))

        const updatedJob = {
            ...job,
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"]
        }

        Job.update(Job.get().map(job => {
            if (Number(job.id) === Number(updatedJob.id)) {
                job = updatedJob
            }

            return job
        }))

        return res.redirect('/job-edit/' + jobId)
    },
    delete(req, res) {
        const jobId = req.params.id

        Job.delete(jobId)

        return res.redirect('/')
    }

}