const PublicEventContract = require("./abi/PublicEvents.json");
const MiddlePaymentContract = require("./abi/MiddlePayment.json");
const PlayerPaymentContract = require("./abi/PlayerPayment.json");

const ContractInit = require("./contractInit.js");
const ExpertsCalcOracle = require('./oracels/exprestCalc');
const setAnswer = require("../services/events/event_is_finish");
const publicEvents = require("./publicEvents/index");


const loadHandler = async () => {
    let publicEvent = await ContractInit.webSoketInit(process.env.NODE_ENV, PublicEventContract);
    publicEventsHandler(publicEvent);
    let mpEvent = await ContractInit.webSoketInit(process.env.NODE_ENV, MiddlePaymentContract);
    MiddlePayment(mpEvent); 
    let ppEvent = await ContractInit.webSoketInit(process.env.NODE_ENV, PlayerPaymentContract);
    PlayerPayment(ppEvent);

}

const publicEventsHandler = (publicEvent) => {
    publicEvent.events.calculateExpert(async (err, event) => {
        if (err) {
            console.error('Error from calculate expert events', err)
            restartHandler();
        } else {
            console.log("event calculateExpert work")
            ExpertsCalcOracle.expertCalc(event.returnValues);
        }
    })

    publicEvent.events.findCorrectAnswer(async (err, event) => {
        if (err) {
            console.error('Error from find сorrect answer events', err)
            restartHandler();
        } else {
            publicEvents.findCorrectAnswer.findCorrectAnswer(event.returnValues);
        }
    })

   
}

const MiddlePayment = async (middlePayment) =>{
    middlePayment.events.payToCompanies(async (err, event) => {
        if (err) {
            console.error('Error from find pay to companies events', err)
            restartHandler();
        } else {
            publicEvents.payToCompanies.payToCompanies(event.returnValues);
        }
    })

    middlePayment.events.payToHost(async (err, event) => {
        if (err) {
            console.error('Error from find pay to host events', err)
            restartHandler();
        } else {
            publicEvents.payToHost.payToHost(event.returnValues);
        }
    })

    middlePayment.events.payToExperts(async (err, event) => {
        if (err) {
            console.error('Error from find pay to expert events', err)
            restartHandler();
        } else {
            publicEvents.payToExperts.payToExperts(event.returnValues);
        }
    })

    middlePayment.events.payToPlayers(async (err, event) => {
        if (err) {
            console.error('Error from find pay to players events', err)
            restartHandler();
        } else {
            publicEvents.payToPlayers.payToPlayers(event.returnValues);
        }
    })

    middlePayment.events.revertedEvent(async (err, event) => {
        if (err) {
            console.error('Error from reverted event', err)
            restartHandler();
        } else {
            console.log("event revertedEvent work")
            // TODO 
        }
    })
}

const PlayerPayment = async (playerPayment) =>{
    playerPayment.events.payToLosers(async (err, event) => {
        if (err) {
            console.error('Error from find pay to losers events', err)
            restartHandler();
        } else {
            publicEvents.payToLosers.payToLosers(event.returnValues);
        }
    })

    playerPayment.events.payToRefferers(async (err, event) => {
        if (err) {
            console.error('Error from find pay to refferers events', err)
            restartHandler();
        } else {
            publicEvents.payToRefferers.payToRefferers(event.returnValues);
        }
    })
    
    playerPayment.events.eventFinish(async (err, event) => {
        if (err) {
            console.error('Error from event finish event', err)
            restartHandler();
        } else {
            console.log("event finish work")
            setAnswer.setCorrectAnswer(event.returnValues);
            // TODO add calcalation of tokens
        }
    })
}


const restartHandler = () => {
    setTimeout(async () => {
        console.log("RESTART EVENT HANDEL")
        await this.loadHandler()
    }, 3000)
}

module.exports = {
    loadHandler
}