export interface ICommandHandler<TCommand, TResult = any> {
  execute(command: TCommand): Promise<TResult>;
}
