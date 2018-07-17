

module.exports = {
    "src_folders" : ["./src/e2e_tests"],
    "output_folder" : "reports",
    "custom_commands_path" : "",
    "custom_assertions_path" : "",
    "page_objects_path" : "",
    "globals_path" : "",
  
    "selenium" : {
      "start_process" : true,
      "server_path" : "./src/e2e_tests/bin/selenium-server-standalone-3.9.1.jar",
      "log_path" : false,
      "port" : 4444,
      "cli_args" : {
        "webdriver.gecko.driver" : "./src/e2e_tests/bin/geckodriver.exe",
        "webdriver.chrome.driver" : "./src/e2e_tests/bin/chromedriver.exe"
      }
    },
  
    "test_settings" : {
      "default" : {
        "launch_url" : "http://localhost:8080",
        "selenium_port"  : 4444,
        "selenium_host"  : "localhost",
        "silent": true,
        "filter": "*.e2eTest.js",
        "screenshots" : {
          "enabled" : false,
          "path" : ""
        },
        "desiredCapabilities": {
          "browserName": "firefox",
          "marionette": true
        }
      },
      
      "testing" : {
        "launch_url" : "https://testing-cost-predictor.firebaseapp.com",
        "globals" : {
          "myGlobalVar" : "other value"
        }
      },
  
      "chrome" : {
        "desiredCapabilities": {
          "browserName": "chrome"
        }
      },
  
      "edge" : {
        "desiredCapabilities": {
          "browserName": "MicrosoftEdge"
        }
      }
    }
  }