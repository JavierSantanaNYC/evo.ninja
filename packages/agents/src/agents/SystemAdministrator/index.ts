import { AgentContext, Chat } from "@/agent-core";
import { prompts } from "./prompts";
import { WmiQueryFunction } from "../../functions/WmiQuery";
import { PerformanceMonitorQueryFunction } from "../../functions/PerformanceMonitorQuery";
import { EventLogSearchFunction } from "../../functions/EventLogSearch";
import { NetstatQueryFunction } from "../../functions/NetstatQuery";
import { GetProcessFunction } from "../../functions/ProcessInfo";
import { TracertQueryFunction } from "../../functions/TracertQuery";
import { PingTestFunction } from "../../functions/PingTest";
import { IpconfigFunction } from "../../functions/Ipconfig";
import { NslookupQueryFunction } from "../../functions/NslookupQuery";
import { UnderstandDataFunction } from "../../functions/UnderstandData";
import { Agent, AgentConfig, GoalRunArgs } from "../utils";

export class SystemsAdministratorAgent extends Agent {
  private understand: UnderstandDataFunction;

  constructor(context: AgentContext) {
    super(
      new AgentConfig(
        () => prompts,
        [
          new WmiQueryFunction(context.scripts),
          new PerformanceMonitorQueryFunction(context.scripts),
          new EventLogSearchFunction(context.scripts),
          new NetstatQueryFunction(context.scripts),
          new GetProcessFunction(context.scripts),
          new TracertQueryFunction(context.scripts),
          new PingTestFunction(context.scripts),
          new IpconfigFunction(context.scripts),
          new NslookupQueryFunction(context.scripts),
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