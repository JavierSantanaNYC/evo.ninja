import { ScriptFunction } from "./utils";
import { Agent } from "../agents/utils";

import { Scripts } from "@evo-ninja/agent-utils";

import { AgentOutputType, trimText, ChatMessageBuilder, AgentFunctionResult } from "@/agent-core"

interface PerformanceMonitorQueryFuncParameters {
  counterName: string;
}

export class PerformanceMonitorQueryFunction extends ScriptFunction<PerformanceMonitorQueryFuncParameters> {
  constructor(scripts: Scripts) {
    super(scripts);
  }

  name: string = "powershell_PerformanceQuery";
  description: string = `Gets data from the Windows Performance Monitor database using the typeperf command.`;
  parameters: any = {
    type: "object",
    properties: {
      counterName: {
        type: "string",
      },
    },
    required: ["query"],
    additionalProperties: false,
  };

  onSuccess(
    agent: Agent,
    params: PerformanceMonitorQueryFuncParameters,
    rawParams: string | undefined,
    result: string
  ): AgentFunctionResult {
    return {
      outputs: [
        {
          type: AgentOutputType.Success,
          title: `[${agent.config.prompts.name}] ${this.name}`,
          content:
            `query: ${params.counterName}\n` +
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
