import { ScriptFunction } from "./utils";
import { Agent } from "../agents/utils";

import { Scripts } from "@evo-ninja/agent-utils";

import { AgentOutputType, trimText, ChatMessageBuilder, AgentFunctionResult } from "@/agent-core"

interface GetProcessFuncParameters {
  sortMetric: string;
}

export class GetProcessFunction extends ScriptFunction<GetProcessFuncParameters> {
  constructor(scripts: Scripts) {
    super(scripts);
  }

  name: string = "powershell_getProcess";
  description: string = `Gets process information using the Get-Process command.`;
  parameters: any = {
    type: "object",
    properties: {
      sortMetric: {
        type: "string",
      },
    },
    required: ["sortMetric"],
    additionalProperties: false,
  };

  onSuccess(
    agent: Agent,
    params: GetProcessFuncParameters,
    rawParams: string | undefined,
    result: string
  ): AgentFunctionResult {
    return {
      outputs: [
        {
          type: AgentOutputType.Success,
          title: `[${agent.config.prompts.name}] ${this.name}`,
          content:
            `sortMetric: ${params.sortMetric}\n` +
            `result: ${trimText(result, 200)}`,
        },
      ],
      messages: [
        ChatMessageBuilder.functionCall(this.name, rawParams),
        ChatMessageBuilder.functionCallResult(this.name, result),
      ],
    };
  }
}
