/* eslint func-names: 0 */
/* eslint no-unused-expressions: 0 */

module.exports = {
  'Calculated cost prediction displays': function (browser) {
    browser
      .url(browser.launch_url)
      .pause(2000);

    browser.setValue('#floorAreaInput', 10000);
    browser.setValue('#averageFloorHeightInput', 4);

    browser.execute("document.querySelector('.isCatAAndBIncludedInput .v-input--selection-controls__ripple').click()");
    browser.click('#calculateCostPrediction');
    browser.pause(2000);
    browser.expect.element('#displayedCostPrediction').text.to.contain('£');
    browser.expect.element('#errorAlert').to.not.be.visible;
    browser.end();
  },
};

