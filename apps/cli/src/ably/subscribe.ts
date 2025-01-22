import Ably from "ably";
const ABLY_API_KEY =
  "";

const INSIGHTOPS_CHANNEL_NAME = "insightops";

const client = new Ably.Realtime({
  key: ABLY_API_KEY,
});

const insightopsChannel = client.channels.get(INSIGHTOPS_CHANNEL_NAME);

interface Message {
  id: string;
  status: string;
  data: {
    channel: string;
    messages: Array<string>;
    goalCompleted: boolean;
  };
}

// TODO implement the processMessage function
async function processMessage(message: Message): Promise<void> {
  const newInsightOpsMessages = message.data;

  console.log("Received message:", newInsightOpsMessages);

}

async function ackMessage(message: Message): Promise<void> {
  const ackChannelId = `${message.data.channel}:ack`;
  await insightopsChannel.publish(ackChannelId, {
    messageId: message.id,
    status: "received",
  });
}

async function subscribeToInsightOps(channelId: string): Promise<void> {
  await insightopsChannel.subscribe(channelId, (message: any) => {
    console.log("Received message:", message.data);
    processMessage(message);
    // Send an acknowledgment message to the agent
    ackMessage(message);
  });
}

function unsubscribeFromInsightOps(insightops: string): void {
  insightopsChannel.unsubscribe(insightops);
}

async function DynamicSubscribeToInsightOps(channelId: string): Promise<void> {
  await insightopsChannel.subscribe(channelId, (message: any) => {
    const newInsightOpsMessages = message.data;
    processMessage(message);
    // Send an acknowledgment message to the agent
    ackMessage(message);
    if (newInsightOpsMessages.goalCompleted) {
      unsubscribeFromInsightOps(channelId);
    }

  });
}
export { subscribeToInsightOps, unsubscribeFromInsightOps, DynamicSubscribeToInsightOps };
