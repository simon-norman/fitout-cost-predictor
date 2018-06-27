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
            v-model="fitoutPredictionParameters.floorArea"
            :error-messages="floorAreaErrors"
            type="number"
            name="floor-area-input"
            label="Floor area (square metres)"/>
          <v-text-field
            id="floorHeightInput"
            v-model="fitoutPredictionParameters.floorHeight"
            :error-messages="floorHeightErrors"
            type="number"
            name="floor-height-input"
            label="Slab to slab floor height (square metres)"/>
          <v-btn 
            id="calculateCostPrediction"
            class="secondary"
            block 
            @click="calculateCostPrediction()">Calculate cost prediction</v-btn>
          <div 
            id="displayedCostPrediction" 
            class="display-3">Cost: {{ fitoutCostPrediction.cost }}</div>
          <div 
            id="displayedPredictionAccuracy" 
            class="title">Accurate to {{ fitoutCostPrediction.predictionAccuracy }}</div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import FitoutCostPredictorApi from '../api/fitoutCostPredictorApi';

const fitoutCostPredictorApi = new FitoutCostPredictorApi();

export default {
  name: 'FitoutCostPredictor',

  data() {
    return {
      fitoutCostPrediction: '',
      fitoutPredictionParameters: {
        floorArea: '',
        floorHeight: '',
      },
    };    
  },
  validations: {
    fitoutPredictionParameters: {
      floorArea: { required },
      floorHeight: { required },
    },
  },

  computed: {
    floorAreaErrors() {
      const errors = [];
      if (this.$v.fitoutPredictionParameters.floorArea.$error) {
        errors.push('Please provide a floor area');
      }
      return errors;
    },

    floorHeightErrors() {
      const errors = [];
      if (this.$v.fitoutPredictionParameters.floorHeight.$error) {
        errors.push('Please provide a floor height');
      }
      return errors;
    },
  },
  
  methods: {
    async calculateCostPrediction() {
      this.$v.$touch();
      if (!this.$v.$error) {
        this.$v.$reset();
        try {
          const response = 
            await fitoutCostPredictorApi.getFitoutCostPrediction(this.fitoutPredictionParameters);

          this.fitoutCostPrediction = response.data;
        } catch (error) {
        // placeholder for error handle
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
