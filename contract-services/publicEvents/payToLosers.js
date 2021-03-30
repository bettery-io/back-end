const PlayerPaymentContract = require("../abi/PlayerPayment.json");

const payToLosers = async (data) =>{
    console.log("from payToLosers")
    console.log(data);
    let id = data.id;
    let avarageBet = data.avarageBet;
    let calcMintedToken = data.calcMintedToken;

    let contract = await ContractInit.init(process.env.NODE_ENV, PlayerPaymentContract);
    try {
        let gasEstimate = await contract.methods.letsPayToLoosers(id, avarageBet, calcMintedToken).estimateGas();
        await contract.methods.letsPayToLoosers(id, avarageBet, calcMintedToken).send({
            gas: gasEstimate,
            gasPrice: 0
        });
    } catch (err) {
        console.log("err from pay to losers", err)
    }
}

module.exports = {
    payToLosers
}