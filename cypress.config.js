const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-multi-reporters",

  reporterOptions: {
    configFile: "reporter.json",
  },

  video: false,
  screenshotOnRunFailure: false,
  viewportWidth: 360,
  viewportHeight: 640,
  defaultCommandTimeout: 10000,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
