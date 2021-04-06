let data = {
    avatar: "https://github.com/phviana.png",
    name: "Paulo Viana",
    "monthly-budget": 20,
    "value-hour": 80,
    "vacation-per-year": 21,
    "hours-per-day": 21,
    "days-per-week": 4
}

module.exports = {
    get(){
        return data;
    },
    update(newData){
        data = newData;
    }
};