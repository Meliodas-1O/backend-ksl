export interface IRepository<T> {
  create(entity: T): Promise<any>;
  update(id: string, entity: T): Promise<any>;
  delete(id: string): Promise<void>;
}
