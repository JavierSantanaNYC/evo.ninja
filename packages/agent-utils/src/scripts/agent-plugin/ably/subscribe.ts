import Ably from "ably";
const ABLY_API_KEY =
  "xVLyHw.1-F-NQ:XCuiaqRbl72N6fsmLYFM-QpZP2-jq0fMkPl3o9TMu8Q";

const INSIGHTOPS_CHANNEL_NAME = "insightops";

const client = new Ably.Realtime({
  key: ABLY_API_KEY,
});

const insightopsChannel = client.channels.get(INSIGHTOPS_CHANNEL_NAME);

async function subscribeToInsightOps(channelId: string): Promise<void> {
  await insightopsChannel.subscribe(channelId, (message) => {
    const newInsightOpsMessages = message.data;

    console.log("Received message:", newInsightOpsMessages);
  });
}

function unsubscribeFromInsightOps(insightops: string): void {
  insightopsChannel.unsubscribe(insightops);
}

export { subscribeToInsightOps, unsubscribeFromInsightOps };
