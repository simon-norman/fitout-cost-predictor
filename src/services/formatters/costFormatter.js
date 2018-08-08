
export default class Api {
  constructor({ currency, numberOfDecimals, numberOfSignificantFigures }) {
    this.currency = currency; 
    this.numberOfDecimals = numberOfDecimals; 
    this.numberOfSignificantFigures = numberOfSignificantFigures; 
  }

  formatCostInThousands(cost) {
    const costFormattedInThousands = costFormattedAsNumber * 1000;
    const costThreeSignificantFigures = costFormattedInThousands.toPrecision(numberOfSignificantFigures);
    return `£${costThreeSignificantFigures}k`;
  },
}
