const Ably = require('ably');
const ABLY_API_KEY = "MVKIrA.WfJZPA:-kiRjglDfPz311rNADFPAChXf8FlQTp632GI4KVa4XI";

const INSIGHTOPS_CHANNEL_NAME = "insightops";

const client = new Ably.Realtime({
    key: ABLY_API_KEY
});

const insightopsChannel = client.channels.get(INSIGHTOPS_CHANNEL_NAME);

async function subscribeToInsightOps(channelId) {

    await insightopsChannel.subscribe(channelId, (message) => {
        const newInsightOpsMessages = message.data;

        console.log('Received message:', newInsightOpsMessages);
    });
};

function unsubscribeFromInsightOps(insightops) {
    insightopsChannel.unsubscribe(insightops);
}

module.exports.subscribeToInsightOps = subscribeToInsightOps;
module.exports.unsubscribeFromInsightOps = unsubscribeFromInsightOps;