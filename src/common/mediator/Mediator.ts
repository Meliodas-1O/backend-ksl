import { ICommandBase } from "../../common/domain/contracts/ICommandBase";
import { ICommandHandler } from "../../common/domain/contracts/ICommandHandler";

class Mediator {
  private handlers = new Map<string, ICommandHandler<any>>();

  register<TCommand>(commandName: string, handler: ICommandHandler<TCommand>) {
    this.handlers.set(commandName, handler);
  }

  async send<TCommand extends ICommandBase, TResult>(
    command: TCommand
  ): Promise<TResult> {
    const handler = this.handlers.get(command.constructor.name);
    if (!handler) {
      throw new Error(`No handler registered for ${command.constructor.name}`);
    }
    return handler.execute(command) as TResult;
  }
}
export const mediator = new Mediator();
