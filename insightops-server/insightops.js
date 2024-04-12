const {publishToAbly } = require('./insightopsPublisher.js');

const MESSAGE_UPDATE_INTERNAL = 2500;

const insightOpsMessages = {
    channelId: 'poc',
    messages: [],
    goalCompleted: false,
};

function updateInsightOpsMessages(insightOpsMessage) {
    insightOpsMessages.messages.push({
        timestamp: Date.now(),
        ...insightOpsMessage,
    });
}

async function publishInsightOpsMessage(insightOpsMessage) {
    const insightOpsMessagePayload = updateInsightOpsMessages(insightOpsMessage);

    await publishToAbly(insightOpsMessages.channelId, insightOpsMessages);

    /*if (!insightOpsMessages.goalCompleted) {
        setTimeout(() => {
            publishInsightOpsMessage(insightOpsMessage);
        }, MESSAGE_UPDATE_INTERNAL);
    }*/
}

module.exports.publishInsightOpsMessage = publishInsightOpsMessage;
