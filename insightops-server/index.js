const Ably = require('ably');
const { publishToAbly } = require('./insightOpsPublisher.js');
const { subscribeToInsightOps} = require('./insightOpsSubscriber.js');
const {publishInsightOpsMessage} = require('./insightops.js');

const CHANNEL_ID = 'poc'
async function connect (){
    const ably = new Ably.Realtime('MVKIrA.WfJZPA:-kiRjglDfPz311rNADFPAChXf8FlQTp632GI4KVa4XI');
    await ably.connection.once('connected');
    console.log('Connected to Ably!');
    await subscribeToInsightOps(CHANNEL_ID);
    await publishInsightOpsMessage({
        id: 1,
        message: "Users are reporting that their browsers freezes occasionally. We've disabled hardware accelerationand they use chrome on windows 10. Any suggestions?",
        goalCompleted: false,
    });

}

connect();


