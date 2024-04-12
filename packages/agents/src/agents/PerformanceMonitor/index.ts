import { AgentContext, Chat } from "@/agent-core";
import { PerformanceMonitorQueryFunction } from "../../functions/PerformanceMonitorQuery";
import { prompts } from "./prompts";
import { UnderstandDataFunction } from "../../functions/UnderstandData";
import { Agent, AgentConfig, GoalRunArgs } from "../utils";

export class PerformanceMonitorAgent extends Agent {
  private understand: UnderstandDataFunction;

  constructor(context: AgentContext) {
    super(
      new AgentConfig(
        () => prompts,
        [
          new PerformanceMonitorQueryFunction(context.scripts)
        ],
        context.scripts
      ),
      context
    );
    this.understand = new UnderstandDataFunction();
  }

  public override async onFirstRun(args: GoalRunArgs, chat: Chat): Promise<void> {
    await this.executeFunction(this.understand, args, chat);
  }
}