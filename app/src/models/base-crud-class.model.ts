export abstract class BaseCRUDModel<T, S> {
  abstract create(data: S): Promise<T>;

  abstract readOne(id: string): Promise<T>;

  abstract readAll(options: {
    limit?: number;
    searchSubstring?: string;
  }): Promise<T[]>;

  abstract update(data: S, id: string): Promise<T>;

  abstract delete(id: string): Promise<void>;
}
