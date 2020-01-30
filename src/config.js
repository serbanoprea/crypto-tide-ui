import deepmerge from 'deepmerge';
import { config as commonConfig } from './configuration/common';
import { config as defaultConfig } from './configuration/defaultConfiguration';

const configMapping = {
    'development': defaultConfig,
    'production': defaultConfig
}

const configuration  = deepmerge(commonConfig, configMapping[process.env.NODE_ENV || 'development']);

export default configuration;
