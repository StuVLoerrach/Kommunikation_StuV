import { GASClient } from 'gas-client';

const { serverFunctions } = new GASClient({
  // this is necessary for local development but will be ignored in production
  allowedDevelopmentDomains: (origin) =>
    /https:\/\/.*\.googleusercontent\.com$/.test(origin),
});

export { serverFunctions };
