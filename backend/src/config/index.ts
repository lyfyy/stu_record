import { IMongoConfig, Mongo } from './mongo';

export { IMongoConfig };

export const allConfig = [Mongo.register()];

export const validations = [Mongo.validation];

export class validator {
  static validate(config: Record<string, any>, options) {
    // 内部配置项，自行验证配置
    const results = allConfig.map((config, index) =>
      validations[index].validate(config(), options),
    );
    const errors = results
      .map((result) => (result.error ? result.error.message : ''))
      .filter((str) => str !== '')
      .join('\n');
    // const validConfig = results.map((result)=>)
    return { error: errors ? { message: errors } : undefined, value: {} };
  }
}
