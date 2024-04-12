import {
  Args_ask,
  Args_onGoalAchieved,
  Args_onGoalFailed,
  Args_speak,
  Module,
  manifest
} from "./types";
import { Logger } from "../../";
import { publishToAbly } from "./ably/publish";

import { PluginFactory, PluginPackage } from "@polywrap/plugin-js";

export interface AgentPluginConfig {
  logger: Logger;
}

interface Message {
  channel: string;
  messages: Array<string>;
  goalCompleted: boolean;
}

export class AgentPlugin extends Module<AgentPluginConfig> {
  private _logger: Logger;

  constructor(config: AgentPluginConfig) {
    super(config);
    this._logger = this.config.logger;
  }

  public async speak(args: Args_speak): Promise<string> {
    await this._logger.success(args.message);
    return "";
  }

  public async ask(args: Args_ask): Promise<string> {
    const response = await this._logger.prompt(args.message);
    return "User: " + response;
  }

  public async onGoalAchieved(args: Args_onGoalAchieved): Promise<boolean> {
    const msg: Message = {
      channel: "poc",
      messages: [args.message],
      goalCompleted: true,
    };
    await publishToAbly("poc", msg)
    .then(() => {
        console.log("Published message");
    })
    .catch((err) => {
        // Handle errors specifically here if necessary.
        throw err; // Re-throw the error to reject the promise returned by publishToAbly.
    });
    await this._logger.success(args.message);
    return true;
  }

  public async onGoalFailed(args: Args_onGoalFailed): Promise<boolean> {
    await this._logger.error(args.message);
    return true;
  }
}

export const agentPlugin: PluginFactory<AgentPluginConfig> = (
  config: AgentPluginConfig
) => {
  return new PluginPackage(
    new AgentPlugin(config),
    manifest
  );
};
