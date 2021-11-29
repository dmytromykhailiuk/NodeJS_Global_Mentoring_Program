import { ModelCtor, Model, Op, Transaction } from 'sequelize';

export abstract class BaseCRUDModel<T, S> {
  constructor(
    private table: ModelCtor<Model<any, any>>,
    private relation: any
  ) {}

  async create(data: S, transaction?: Transaction): Promise<T> {
    return this.table.create(data, transaction ? { transaction } : {}) as any;
  }

  async readAll({
    limit,
    searchSubstring,
    propertyName,
  }: {
    limit?: number;
    propertyName: string;
    searchSubstring?: string;
  }): Promise<T[]> {
    return this.table.findAll({
      limit,
      where: {
        [propertyName]: {
          [Op.like]: `%${searchSubstring || ''}%`,
        },
      },
      include: this.relation,
    }) as any;
  }

  async readOne(propertyName: string, value: string): Promise<T> {
    return this.table.findOne({
      where: { [propertyName]: value },
      include: this.relation,
    }) as any;
  }

  async update(
    data: S,
    propertyName: string,
    value: string,
    transaction?: Transaction
  ): Promise<T> {
    return this.table
      .findOne({ where: { [propertyName]: value }, include: this.relation })
      .then((user) =>
        user.update(data, transaction ? { transaction } : {})
      ) as any;
  }

  async delete(propertyName: string, value: string): Promise<void> {
    await this.table.destroy({ where: { [propertyName]: value } });
  }
}
