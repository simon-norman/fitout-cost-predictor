import Api from './Api';

export default class FitoutCostPredictorApi extends Api {
  constructor() {
    super({ baseURL: process.env.COST_PREDICTOR_API });
    
    this.fitoutCostPredictionPath = '/fitout-cost-prediction';
  }

  getFitoutCostPrediction(params) {
    return this.axios.get(this.fitoutCostPredictionPath, params);
  }
}
