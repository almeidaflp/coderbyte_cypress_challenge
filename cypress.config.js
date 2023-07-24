const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    video: false,
    retries: { "runMode": 1, "openMode": 0 }
  },
});
