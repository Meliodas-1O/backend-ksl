export interface IQueryHandler<TCommand, TResult = any> {
  execute(command: TCommand): Promise<TResult>;
}
