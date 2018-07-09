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
          md3
          @keyup.enter="calculateCostPrediction()"          
        >
          <v-text-field
            id="floorAreaInput"
            v-model="fitoutPredictionParameters.floorArea"
            :error-messages="floorAreaErrors"
            type="number"
            name="floor-area-input"
            label="Floor area (sq. m.)"/>
          <v-text-field
            id="floorHeightInput"
            v-model="fitoutPredictionParameters.floorHeight"
            :error-messages="floorHeightErrors"
            type="number"
            name="floor-height-input"
            label="Slab to slab floor height (m.)"/>
          <v-checkbox
            id="isCatAIncludedInput"
            :label="`Will this project involve CAT A work?`"
            v-model="fitoutPredictionParameters.isCatAIncluded"
          />
          <v-checkbox
            id="isCatBIncludedInput"
            :label="`Will this project involve CAT B work?`"
            v-model="fitoutPredictionParameters.isCatBIncluded"
          />
          <v-btn 
            id="calculateCostPrediction"
            class="secondary"
            block 
            @click="calculateCostPrediction()">Calculate cost prediction</v-btn>
          <div 
            id="displayedCostPrediction" 
            class="large-title">Cost:  {{ fitoutCostPrediction.cost }}</div>
          <div 
            id="displayedPredictionAccuracy" 
            class="small-title">Predictions currently accurate to 65%</div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { mapMutations } from 'vuex';
import { required, minValue } from 'vuelidate/lib/validators';
import FitoutCostPredictorApi from '../api/fitoutCostPredictorApi';

const fitoutCostPredictorApi = new FitoutCostPredictorApi();

export default {
  name: 'FitoutCostPredictor',

  data() {
    return {
      fitoutCostPrediction: {
        cost: '',
      },
      fitoutPredictionParameters: {
        floorArea: '',
        floorHeight: '',
        isCatAIncluded: false,
        isCatBIncluded: false,
      },
      errorMessage: 'So sorry, there\'s been an error - ' +
          'please try again later',
    };    
  },
  validations: {
    fitoutPredictionParameters: {
      floorArea: { 
        required,
        minValue: minValue(100),
      },
      floorHeight: { 
        required, 
        minValue: minValue(2), 
      },
    },
  },

  computed: {
    floorAreaErrors() {
      const errors = [];
      if (this.$v.fitoutPredictionParameters.floorArea.$error) {
        errors.push('Please provide a floor area (minimum 100 sq.m.)');
      }
      return errors;
    },
    buildingVolume() {
      return parseFloat(this.fitoutPredictionParameters.floorArea)
      * parseFloat(this.fitoutPredictionParameters.floorHeight);
    },

    floorHeightErrors() {
      const errors = [];
      if (this.$v.fitoutPredictionParameters.floorHeight.$error) {
        errors.push('Please provide a floor height (minimum 2 m.)');
      }
      return errors;
    },
  },
  
  methods: {
    ...mapMutations([
      'UPDATE_ERROR_MESSAGE',
      'UPDATE_ERROR_STATUS',
    ]),

    formatCost(predictedCost) {
      if (predictedCost < 0.999) {
        return this.formatCostInThousands(predictedCost);
      } 
      return this.formatCostInMillions(predictedCost);
    },

    formatCostInThousands(predictedCost) {
      const costFormattedInThousands = Number.parseFloat(predictedCost) * 1000;
      const costThreeSignificantFigures = costFormattedInThousands.toPrecision(3);
      return `£${costThreeSignificantFigures}k`;
    },

    formatCostInMillions(predictedCost) {
      const costToTwoDecimals = Number.parseFloat(predictedCost).toFixed(2);
      return `£${costToTwoDecimals}m`;
    },

    handleError() {
      this.UPDATE_ERROR_MESSAGE(this.errorMessage);
      this.UPDATE_ERROR_STATUS(true);
    },

    async calculateCostPrediction() {
      this.$v.$touch();
      if (!this.$v.$error) {
        this.$v.$reset();
        try {
          const response = 
            await fitoutCostPredictorApi.getFitoutCostPrediction({
              volume: this.buildingVolume,
              isCatAIncluded: this.isCatAIncluded,
              isCatBIncluded: this.isCatBIncluded,
            });
          console.log(response);
          this.fitoutCostPrediction.cost = this.formatCost(response.data[0]);
        } catch (error) {
          console.log(error);
          this.handleError();
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
