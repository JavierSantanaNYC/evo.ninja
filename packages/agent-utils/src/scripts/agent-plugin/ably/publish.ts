import Ably from "ably";

const ABLY_API_KEY =
  "MVKIrA.WfJZPA:-kiRjglDfPz311rNADFPAChXf8FlQTp632GI4KVa4XI";

const INSIGHTOPS_CHANNEL_NAME = "insightops";

const client = new Ably.Rest({
  key: ABLY_API_KEY,
});

const insightopsChannel = client.channels.get(INSIGHTOPS_CHANNEL_NAME);
interface Message {
  channel: string;
  messages: Array<string>;
  goalCompleted: boolean;
}
async function publishToAbly(
  channelId: string,
  message: Message
): Promise<void> {
  await insightopsChannel.publish(channelId, message);
  console.log("Published message:", message);
}

export { publishToAbly };
