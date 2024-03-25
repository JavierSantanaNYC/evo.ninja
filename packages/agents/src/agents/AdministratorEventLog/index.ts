import { AgentContext, Chat } from "@/agent-core";
import { EventLogSearchFunction } from "../../functions/EventLogSearch";
import { PlanWebResearchFunction } from "../../functions/PlanWebResearch";
import { prompts } from "./prompts";
import { ReadFileFunction } from "../../functions/ReadFile";
import { WriteFileFunction } from "../../functions/WriteFile";
import { ScrapeTextFunction } from "../../functions/ScrapeText";
import { ReadDirectoryFunction } from "../../functions/ReadDirectory";
import { Agent, AgentConfig, GoalRunArgs } from "../utils";

export class AdministratorEventLogAgent extends Agent {
  private plan: PlanWebResearchFunction;

  constructor(context: AgentContext) {
    super(
      new AgentConfig(
        () => prompts,
        [
          new EventLogSearchFunction(context.scripts),
          new ScrapeTextFunction(),
        ],
        context.scripts
      ),
      context
    );
    this.plan = new PlanWebResearchFunction(context.llm, context.chat.tokenizer);
  }

  public override async onFirstRun(args: GoalRunArgs, chat: Chat): Promise<void> {
    await this.executeFunction(this.plan, args, chat);
  }
}