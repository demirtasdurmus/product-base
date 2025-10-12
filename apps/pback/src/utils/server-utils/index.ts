import { env, EnvType } from '../../env/index.js';

const prodLikeEnvironments: EnvType['NODE_ENV'][] = ['production'];

export const isProdLikeEnvironment = prodLikeEnvironments.includes(env.NODE_ENV);
