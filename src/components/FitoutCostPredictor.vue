<template>
  <v-content
    id="fitout-predictor-padding"
    class="fitout-predictor-component">
    <v-container 
      fluid
      fill-height>
      <v-layout
        justify-center
        align-center
      >
        <v-flex 
          xs12 
          sm7 
          md5
          lg4
          xl3
          @keyup.enter="calculateCostPrediction()"          
        >
          <v-text-field
            id="floorAreaInput"
            v-model="fitoutPredictionParameters.floorArea"
            :error-messages="floorAreaErrors"
            type="number"
            name="floor-area-input"
            label="Floor area (min. 1000 sq. m.)"/>
          <v-text-field
            id="floorHeightInput"
            v-model="fitoutPredictionParameters.floorHeight"
            :error-messages="floorHeightErrors"
            type="number"
            name="floor-height-input"
            label="Slab to slab floor height (min. 2.5m)"/>
          <v-checkbox
            id="isCatAIncludedInput"
            :label="`Will this project involve CAT A work?`"
            v-model="fitoutPredictionParameters.isCatAIncluded"
            :error="catAcatBErrorsWithoutMessage"
            class="spacelab-label"
            hide-details
          />
          <v-checkbox
            id="isCatBIncludedInput"
            :label="`Will this project involve CAT B work?`"
            v-model="fitoutPredictionParameters.isCatBIncluded"
            :error-messages="catAcatBErrorsWithMessage"
          />
          <v-btn 
            id="calculateCostPrediction"
            class="spacelab-btn"
            block 
            @click="calculateCostPrediction()">Calculate cost prediction</v-btn>
          <div 
            id="displayedCostPrediction" 
            class="large-title">Cost:  {{ fitoutCostPrediction.cost }}</div>
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
        minValue: minValue(1000),
      },
      floorHeight: { 
        required, 
        minValue: minValue(2.5), 
      },
      isCatAIncluded: {
        required(v) {
          return this.fitoutPredictionParameters.isCatBIncluded || required(v);
        },
      },
      isCatBIncluded: {
        required(v) {
          return this.fitoutPredictionParameters.isCatAIncluded || required(v);
        },
      },
      isEitherCatAOrBIncluded: ['fitoutPredictionParameters.isCatAIncluded', 'fitoutPredictionParameters.isCatBIncluded'],
    },
  },

  computed: {
    buildingVolume() {
      return parseFloat(this.fitoutPredictionParameters.floorArea)
      * parseFloat(this.fitoutPredictionParameters.floorHeight);
    },

    floorAreaErrors() {
      const errors = [];
      if (this.$v.fitoutPredictionParameters.floorArea.$error) {
        errors.push('Please provide a floor area (minimum 1000 sq.m.)');
      }
      return errors;
    },

    floorHeightErrors() {
      const errors = [];
      if (this.$v.fitoutPredictionParameters.floorHeight.$error) {
        errors.push('Please provide a floor height (minimum 2.5 m.)');
      }
      return errors;
    },

    catAcatBErrorsWithMessage() {
      const errors = [];
      if (this.$v.fitoutPredictionParameters.isEitherCatAOrBIncluded.$error) {
        errors.push('Please select at least one CAT A / CAT B option');
      }
      return errors;
    },

    catAcatBErrorsWithoutMessage() {
      if (this.$v.fitoutPredictionParameters.isEitherCatAOrBIncluded.$error) {
        return true;
      }
      return false;
    },
  },
  
  methods: {
    ...mapMutations([
      'UPDATE_ERROR_MESSAGE',
      'UPDATE_ERROR_STATUS',
    ]),

    calculateCostPrediction() {
      if (this.arePredictionParametersValid()) {
        this.getPredictionFromApi();
      }
    },

    arePredictionParametersValid() {
      this.$v.$touch();
      if (!this.$v.$error) {
        this.$v.$reset();
        return true;
      }
      return false;
    },

    async getPredictionFromApi() {
      try {
        const response = 
            await fitoutCostPredictorApi.getFitoutCostPrediction({
              buildingVolume: this.buildingVolume,
              isCatAIncluded: this.fitoutPredictionParameters.isCatAIncluded,
              isCatBIncluded: this.fitoutPredictionParameters.isCatBIncluded,
            });
        console.log(response);
        this.fitoutCostPrediction.cost = this.formatCost(response.data.cost);
      } catch (error) {
        console.log(error);
        this.handleError(error);
      }
    },

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
  },
};
</script>
