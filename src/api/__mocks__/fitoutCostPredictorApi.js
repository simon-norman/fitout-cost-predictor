
export const mockGetFitoutCostPrediction = jest.fn();

mockGetFitoutCostPrediction.mockReturnValue({
  data: { 
    cost: 10000, 
    predictionAccuracy: 0.65, 
  }, 
});

const mock = jest.fn().mockImplementation(() => 
  ({ getFitoutCostPrediction: mockGetFitoutCostPrediction }));

export default mock;
