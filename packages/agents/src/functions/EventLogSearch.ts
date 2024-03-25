import { ScriptFunction } from "./utils";
import { Agent } from "../agents/utils";

import { Scripts } from "@evo-ninja/agent-utils";

import { AgentOutputType, trimText, ChatMessageBuilder, AgentFunctionResult } from "@/agent-core"

interface EventLogSearchFuncParameters { 
  path: string;
}

export class EventLogSearchFunction extends ScriptFunction<EventLogSearchFuncParameters> {
  constructor(scripts: Scripts) {
    super(scripts);
  }

  name: string = "powershell_getEventLog";
  description: string = `Reads data from the windows event log`;
  parameters: any = {
    type: "object",
    properties: {
      path: {
        type: "string",
      },
    },
    required: ["path"],
    additionalProperties: false,
  };

  onSuccess(
    agent: Agent,
    params: EventLogSearchFuncParameters,
    rawParams: string | undefined,
    result: string
  ): AgentFunctionResult {
    return {
      outputs: [
        {
          type: AgentOutputType.Success,
          title: `[${agent.config.prompts.name}] ${this.name}`,
          content:
            `${params.path}\n` +
            `${trimText(result, 200)}`,
        },
      ],
      messages: [
        ChatMessageBuilder.functionCall(this.name, rawParams),
        ChatMessageBuilder.functionCallResult(this.name, result),
      ],
    };
  }
}
