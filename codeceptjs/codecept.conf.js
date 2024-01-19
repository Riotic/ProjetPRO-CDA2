const { setHeadlessWhen } = require('@codeceptjs/configure');
config = {
  tests: 'tests/*_test.js',
  output: './output',
  helpers: {
    WebDriver: {
      url: 'http://localhost:3000/',
      browser: 'chrome',
      host: '127.0.0.1',
      show:true,
      port: 4444,
      restart: false,
      windowSize: '1920x1680',
       desiredCapabilities: {
         chromeOptions: {
           args: [ "--disable-gpu", "--no-sandbox", "-disable-dev-shm-usage"]
         }
       }

    }
  },
  include: {
    I: './steps_file.js'
  },
  
  bootstrap: null,
  mocha: {},
  name: 'bddCompare_ihm_test',
  plugins: {
    pauseOnFail: {},
    retryFailedStep: {
      enabled: true
    },
    tryTo: {
      enabled: true
    },
    screenshotOnFail: {
      enabled: true
    }
  }

  
};
if (process.profile === "chrome-ci") {
    config.helpers.WebDriver.host =
    process.env.SELENIUM_STANDALONE_CHROME_PORT_4444_TCP_ADDR;
    // Reset config because it got overriden by BrowserStack auto detect mechanism
    config.helpers.WebDriver.protocol = "http";
    config.helpers.WebDriver.port = 4444;
}

exports.config = config
