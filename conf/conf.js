// An example configuration file.
var HtmlScreenshotReporter = require('C://Users//Hemangi//AppData//Roaming//npm//node_modules//protractor-jasmine2-screenshot-reporter');

var reporter = new HtmlScreenshotReporter({
  dest: 'target/screenshots',
  filename: 'my-report.html'
});

var AllureReporter = require('C://Users//Hemangi//AppData//Roaming//npm//node_modules//jasmine-allure-reporter');// conf.js

var HTMLReport = require('C://Users//Hemangi//AppData//Roaming//npm//node_modules//protractor-html-reporter-2');



exports.config = {
  directConnect: true,


  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Framework to use. Jasmine is recommended.
  framework:'jasmine',
    
  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: ['../tests/calculator.js'],

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  },
  //SCREEN SHOT CAPTURE

  // Setup the report before any tests start
  beforeLaunch: function () {
    return new Promise(function (resolve) {
      reporter.beforeLaunch(resolve);
    });
  },

  // Assign the test reporter to each running instance
  onPrepare: function () {
    jasmine.getEnv().addReporter(reporter);
    
    jasmine.getEnv().addReporter(new AllureReporter({
      resultsDir: 'allure-results'
    }));

    
    var jasmineReporters = require('C://Users//Hemangi//AppData//Roaming//npm//node_modules//jasmine-reporters');

    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      consolidateAll: true,
      savePath: './/',
      filePrefix: 'xmlresults'
  }));

  
  },

  // Close the report after all tests finish
  afterLaunch: function (exitCode) {
    return new Promise(function (resolve) {
      reporter.afterLaunch(resolve.bind(this, exitCode));
    });
  },
  ///////


  //HTML REPORTS
  onComplete: function() {
    var browserName, browserVersion;
    var capsPromise = browser.getCapabilities();

    capsPromise.then(function (caps) {
       browserName = caps.get('browserName');
       browserVersion = caps.get('version');
       platform = caps.get('platform');

       

       testConfig = {
           reportTitle: 'Protractor Test Execution Report',
           outputPath: './',
           outputFilename: 'ProtractorTestReport',
           screenshotPath: './screenshots',
           testBrowser: browserName,
           browserVersion: browserVersion,
           modifiedSuiteName: false,
           screenshotsOnlyOnFailure: true,
           testPlatform: platform
       };
       new HTMLReport().from('xmlresults.xml', testConfig);
   });
}


}