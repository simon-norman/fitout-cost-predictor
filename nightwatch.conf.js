
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
    },
  
    "test_settings" : {
      "default" : {
        "launch_url" : "https://testing-cost-predictor.firebaseapp.com",
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
          "marionette": true,
        }
      },
  
      "chrome" : {
        "desiredCapabilities": {
          "browserName": "chrome"
        }
      },
    }
  }