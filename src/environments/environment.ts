// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  services: {
    baseUrl: 'https://crud-services.herokuapp.com',
    person: {
      persons: '/person',
      id: '/#id'
    },
    log: {
      logs: '/logs',
      type: '/list/#type',
      count: '/count/#type',
      mont: '/mont',
      proc: '/proc/#type'
    }
  }
};
