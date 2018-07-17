/* eslint func-names: 0 */
/* eslint no-unused-expressions: 0 */

module.exports = {
  'Smoke test that fitout cost predictor page loads': function (browser) {
    browser
      .url(browser.launch_url)
      .pause(1000);

    browser.expect.element('#floorAreaInput').to.be.present;
    browser.end();
  },
};

