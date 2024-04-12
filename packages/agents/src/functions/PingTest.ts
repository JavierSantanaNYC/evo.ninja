import { ScriptFunction } from "./utils";
import { Agent } from "../agents/utils";

import { Scripts } from "@evo-ninja/agent-utils";

import { AgentOutputType, trimText, ChatMessageBuilder, AgentFunctionResult } from "@/agent-core"

interface PingTestFuncParameters {
    endpoint: string;
}

export class PingTestFunction extends ScriptFunction<PingTestFuncParameters> {
  constructor(scripts: Scripts) {
    super(scripts);
  }

  name: string = "powershell_ping";
  description: string = `Gets ping data from the commandline`;
  parameters: any = {
    type: "object",
    properties: {
      endpoint: {
        type: "string",
      },
    },
    required: ["endpoint"],
    additionalProperties: false,
  };

  onSuccess(
    agent: Agent,
    params: PingTestFuncParameters,
    rawParams: string | undefined,
    result: string
  ): AgentFunctionResult {
    return {
      outputs: [
        {
          type: AgentOutputType.Success,
          title: `[${agent.config.prompts.name}] ${this.name}`,
          content:
            `endpoint: ${params.endpoint}\n` +
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
