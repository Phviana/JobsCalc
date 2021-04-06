const Profile = require('../model/Profile')
const Job = require('../model/Job')
const JobUtils = require('../Utils/JobUtils')

module.exports = {
    index(req, res) {
        const jobs = Job.get();
        const profile = Profile.get()

        let jobTotalHours = 0;

        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        const updatedJobs = jobs.map(job => {

            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'

            jobTotalHours += status === 'progress'? Number(job['daily-hours']) : 0

            statusCount[status] += 1

            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            }
        })

        // qtd de horas que quero trabalhar menos quantidade horas/dia de cada job progress
        const freeHours = profile["hours-per-day"] - jobTotalHours

        return res.render('index', { profile: profile, jobs: updatedJobs, statusCount, freeHours })
    }
}