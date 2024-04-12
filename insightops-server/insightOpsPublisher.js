const Ably = require('ably');

const ABLY_API_KEY = "MVKIrA.WfJZPA:-kiRjglDfPz311rNADFPAChXf8FlQTp632GI4KVa4XI";

const INSIGHTOPS_CHANNEL_NAME = "insightops";

const client = new Ably.Rest({
    key: ABLY_API_KEY,
});

const insightopsChannel = client.channels.get(INSIGHTOPS_CHANNEL_NAME);

async function publishToAbly(channelId, message) {
    await insightopsChannel.publish(channelId, message);
    console.log('Published message:', message);
}

module.exports.publishToAbly = publishToAbly;

