import { ScriptFunction } from "./utils";
import { Agent } from "../agents/utils";

import { Scripts } from "@evo-ninja/agent-utils";

import { AgentOutputType, trimText, ChatMessageBuilder, AgentFunctionResult } from "@/agent-core"

interface EventLogSearchFuncParameters { 
  logName: string;
  filterXPath: string;
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
      logName: {
        type: "string",
      },
      filterXPath: {
        type: "string",
      },
    },
    required: ["logName", "filterXPath"],
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
            `${params.logName}\n` +
            `${params.filterXPath}\n` +
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
