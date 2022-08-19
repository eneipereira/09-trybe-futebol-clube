import { Schema } from 'joi';

const runSchema = <T> (schema: Schema<T>) => async (unknown: unknown): Promise<T> => {
  const result = await schema.validateAsync(unknown);

  return result;
};

export default runSchema;
