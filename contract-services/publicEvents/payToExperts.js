const MiddlePaymentContract = require("../abi/MiddlePayment.json");

const payToExperts = async (data) => {
    console.log("from payToExperts")
    console.log(data);
    let id = data.id;

    let contract = await ContractInit.init(process.env.NODE_ENV, MiddlePaymentContract);
    try {
        let gasEstimate = await contract.methods.letsPayToExperts(id).estimateGas();
        await contract.methods.letsPayToExperts(id).send({
            gas: gasEstimate,
            gasPrice: 0
        });

        // TODO send to DB and calculate reputation of expert
    } catch (err) {
        console.log("err from pay to experts", err)
    }
}

module.exports = {
    payToExperts
}