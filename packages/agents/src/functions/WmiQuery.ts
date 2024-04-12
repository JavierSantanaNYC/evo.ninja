import { ScriptFunction } from "./utils";
import { Agent } from "../agents/utils";

import { Scripts } from "@evo-ninja/agent-utils";

import { AgentOutputType, trimText, ChatMessageBuilder, AgentFunctionResult } from "@/agent-core"

interface WmiQueryFuncParameters { 
  className: string;
}

export class WmiQueryFunction extends ScriptFunction<WmiQueryFuncParameters> {
  constructor(scripts: Scripts) {
    super(scripts);
  }

  name: string = "powershell_wmiQuery";
  description: string = `Gets data from the Windows Management Instrumentation (WMI) database.`;
  parameters: any = {
    type: "object",
    properties: {
      className: {
        type: "string",
      },
    },
    required: ["className"],
    additionalProperties: false,
  };

  onSuccess(
    agent: Agent,
    params: WmiQueryFuncParameters,
    rawParams: string | undefined,
    result: string
  ): AgentFunctionResult {
    return {
      outputs: [
        {
          type: AgentOutputType.Success,
          title: `[${agent.config.prompts.name}] ${this.name}`,
          content:
            `${params.className}\n` +
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
