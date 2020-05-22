import { version } from '../../../package.json';

import { ISystem } from '../schema';

export const system = async (): Promise<ISystem> => {
  return {
    version
  };
};
