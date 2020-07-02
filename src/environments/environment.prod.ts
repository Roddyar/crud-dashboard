export const environment = {
  production: true,
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
