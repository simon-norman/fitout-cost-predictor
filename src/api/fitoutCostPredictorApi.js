import Api from './Api';

export default class FitoutCostPredictorApi extends Api {
  constructor() {
    super({ baseURL: process.env.COST_PREDICTOR_API });
    
    this.fitoutCostPredictionPath = '/fitOutCostPrediction';
  }

  getFitoutCostPrediction(params) {
    return this.axios.post(this.fitoutCostPredictionPath, params);
  }
}
