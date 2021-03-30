const PlayerPaymentContract = require("../abi/PlayerPayment.json");

const payToPlayers = async (data) =>{
    console.log("from payToPlayers")
    console.log(data)
    let id = data.id;

    let contract = await ContractInit.init(process.env.NODE_ENV, PlayerPaymentContract);
    try {
        let gasEstimate = await contract.methods.letsPayToPlayers(id).estimateGas();
        await contract.methods.letsPayToPlayers(id).send({
            gas: gasEstimate,
            gasPrice: 0
        });

        // TODO add to db and calcalate amount of win for users
    } catch (err) {
        console.log("err from pay to players", err)
    }
}

module.exports = {
    payToPlayers
}