import type { Settings } from './settings';

import * as dotenv from 'dotenv';
dotenv.config();

const {
  tmdbApiKey,
  allowlistHomeserver,
  debug,
} = process.env;
const settings = {
  tmdbApiKey,
  allowlistHomeserver,
  debug: debug === 'true',
} as Settings;

// TODO sanity check settings

console.log('EnvSettings: ', settings);

export const getEnvSettings = (): Settings => settings;
