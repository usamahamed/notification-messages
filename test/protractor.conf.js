exports.config = {
  allScriptsTimeout: 99999,
  specs: [
  'e2e/*.js'
  ],
  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:9000/',

  framework: 'jasmine',
  directConnect: true,

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};