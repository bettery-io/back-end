const MiddlePaymentContract = require("../abi/MiddlePayment.json");

const payToCompanies = async (data) => {
    console.log("from payToCompanies")
    console.log(data);
    let id = data.id;
    let tokens = data.tokens;
    let correctAnswer = data.correctAnswer; // in WEI

    let contract = await ContractInit.init(process.env.NODE_ENV, MiddlePaymentContract);
    try {
        let gasEstimate = await contract.methods.letsPayToCompanies(id).estimateGas();
        await contract.methods.letsPayToCompanies(id).send({
            gas: gasEstimate,
            gasPrice: 0
        });

        // TODO send correct data to DB
    } catch (err) {
        console.log("err from pay to companies", err)
    }
}


module.exports = {
    payToCompanies
}