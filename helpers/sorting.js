const _ = require('lodash');

const trendingSorting = (data) => {
    let events = _.sortBy(data, (x) => { return x.answerAmount })
    return events.reverse();
}

const controversialSorting = (data) => {
    for (let i = 0; i < data.length; i++) {
        let allQuantity = data[i].parcipiantAnswers == undefined ? 0 : data[i].parcipiantAnswers.length;
        // calcalate fomula
        data[i].controversial = (100 - allQuantity) / 100;
    }
    let events = _.sortBy(data, (x) => { return x.controversial })
    return events;
}

module.exports = {
    trendingSorting,
    controversialSorting
}
