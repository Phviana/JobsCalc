let data = [
    {
        id: 1,
        name: "Pizzaria Gulosoo",
        'daily-hours': 2,
        'total-hours': 1,
        created_at: Date.now(),
    },
    {
        id: 2,
        name: "OneTwo Project",
        'daily-hours': 2,
        'total-hours': 46,
        created_at: Date.now(),
    }
]

module.exports = {
    get() {
        return data;
    },
    update(newData) {
        data = newData;
    },
    delete(jobId){
        data = data.filter(job => Number(job.id) !== Number(jobId))
    }
};