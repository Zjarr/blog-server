import { version } from '../../../package.json';

import { System } from '../schema';

export const system = async (_: object, __: object): Promise<System> => {
  return {
    version
  };
};
