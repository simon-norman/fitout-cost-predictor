<template>
  <v-content>
    <v-container 
      fluid 
      fill-height>
      <v-layout
        justify-center
        align-center
      >
        <v-flex 
          xs12 
          s4 
          md3>
          <v-text-field
            id="floorAreaInput"
            name="floor-area-input"
            label="Floor area (square metres)"/>
          <v-text-field
            id="floorHeightInput"
            name="floor-height-input"
            label="Slab to slab floor height (square metres)"/>
          <v-btn 
            id="calculateCostPrediction"
            class="secondary"
            block 
            @click="calculateCostPrediction()">Calculate cost prediction</v-btn>
          <div class="display-3">Cost: {{ fitoutCostPrediction.cost }}</div>
          <div class="title">Accurate to {{ fitoutCostPrediction.predictionAccuracy }}</div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
// import FitoutCostPredictorApi from '../api/fitoutCostPredictorApi';

// const fitoutCostPredictorApi = new FitoutCostPredictorApi();

export default {
  name: 'FitoutCostPredictor',

  data() {
    return {
      fitoutCostPrediction: {
        cost: '',
        predictionAccuracy: '',
      },
    };    
  },
  validations: {
  },

  computed: {
  },
  
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
