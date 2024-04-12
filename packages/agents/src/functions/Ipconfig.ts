import { ScriptFunction } from "./utils";
import { Agent } from "../agents/utils";

import { Scripts } from "@evo-ninja/agent-utils";

import { AgentOutputType, trimText, ChatMessageBuilder, AgentFunctionResult } from "@/agent-core"

interface IpconfigFuncParameters {
}

export class IpconfigFunction extends ScriptFunction<IpconfigFuncParameters> {
  constructor(scripts: Scripts) {
    super(scripts);
  }

  name: string = "powershell_ipconfig";
  description: string = `Gets netstat data from the commandline`;
  parameters: any = {
    type: "object",
    properties: {},
    required: [""],
    additionalProperties: false,
  };

  onSuccess(
    agent: Agent,
    params: IpconfigFuncParameters,
    rawParams: string | undefined,
    result: string
  ): AgentFunctionResult {
    return {
      outputs: [
        {
          type: AgentOutputType.Success,
          title: `[${agent.config.prompts.name}] ${this.name}`,
          content:
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
