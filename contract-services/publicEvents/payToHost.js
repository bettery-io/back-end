const MiddlePaymentContract = require("../abi/MiddlePayment.json");

const payToHost = async (data) => {
    console.log("from payToHost")
    console.log(data);
    let id = data.id;
    let premDF = data.premDF; // in wei
    let mintDF = data.mintDF; // in wei
    let mintCMF = data.mintCMF; // in wei
    let mintMF = data.mintMF; // in wei

    let contract = await ContractInit.init(process.env.NODE_ENV, MiddlePaymentContract);
    try {
        let gasEstimate = await contract.methods.letsPaytoHost(id).estimateGas();
        await contract.methods.letsPaytoHost(id).send({
            gas: gasEstimate,
            gasPrice: 0
        });

        // TODO ADD TO DB
    } catch (err) {
        console.log("err from pay to host", err)
    }
}

module.exports = {
    payToHost
}