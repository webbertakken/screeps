import { ErrorMapper } from 'utils/ErrorMapper';
import { init } from './globals';

init();

export const loop = ErrorMapper.wrapLoop(() => Kernel.runMainThread());
